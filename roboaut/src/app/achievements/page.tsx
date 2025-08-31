'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { AchievementsGridSkeleton } from '@/components/AchievementSkeleton';
import ImageModal from '@/components/ImageModal';
import { useState, useEffect, useRef } from 'react';

interface Achievement {
  id: number;
  documentId: string;
  Title: string;
  Description: string;
  Link?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Year: number;
  Images?: {
    id: number;
    documentId: string;
    url: string;
  }[];
  Pdf?: {
    id: number;
    documentId: string;
    url: string;
  }[];
}

const AchievementsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    projects: 0,
    members: 0,
    awards: 0,
    workshops: 0
  });
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<{
    images: { id: number; url: string; documentId: string; }[];
    currentIndex: number;
    title: string;
  } | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fetch achievements from API
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/achievements?populate[Images][fields]=url&populate[Pdf][fields]=url`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch achievements');
        }
        const data = await response.json();
        const achievementsData = data.data || [];
        console.log('Achievements data:', achievementsData);
        setAchievements(achievementsData);
      } catch (err) {
        console.error("Error fetching achievements:", err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  // Intersection Observer for triggering animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animated counters
  useEffect(() => {
    if (isVisible) {
      const finalCounts = {
        projects: 25,
        members: 150,
        awards: 12,
        workshops: 30
      };

      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      Object.keys(finalCounts).forEach((key) => {
        const finalCount = finalCounts[key as keyof typeof finalCounts];
        let currentCount = 0;
        const increment = finalCount / steps;

        const timer = setInterval(() => {
          currentCount += increment;
          if (currentCount >= finalCount) {
            currentCount = finalCount;
            clearInterval(timer);
          }
          setCounters(prev => ({
            ...prev,
            [key]: Math.floor(currentCount)
          }));
        }, stepDuration);
      });
    }
  }, [isVisible]);

  return (
    <>
      <Navbar />
      <section id="achievements" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-40">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.1),transparent_50%)]" />

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-orbitron font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Our Achievements
              </span>
            </h2>
            <p className="text-xl text-gray-300 font-exo2 max-w-3xl mx-auto leading-relaxed">
              Celebrating excellence in robotics, innovation, and technological advancement.
              Our journey of success and recognition in the field of automation.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full" />
            </div>
          </div>

          {/* Stats Counter */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center glass backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500">
              <div className="text-4xl lg:text-5xl font-orbitron font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                {counters.projects}+
              </div>
              <div className="text-gray-300 font-exo2 text-lg">Projects Completed</div>
              <div className="w-8 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mx-auto mt-3" />
            </div>

            <div className="text-center glass backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500">
              <div className="text-4xl lg:text-5xl font-orbitron font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {counters.members}+
              </div>
              <div className="text-gray-300 font-exo2 text-lg">Active Members</div>
              <div className="w-8 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mt-3" />
            </div>

            <div className="text-center glass backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500">
              <div className="text-4xl lg:text-5xl font-orbitron font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                {counters.awards}+
              </div>
              <div className="text-gray-300 font-exo2 text-lg">Awards Won</div>
              <div className="w-8 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto mt-3" />
            </div>

            <div className="text-center glass backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500">
              <div className="text-4xl lg:text-5xl font-orbitron font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent mb-2">
                {counters.workshops}+
              </div>
              <div className="text-gray-300 font-exo2 text-lg">Workshops Conducted</div>
              <div className="w-8 h-1 bg-gradient-to-r from-green-400 to-teal-400 rounded-full mx-auto mt-3" />
            </div>
          </div>

          {/* Achievement Cards Content */}
          {isLoading ? (
            <AchievementsGridSkeleton />
          ) : error ? (
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {achievements.map((achievement) => (
              <div key={achievement.id} className="group relative">
                <div className="relative glass backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">

                  {/* Background Gradient (default) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-pink-500/20 opacity-10 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl" />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Year */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-orbitron font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                        {achievement.Title}
                      </h3>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm font-exo2 rounded-full border border-blue-500/30">
                        {achievement.Year}
                      </span>
                    </div>

                    {/* Images Preview */}
                    {achievement.Images && achievement.Images.length > 0 && (
                      <div className="flex gap-3 mb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700">
                        {achievement.Images.map((img, index) => (
                          <img
                            key={img.id}
                            src={img.url}
                            alt={achievement.Title}
                            className="w-28 h-20 object-cover rounded-lg border border-white/10 hover:scale-105 transition-transform duration-300 cursor-pointer hover:border-blue-400/40"
                            onClick={() => setModalImage({
                              images: achievement.Images!,
                              currentIndex: index,
                              title: achievement.Title
                            })}
                            title="Click to view full size"
                          />
                        ))}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-gray-300 font-exo2 leading-relaxed mb-6 line-clamp-5">
                      {achievement.Description}
                    </p>

                    {/* Decorative Line */}
                    <div className="w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Action Links */}
                    <div className="flex flex-wrap gap-3 mt-4">
                      {/* PDF Link */}
                      {achievement.Pdf && achievement.Pdf.length > 0 && (
                        <a
                          href={achievement.Pdf[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-exo2 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 text-white hover:from-red-500 hover:to-orange-500 transition-all duration-300 hover:scale-105"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                          </svg>
                          View Certificate
                        </a>
                      )}

                      {/* Optional Link */}
                      {achievement.Link && (
                        <a
                          href={achievement.Link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-exo2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 transition-all duration-300 hover:scale-105"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                          </svg>
                          Learn More
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Floating Particles */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '0.5s' }} />
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-xl rounded-2xl -z-10 transition-opacity duration-500" />
              </div>
            ))}

            </div>
          )}

          {/* Call to Action */}
          {/* <div className="text-center mt-16">
          <div className="glass backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-orbitron font-bold text-white mb-4">
              Be Part of Our Success Story
            </h3>
            <p className="text-gray-300 font-exo2 mb-6">
              Join RoboAut and contribute to the next generation of robotic innovations. 
              Together, we can achieve even greater milestones.
            </p>
            <button 
              className="relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-exo2 font-semibold text-lg transition-all duration-300 hover:from-purple-500 hover:to-blue-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
              style={{
                clipPath: "polygon(0px 0px, 90% 0px, 100% 25%, 100% 100%, 10% 100%, 0px 75%)"
              }}
            >
              <span className="relative z-10">Join Our Team</span>
            </button>
          </div>
        </div> */}
        </div>
      </section>
      <Footer />

      {/* Image Modal */}
      <ImageModal
        isOpen={modalImage !== null}
        onClose={() => setModalImage(null)}
        images={modalImage?.images || []}
        currentIndex={modalImage?.currentIndex || 0}
        title={modalImage?.title || ''}
        onNavigate={(newIndex) => {
          if (modalImage) {
            setModalImage({
              ...modalImage,
              currentIndex: newIndex
            });
          }
        }}
      />
    </>
  );
};

export default AchievementsSection;
