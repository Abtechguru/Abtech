import { motion } from "motion/react";
import { Upload, X, Image, Film, FileImage } from "lucide-react";
import { useState } from "react";

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

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = (fileList: File[]) => {
    const newFiles: MediaFile[] = fileList.map((file) => ({
      id: Date.now().toString() + Math.random(),
      type: file.type.startsWith("image/") ? (file.name.toLowerCase().includes("logo") ? "logo" : "image") : "video",
      url: URL.createObjectURL(file),
      name: file.name,
      size: formatFileSize(file.size)
    }));

    const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles);
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
            ? "border-[var(--orange)] bg-[var(--orange-glow)]"
            : "border-[var(--border)] hover:border-[var(--orange)]"
        }`}
      >
        <input
          type="file"
          accept={acceptedTypes}
          multiple
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          id="file-upload"
        />
        <div className="text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-[var(--muted-foreground)]" />
          <h4 className="mb-2">Upload Media Files</h4>
          <p className="text-sm text-[var(--muted-foreground)] mb-2">
            Drag and drop files here, or click to browse
          </p>
          <p className="text-xs text-[var(--muted-foreground)]">
            Supported: Images (JPG, PNG, GIF, SVG) and Videos (MP4, WebM)
          </p>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            Max {maxFiles} files
          </p>
        </div>
      </div>

      {/* File Preview Grid */}
      {files.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm mb-3">Uploaded Files ({files.length})</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group rounded-xl overflow-hidden bg-[var(--card)] border border-[var(--border)] hover:border-[var(--orange)] transition-all"
              >
                {/* Preview */}
                <div className="aspect-square bg-[var(--secondary)] flex items-center justify-center">
                  {file.type === "video" ? (
                    <video src={file.url} className="w-full h-full object-cover" />
                  ) : (
                    <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                  )}
                </div>

                {/* Info */}
                <div className="p-3">
                  <div className="flex items-start gap-2 mb-2">
                    {getFileIcon(file.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs truncate">{file.name}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{file.size}</p>
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFile(file.id)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Type Badge */}
                <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-[var(--background)]/90 backdrop-blur-sm text-xs">
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
