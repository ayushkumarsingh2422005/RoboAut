'use client';

import { useState, useRef } from 'react';

interface Event {
  id: number;
  documentId: string;
  Title: string;
  Description: string;
  Type: string;
  Date: string;
  EventStatus: 'Completed' | 'Open' | 'Closed';
}

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
}

export default function EventRegistrationModal({ isOpen, onClose, event }: EventRegistrationModalProps) {
  const [formData, setFormData] = useState({
    ParticipantName: '',
    RegistrationNumber: '',
    Email: '',
    Contact: '',
  });
  
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    } else if (file) {
      alert('Please select a PDF file only.');
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // First, upload the file if it exists and get the file ID
      let resumeFileId = null;
      if (resumeFile) {
        const fileFormData = new FormData();
        fileFormData.append('files', resumeFile);

        const fileResponse = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/upload`,
          {
            method: 'POST',
            body: fileFormData,
          }
        );

        if (fileResponse.ok) {
          const fileData = await fileResponse.json();
          resumeFileId = fileData[0]?.id; // Get the uploaded file ID
        }
      }

      // Then submit the form data with the file reference
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/forms`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              ParticipantName: formData.ParticipantName,
              RegistrationNumber: formData.RegistrationNumber,
              Email: formData.Email,
              Contact: formData.Contact,
              event: event.documentId, // Reference to the event
              Resume: resumeFileId, // Reference to uploaded file
            }
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to submit registration');
      }

      const result = await response.json();
      console.log('Registration submitted successfully:', result);
      
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        ParticipantName: '',
        RegistrationNumber: '',
        Email: '',
        Contact: '',
      });
      setResumeFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Error submitting registration:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred while submitting the registration');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setSubmitStatus('idle');
      setErrorMessage('');
      onClose();
    }
  };

  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="glass backdrop-blur-lg rounded-2xl border border-white/20 bg-black/50">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div>
              <h2 className="text-2xl font-orbitron font-bold text-white">
                Event Registration
              </h2>
              <p className="text-purple-400 font-exo2 mt-1">{event.Title}</p>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="text-gray-400 hover:text-white transition-colors duration-300 disabled:opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <div className="p-6">
            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 text-xl">✅</span>
                  <div>
                    <div className="text-green-400 font-exo2 font-semibold">Registration Successful!</div>
                    <div className="text-green-300 font-exo2 text-sm">You&apos;ve been registered for {event.Title}</div>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-red-400 text-xl">❌</span>
                  <div>
                    <div className="text-red-400 font-exo2 font-semibold">Registration Failed</div>
                    <div className="text-red-300 font-exo2 text-sm">{errorMessage}</div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Participant Name and Registration Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 font-exo2 font-medium mb-2">
                    Participant Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="ParticipantName"
                    value={formData.ParticipantName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 font-exo2 focus:border-blue-400 focus:outline-none transition-colors duration-300"
                    placeholder="Your full name"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-exo2 font-medium mb-2">
                    Registration Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="RegistrationNumber"
                    value={formData.RegistrationNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 font-exo2 focus:border-blue-400 focus:outline-none transition-colors duration-300"
                    placeholder="Your registration number"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Email and Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 font-exo2 font-medium mb-2">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 font-exo2 focus:border-blue-400 focus:outline-none transition-colors duration-300"
                    placeholder="your.email@example.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-exo2 font-medium mb-2">
                    Contact Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    name="Contact"
                    value={formData.Contact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 font-exo2 focus:border-blue-400 focus:outline-none transition-colors duration-300"
                    placeholder="+91 9876543210"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-gray-300 font-exo2 font-medium mb-2">
                  Resume (PDF) <span className="text-gray-500">(Optional)</span>
                </label>
                <div className="relative">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 bg-black/50 border border-blue-500/30 rounded-lg text-white font-exo2 focus:border-blue-400 focus:outline-none transition-colors duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500/20 file:text-blue-400 hover:file:bg-blue-500/30"
                    disabled={isSubmitting}
                  />
                  {resumeFile && (
                    <div className="mt-2 text-sm text-green-400 font-exo2">
                      ✓ {resumeFile.name} selected
                    </div>
                  )}
                </div>
              </div>

              {/* Event Info Display */}
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <div className="text-purple-400 font-exo2 font-medium mb-2">Event Details:</div>
                <div className="text-white font-orbitron font-bold">{event.Title}</div>
                <div className="text-gray-300 font-exo2 text-sm">
                  {new Date(event.Date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} • {event.Type}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full relative px-8 py-4 font-exo2 font-semibold text-lg transition-all duration-300 ${
                  isSubmitting 
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]'
                } text-white`}
                style={{
                  clipPath: "polygon(0px 0px, calc(100% - 20px) 0px, 100% 20px, 100% 100%, 20px 100%, 0px calc(100% - 20px))"
                }}
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  {isSubmitting && (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                  <span>{isSubmitting ? 'Registering...' : 'Register for Event'}</span>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
