'use client';

import { useState, useRef, useEffect } from 'react';

interface ReadMoreModalProps {
  text: string;
  maxLines?: number;
  className?: string;
  buttonClassName?: string;
  modalClassName?: string;
  title?: string;
}

const ReadMoreModal: React.FC<ReadMoreModalProps> = ({
  text,
  maxLines = 3,
  className = '',
  buttonClassName = '',
  modalClassName = '',
  title = 'Full Text'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  // Check if text is truncated
  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        const lineHeight = parseInt(window.getComputedStyle(textRef.current).lineHeight);
        const maxHeight = lineHeight * maxLines;
        const actualHeight = textRef.current.scrollHeight;
        setIsTruncated(actualHeight > maxHeight);
      }
    };

    checkTruncation();
    window.addEventListener('resize', checkTruncation);
    return () => window.removeEventListener('resize', checkTruncation);
  }, [text, maxLines]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      return () => {
        document.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'unset';
      };
    }
  }, [showModal]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="relative">
        {/* Text Content */}
        <p
          ref={textRef}
          className={`${className} transition-all duration-300 ${
            isExpanded ? '' : `line-clamp-${maxLines}`
          }`}
          style={isExpanded ? {} : { 
            display: '-webkit-box',
            WebkitLineClamp: maxLines,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {text}
        </p>

        {/* Action Buttons */}
        {isTruncated && (
          <div className="flex items-center gap-2 mt-2">
            {/* Read More/Less Button */}
            <button
              onClick={toggleExpanded}
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                buttonClassName || 'text-blue-400 hover:text-blue-300'
              }`}
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <div className={`relative w-full max-w-2xl max-h-[80vh] ${
            modalClassName || 'bg-gray-900/95 backdrop-blur-lg border border-white/20'
          } rounded-2xl shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300`}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-orbitron font-bold text-white">
                {title}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors duration-200 hover:bg-white/10 rounded-full p-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[60vh] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
              <p className="text-gray-200 leading-relaxed font-exo2 whitespace-pre-line">
                {text}
              </p>
            </div>
            
            {/* Modal Footer */}
            <div className="flex justify-end p-6 border-t border-white/10">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-exo2 font-medium rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300 hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReadMoreModal;
