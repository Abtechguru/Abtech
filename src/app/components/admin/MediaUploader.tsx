import { motion } from "motion/react";
import { Upload, X, Image, Film, FileImage, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "../../utils/supabase";

interface MediaFile {
  id: string;
  type: "image" | "video" | "logo";
  url: string;
  name: string;
  size: string;
}

interface MediaUploaderProps {
  onFilesSelected: (files: MediaFile[]) => void;
  acceptedTypes?: string;
  maxFiles?: number;
  existingFiles?: MediaFile[];
}

export function MediaUploader({
  onFilesSelected,
  acceptedTypes = "image/*,video/*",
  maxFiles = 10,
  existingFiles = []
}: MediaUploaderProps) {
  const [files, setFiles] = useState<MediaFile[]>(existingFiles);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = async (fileList: File[]) => {
    setIsUploading(true);
    try {
      const processedFiles: MediaFile[] = await Promise.all(
        fileList.map(async (file) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
          const filePath = `project-media/${fileName}`;

          // Upload to Supabase Storage
          // Note: We use a try-catch for each upload to handle bucket existence
          const { error: uploadError } = await supabase.storage
            .from('media') // Assuming a bucket named 'media' exists
            .upload(filePath, file);

          if (uploadError) {
             console.error("Upload error:", uploadError);
             // Fallback to Base64 if storage fails (for dev/local without bucket set up)
             return new Promise<MediaFile>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  resolve({
                    id: Date.now().toString() + Math.random(),
                    type: file.type.startsWith("image/") ? (file.name.toLowerCase().includes("logo") ? "logo" : "image") : "video",
                    url: reader.result as string,
                    name: file.name,
                    size: formatFileSize(file.size)
                  });
                };
                reader.readAsDataURL(file);
             });
          }

          const { data: { publicUrl } } = supabase.storage
            .from('media')
            .getPublicUrl(filePath);

          return {
            id: Date.now().toString() + Math.random(),
            type: file.type.startsWith("image/") ? (file.name.toLowerCase().includes("logo") ? "logo" : "image") : "video",
            url: publicUrl,
            name: file.name,
            size: formatFileSize(file.size)
          };
        })
      );

      const updatedFiles = [...files, ...processedFiles].slice(0, maxFiles);
      setFiles(updatedFiles);
      onFilesSelected(updatedFiles);
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const removeFile = (id: string) => {
    const updatedFiles = files.filter(f => f.id !== id);
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "logo":
        return <FileImage className="w-5 h-5 text-[var(--orange)]" />;
      case "image":
        return <Image className="w-5 h-5 text-blue-500" />;
      case "video":
        return <Film className="w-5 h-5 text-purple-500" />;
      default:
        return <Image className="w-5 h-5 text-[var(--muted-foreground)]" />;
    }
  };

  return (
    <div>
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-8 transition-all ${
          isDragging
            ? "border-[var(--blue-primary)] bg-[var(--blue-primary)]/5"
            : "border-[var(--border)] hover:border-[var(--blue-primary)]"
        } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input
          type="file"
          accept={acceptedTypes}
          multiple
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          id="file-upload"
          disabled={isUploading}
        />
        <div className="text-center">
          {isUploading ? (
            <Loader2 className="w-12 h-12 mx-auto mb-4 text-[var(--blue-primary)] animate-spin" />
          ) : (
            <Upload className="w-12 h-12 mx-auto mb-4 text-[var(--muted-foreground)]" />
          )}
          <h4 className="mb-2">{isUploading ? "Uploading to Cloud..." : "Upload Media Files"}</h4>
          <p className="text-sm text-[var(--muted-foreground)] mb-2">
            Drag and drop files here, or click to browse
          </p>
          <p className="text-xs text-[var(--muted-foreground)]">
            Supported: Images and Videos. Max {maxFiles} files.
          </p>
        </div>
      </div>

      {/* File Preview Grid */}
      {files.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm mb-3 font-bold text-[var(--blue-dark)]">Project Media Asset Registry ({files.length})</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group rounded-xl overflow-hidden bg-white border border-[var(--border)] hover:border-[var(--blue-primary)] transition-all shadow-sm"
              >
                {/* Preview */}
                <div className="aspect-square bg-[var(--secondary)]/30 flex items-center justify-center">
                  {file.type === "video" ? (
                    <video src={file.url} className="w-full h-full object-cover" />
                  ) : (
                    <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                  )}
                </div>

                {/* Info */}
                <div className="p-3 bg-white">
                  <div className="flex items-start gap-2">
                    {getFileIcon(file.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold truncate uppercase tracking-wider">{file.name}</p>
                      <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-tighter">{file.size}</p>
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFile(file.id)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Type Badge */}
                <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-white/90 backdrop-blur-sm text-[8px] font-black uppercase tracking-widest text-[var(--blue-dark)] border border-[var(--border)]">
                  {file.type}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
