"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, ChevronDown, ChevronUp, Check } from "lucide-react";
import { Subsection } from "@/lib/sections-data";
import Image from "next/image";

interface SubsectionModalProps {
  subsection: Subsection | null;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  onMarkComplete: (id: string) => void;
}

export const SubsectionModal = ({
  subsection,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
  onMarkComplete,
}: SubsectionModalProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Obtener las imágenes del paso actual
  const getImages = (): string[] => {
    if (!subsection) return [];
    if (subsection.images && subsection.images.length > 0) {
      return subsection.images;
    }
    // Por defecto, usa el id como nombre de imagen
    return [`${subsection.id}.png`];
  };

  const images = getImages();
  const hasMultipleImages = images.length > 1;

  // Reset states when subsection changes
  useEffect(() => {
    if (isOpen && subsection) {
      setIsExpanded(true);
      setIsReady(false);
      setCurrentImageIndex(0);
    }
  }, [isOpen, subsection?.id]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleReady = () => {
    if (subsection) {
      setIsReady(true);
      onMarkComplete(subsection.id);
    }
  };

  const handleNext = () => {
    if (isReady) {
      onNext();
    }
  };

  const handleClose = () => {
    if (isReady) {
      onClose();
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && subsection && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Modal - Animated height */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{
              y: 0,
              height: isExpanded ? "94vh" : "50vh"
            }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl flex flex-col"
          >
            {/* Header with title and description */}
            <div className="flex-shrink-0 px-4 py-3 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-3">
                  <h3 className="font-semibold text-black text-lg line-clamp-1">
                    {subsection.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-0.5 line-clamp-2">
                    {subsection.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {/* Toggle Arrow */}
                  <button
                    onClick={toggleExpanded}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Image Area - Scrollable */}
            <div className="flex-1 overflow-hidden px-3 py-2">
              <div className="relative w-full h-full bg-gray-100 rounded-xl overflow-y-auto">
                {/* Image navigation arrows for multiple images */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                    {/* Image indicator dots */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                      {images.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex ? "bg-black" : "bg-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Image container - adapts to width, scrollable vertically */}
                <div className="w-full min-h-full">
                  <Image
                    src={`/${images[currentImageIndex]}`}
                    alt="App screenshot"
                    width={800}
                    height={1600}
                    className="w-full h-auto object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>

                {/* Fallback text */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none -z-10">
                  <span className="text-sm">Imagen de la app</span>
                </div>
              </div>
            </div>

            {/* Footer with all buttons in same row */}
            <div className="flex-shrink-0 bg-white border-t border-gray-100 px-3 py-3">
              <div className="flex justify-between items-center gap-2">
                {/* Previous Button */}
                {hasPrevious ? (
                  <button
                    onClick={onPrevious}
                    className="flex items-center gap-1 px-3 py-2 bg-white text-black border border-black rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                  </button>
                ) : (
                  <div className="w-24" />
                )}

                {/* Ready Button - Center */}
                <button
                  onClick={handleReady}
                  disabled={isReady}
                  className={`flex-1 max-w-[140px] py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm ${
                    isReady
                      ? "bg-green-500 text-white cursor-default"
                      : "bg-yellow-400 text-black hover:bg-yellow-500"
                  }`}
                >
                  {isReady ? (
                    <>
                      <Check className="w-4 h-4" />
                      Hecho
                    </>
                  ) : (
                    "Listo"
                  )}
                </button>

                {/* Next Button */}
                <button
                  onClick={hasNext ? handleNext : handleClose}
                  disabled={!isReady}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                    isReady
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {hasNext ? "Siguiente" : "Cerrar"}
                  {hasNext && <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
