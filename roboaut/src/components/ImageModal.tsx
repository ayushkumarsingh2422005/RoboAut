'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: { id: number; url: string; documentId: string; }[];
  currentIndex: number;
  title?: string;
  onNavigate: (newIndex: number) => void;
}

const ImageModal = ({ isOpen, onClose, images, currentIndex, title, onNavigate }: ImageModalProps) => {
  const currentImage = images[currentIndex];
  const hasMultipleImages = images.length > 1;

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    onNavigate(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    onNavigate(newIndex);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasMultipleImages) {
        goToPrevious();
      } else if (e.key === 'ArrowRight' && hasMultipleImages) {
        goToNext();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyPress);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, hasMultipleImages, currentIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-screen top-0 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 max-w-[90vw] max-h-[90vh] m-4 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-20 p-2 text-white hover:text-gray-300 transition-colors duration-200"
          aria-label="Close modal"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        {title && (
          <div className="absolute -top-12 left-0 z-20">
            <h3 className="text-white font-orbitron font-semibold text-lg max-w-md truncate">
              {title}
            </h3>
          </div>
        )}

        {/* Image Container */}
        <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl h-[80vh]">
          {currentImage && (
            <Image
              src={currentImage.url}
              alt={title || ''}
              width={1200}
              height={800}
              className="max-w-full max-h-[80vh] object-contain"
              priority
            />
          )}

          {/* Navigation Arrows */}
          {hasMultipleImages && (
            <>
              {/* Previous Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-black/60 hover:bg-black/80 rounded-full text-white transition-all duration-200 hover:scale-110"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-black/60 hover:bg-black/80 rounded-full text-white transition-all duration-200 hover:scale-110"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 px-3 py-1 bg-black/60 rounded-full text-white text-sm font-exo2">
                {currentIndex + 1} of {images.length}
              </div>
            </>
          )}
        </div>

        {/* Navigation hint */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 z-20">
          <p className="text-gray-300 text-sm font-exo2 text-center">
            {hasMultipleImages ? (
              <>
                Use <kbd className="px-2 py-1 bg-gray-700 rounded text-xs mx-1">←</kbd>
                <kbd className="px-2 py-1 bg-gray-700 rounded text-xs mx-1">→</kbd> to navigate,
                <kbd className="px-2 py-1 bg-gray-700 rounded text-xs mx-1">ESC</kbd> to close
              </>
            ) : (
              <>
                Press <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">ESC</kbd> or click outside to close
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
