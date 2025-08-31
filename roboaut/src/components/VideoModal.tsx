'use client';

import { useEffect } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
}

const VideoModal = ({ isOpen, onClose, videoUrl, title }: VideoModalProps) => {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-screen top-0 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 max-w-[90vw] max-h-[80vh] w-full m-4 animate-fade-in">
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

        {/* Video Container */}
        <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl aspect-video h-[80vh] mx-auto">
          <iframe
            width="100%"
            // height="80vh"
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        {/* Navigation hint */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 z-20">
          <p className="text-gray-300 text-sm font-exo2 text-center">
            Press <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">ESC</kbd> or click outside to close
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
