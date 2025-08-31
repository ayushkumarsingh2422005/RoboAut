'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageModal from '@/components/ImageModal';

interface Photo {
  id: number;
  documentId: string;
  url: string;
}

interface Gallery {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Photos: Photo[];
}

export default function GalleryPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [allPhotos, setAllPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch galleries from API
  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/galleries?populate[Photos][fields]=url`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch galleries');
        }
        
        const data = await response.json();
        const galleriesData = data.data || [];
        console.log('Galleries data:', galleriesData);
        
        setGalleries(galleriesData);
        
        // Flatten all photos from all galleries
        const photos: Photo[] = [];
        galleriesData.forEach((gallery: Gallery) => {
          if (gallery.Photos && Array.isArray(gallery.Photos)) {
            photos.push(...gallery.Photos);
          }
        });
        setAllPhotos(photos);
        
      } catch (err) {
        console.error("Error fetching galleries:", err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGalleries();
  }, []);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNavigate = (newIndex: number) => {
    setCurrentImageIndex(newIndex);
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-black overflow-hidden">
        {/* Global Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
          
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 pt-20">
          {/* Hero Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
              {/* Section Header */}
              <div className="text-center mb-16">
                <h1 className="text-4xl lg:text-6xl font-orbitron font-bold text-white mb-6">
                  <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Gallery
                  </span>
                </h1>
                <p className="text-xl text-gray-300 font-exo2 max-w-3xl mx-auto leading-relaxed">
                  Explore our collection of memorable moments, events, workshops, and achievements. 
                  Witness the journey of innovation and creativity in robotics and automation.
                </p>
                <div className="mt-8 flex justify-center">
                  <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full" />
                </div>
              </div>
            </div>
          </section>

          {/* Gallery Content */}
          <section className="pb-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-7xl mx-auto relative z-10">
              {isLoading ? (
                /* Loading Skeleton */
                <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                  {Array.from({ length: 20 }).map((_, index) => (
                    <div key={index} className="break-inside-avoid animate-pulse">
                      <div 
                        className="glass backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden"
                        style={{ height: `${200 + Math.random() * 200}px` }}
                      >
                        <div className="w-full h-full bg-gray-700/50" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                /* Error State */
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">⚠️</span>
                  </div>
                  <h3 className="text-2xl font-orbitron text-white mb-4">Oops! Something went wrong</h3>
                  <p className="text-gray-400 font-exo2 mb-6 max-w-md mx-auto">
                    {error}
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-exo2 font-semibold rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
                  >
                    Try Again
                  </button>
                </div>
              ) : allPhotos.length === 0 ? (
                /* Empty State */
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">📸</span>
                  </div>
                  <h3 className="text-2xl font-orbitron text-white mb-4">No Photos Yet</h3>
                  <p className="text-gray-400 font-exo2 max-w-md mx-auto">
                    Our gallery is being updated with amazing moments. Check back soon!
                  </p>
                </div>
              ) : (
                /* Gallery Grid */
                <>
                  {/* Stats */}
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center space-x-8 glass backdrop-blur-lg rounded-2xl px-8 py-4 border border-white/10">
                      <div className="text-center">
                        <div className="text-2xl font-orbitron font-bold text-purple-400">{allPhotos.length}</div>
                        <div className="text-sm text-gray-400 font-exo2">Photos</div>
                      </div>
                      <div className="w-px h-12 bg-white/20" />
                      <div className="text-center">
                        <div className="text-2xl font-orbitron font-bold text-blue-400">{galleries.length}</div>
                        <div className="text-sm text-gray-400 font-exo2">Collections</div>
                      </div>
                    </div>
                  </div>

                  {/* Masonry Grid */}
                  <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                    {allPhotos.map((photo, index) => (
                      <div key={photo.id} className="break-inside-avoid">
                        <div 
                          className="group glass backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden hover:border-purple-400/30 transition-all duration-500 hover:scale-105 cursor-pointer"
                          onClick={() => handleImageClick(index)}
                        >
                          <div className="relative overflow-hidden">
                            <Image
                              src={photo.url}
                              alt={`Gallery image ${index + 1}`}
                              width={400}
                              height={300}
                              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                              style={{ aspectRatio: 'auto' }}
                            />
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-4 left-4 right-4">
                                <div className="flex items-center justify-between">
                                  <div className="text-white font-exo2 text-sm">
                                    Click to view
                                  </div>
                                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Floating particles */}
                            <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Load More Button (Future Enhancement) */}
                  {allPhotos.length > 0 && (
                    <div className="text-center mt-16">
                      <div className="inline-flex items-center space-x-2 text-gray-400 font-exo2">
                        <span>✨</span>
                        <span>All photos loaded</span>
                        <span>✨</span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        images={allPhotos}
        currentIndex={currentImageIndex}
        onNavigate={handleNavigate}
        title="Gallery"
      />

      <Footer />
    </>
  );
}
