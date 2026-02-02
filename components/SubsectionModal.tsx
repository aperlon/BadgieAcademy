"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
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

  const handleNext = () => {
    if (subsection) {
      onMarkComplete(subsection.id);
    }
    onNext();
  };

  const handleClose = () => {
    if (subsection) {
      onMarkComplete(subsection.id);
    }
    onClose();
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
            onClick={handleClose}
          />

          {/* Modal Container - Centered on desktop, bottom on mobile */}
          <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                height: isExpanded ? "89dvh" : "50dvh"
              }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-full md:w-[420px] md:max-h-[85vh] md:h-auto bg-white rounded-t-2xl md:rounded-2xl flex flex-col shadow-2xl"
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
                    {/* Toggle Arrow - Only on mobile */}
                    <button
                      onClick={toggleExpanded}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors md:hidden"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    {/* Close Button */}
                    <button
                      onClick={handleClose}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Image Area - Scrollable on mobile, fit on desktop */}
              <div className="flex-1 overflow-hidden px-3 py-2 md:flex-none md:h-[500px]">
                <div className="relative w-full h-full bg-gray-100 rounded-xl overflow-y-auto md:overflow-hidden md:flex md:items-center md:justify-center">
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

                  {/* Image container */}
                  <div className="w-full min-h-full md:min-h-0 md:h-full md:flex md:items-center md:justify-center">
                    <Image
                      src={`/${images[currentImageIndex]}`}
                      alt="App screenshot"
                      width={800}
                      height={1600}
                      className="w-full h-auto object-contain md:w-auto md:h-full md:max-w-full"
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

              {/* Footer with navigation buttons */}
              <div className="flex-shrink-0 bg-white border-t border-gray-100 px-3 py-3 md:rounded-b-2xl">
                <div className="flex justify-between items-center gap-4">
                  {/* Previous Button */}
                  {hasPrevious ? (
                    <button
                      onClick={onPrevious}
                      className="flex items-center gap-1 px-4 py-2 bg-white text-black border border-black rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Anterior
                    </button>
                  ) : (
                    <div />
                  )}

                  {/* Next Button */}
                  <button
                    onClick={hasNext ? handleNext : handleClose}
                    className="flex items-center gap-1 px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm"
                  >
                    {hasNext ? "Siguiente" : "Cerrar"}
                    {hasNext && <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
