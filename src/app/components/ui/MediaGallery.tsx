import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Play, Maximize2 } from "lucide-react";
import { useState, useEffect } from "react";

interface MediaFile {
  id: string;
  type: "image" | "video" | "logo";
  url: string;
  name: string;
}

interface MediaGalleryProps {
  media: MediaFile[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export function MediaGallery({ media, isOpen, onClose, initialIndex = 0 }: MediaGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setCurrentIndex(initialIndex);
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen, initialIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-[110] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Counter */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/60 font-mono">
          {currentIndex + 1} / {media.length}
        </div>

        {/* Main Media Wrapper */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Navigation Buttons */}
          {media.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 z-[110] w-14 h-14 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white transition-all"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 z-[110] w-14 h-14 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white transition-all"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Current Media */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full h-full flex items-center justify-center"
          >
            {media[currentIndex].type === "video" ? (
              <video
                src={media[currentIndex].url}
                controls
                autoPlay
                className="max-w-full max-h-full rounded-lg shadow-2xl"
              />
            ) : (
              <img
                src={media[currentIndex].url}
                alt={media[currentIndex].name}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            )}
          </motion.div>
        </div>

        {/* Thumbnails */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 px-4 py-2 bg-white/5 rounded-2xl backdrop-blur-md overflow-x-auto max-w-[90vw]">
          {media.map((file, index) => (
            <button
              key={file.id}
              onClick={() => setCurrentIndex(index)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all ${
                currentIndex === index ? "ring-2 ring-[var(--blue-primary)] scale-110" : "opacity-40 hover:opacity-100"
              }`}
            >
              <img src={file.url} className="w-full h-full object-cover" />
              {file.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Play className="w-4 h-4 text-white fill-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
