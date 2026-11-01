import { useEffect, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { motion } from "motion/react";
import { AlertCircle, FileImage, Film, Image as ImageIcon, Loader2, Upload, X } from "lucide-react";
import { supabase } from "../../utils/supabase";
import type { MediaFile } from "../../contexts/DataContext";

interface MediaUploaderProps {
  onFilesSelected: (files: MediaFile[]) => void;
  acceptedTypes?: string;
  maxFiles?: number;
  existingFiles?: MediaFile[];
}

const IMAGE_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);
const VIDEO_TYPES = new Set(["video/mp4", "video/webm"]);
const IMAGE_LIMIT_BYTES = 8 * 1024 * 1024;
const VIDEO_LIMIT_BYTES = 40 * 1024 * 1024;
const EMPTY_FILES: MediaFile[] = [];

function fileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function validFile(file: File): string | null {
  if (!IMAGE_TYPES.has(file.type) && !VIDEO_TYPES.has(file.type)) {
    return "Unsupported file: " + file.name + ". Use JPEG, PNG, WebP, GIF, MP4 or WebM.";
  }
  const maxSize = IMAGE_TYPES.has(file.type) ? IMAGE_LIMIT_BYTES : VIDEO_LIMIT_BYTES;
  if (file.size > maxSize) return file.name + " exceeds the " + fileSize(maxSize) + " limit.";
  return null;
}

export function MediaUploader({ onFilesSelected, acceptedTypes = "image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm", maxFiles = 10, existingFiles = EMPTY_FILES }: MediaUploaderProps) {
  const [files, setFiles] = useState<MediaFile[]>(existingFiles);
  const filesRef = useRef(files);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { filesRef.current = files; }, [files]);
  useEffect(() => {
    filesRef.current = existingFiles;
    setFiles(existingFiles);
  }, [existingFiles]);

  function updateFiles(next: MediaFile[]) {
    filesRef.current = next;
    setFiles(next);
    onFilesSelected(next);
  }

  async function processFiles(fileList: File[]) {
    if (uploading || fileList.length === 0) return;
    setError(null);
    const available = Math.max(0, maxFiles - filesRef.current.length);
    if (available === 0) {
      setError("You have reached the " + maxFiles + "-file limit. Remove an item before uploading more.");
      return;
    }
    const batch = fileList.slice(0, available);
    const failures = batch.map(validFile).filter((message): message is string => Boolean(message));
    if (failures.length || fileList.length > available) {
      setError([...failures, ...(fileList.length > available ? ["Only " + available + " more file(s) can be added."] : [])].join(" "));
    }
    const accepted = batch.filter(file => validFile(file) === null);
    if (accepted.length === 0) return;
    setUploading(true);
    try {
      const uploaded = await Promise.allSettled(accepted.map(async (file): Promise<MediaFile> => {
        const ext = file.name.split(".").at(-1)?.toLowerCase() || "bin";
        const path = "project-media/" + crypto.randomUUID() + "." + ext;
        const result = await supabase.storage.from("media").upload(path, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type
        });
        if (result.error) throw new Error(file.name + ": " + result.error.message);
        const { data } = supabase.storage.from("media").getPublicUrl(path);
        if (!data.publicUrl) throw new Error(file.name + ": no public media URL was returned.");
        return {
          id: crypto.randomUUID(),
          type: file.type.startsWith("video/") ? "video" : file.name.toLowerCase().includes("logo") ? "logo" : "image",
          url: data.publicUrl,
          name: file.name,
          size: fileSize(file.size)
        };
      }));
      const successful = uploaded.flatMap(result => result.status === "fulfilled" ? [result.value] : []);
      const failuresFromUpload = uploaded.flatMap(result =>
        result.status === "rejected" ? [result.reason instanceof Error ? result.reason.message : "Media upload failed."] : []
      );
      if (successful.length) updateFiles([...filesRef.current, ...successful].slice(0, maxFiles));
      if (failuresFromUpload.length) setError(previous => [previous, ...failuresFromUpload].filter(Boolean).join(" "));
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    void processFiles(Array.from(input.files || []));
    input.value = "";
  }
  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    void processFiles(Array.from(event.dataTransfer.files));
  }
  function removeFile(id: string) {
    updateFiles(filesRef.current.filter(file => file.id !== id));
  }

  return <div className="space-y-4">
    <div className={"relative border-2 border-dashed rounded-xl p-7 text-center transition-colors " +
      (dragging ? "border-[var(--orange)] bg-orange-50" : "border-[var(--border)] hover:border-[var(--orange)]") +
      (uploading ? " opacity-70" : "")}
      onDragOver={event => { event.preventDefault(); setDragging(true); }}
      onDragLeave={event => { event.preventDefault(); setDragging(false); }}
      onDrop={handleDrop}>
      <input aria-label="Select portfolio media files" type="file" accept={acceptedTypes} multiple
        disabled={uploading} onChange={handleInput}
        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer disabled:cursor-not-allowed" />
      {uploading ? <Loader2 size={34} className="mx-auto text-[var(--orange)] animate-spin mb-3" /> :
        <Upload size={34} className="mx-auto text-[var(--orange)] mb-3" />}
      <p className="font-bold text-[var(--blue-dark)]">{uploading ? "Uploading to storage…" : "Upload image or video"}</p>
      <p className="text-xs text-[var(--muted-foreground)] mt-2">Drag and drop or browse · {files.length}/{maxFiles} files</p>
      <p className="text-xs text-[var(--muted-foreground)] mt-1">Images up to 8 MB; MP4/WebM video up to 40 MB</p>
    </div>
    {error && <p role="alert" className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3"><AlertCircle size={18} className="shrink-0" />{error}</p>}
    {files.length > 0 && <div>
      <h4 className="text-xs uppercase tracking-wide font-black text-[var(--muted-foreground)] mb-3">Uploaded assets ({files.length})</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {files.map(file => <motion.div key={file.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="relative bg-white border border-[var(--border)] rounded-lg overflow-hidden">
          <div className="aspect-square bg-[var(--secondary)] flex items-center justify-center overflow-hidden">
            {file.type === "video" ? <video src={file.url} className="w-full h-full object-cover" preload="metadata" /> :
              <img src={file.url} alt={file.name} loading="lazy" className="w-full h-full object-cover" />}
          </div>
          <div className="p-3 flex items-start gap-2">
            {file.type === "video" ? <Film size={16} className="text-[var(--orange)] shrink-0" /> :
              file.type === "logo" ? <FileImage size={16} className="text-[var(--orange)] shrink-0" /> : <ImageIcon size={16} className="text-[var(--orange)] shrink-0" />}
            <div className="min-w-0">
              <p className="text-xs text-[var(--blue-dark)] truncate font-bold">{file.name}</p>
              <p className="text-[11px] text-[var(--muted-foreground)]">{file.size}</p>
            </div>
          </div>
          <button type="button" onClick={() => removeFile(file.id)}
            className="absolute top-2 right-2 grid place-items-center w-9 h-9 bg-red-700 text-white rounded-lg hover:bg-red-800"
            aria-label={"Remove " + file.name}><X size={17} /></button>
        </motion.div>)}
      </div>
    </div>}
  </div>;
}
