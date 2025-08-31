'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import EventRegistrationModal from '@/components/EventRegistrationModal';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Event {
  id: number;
  documentId: string;
  Title: string;
  Description: string;
  Type: string;
  Date: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  EventStatus: 'Completed' | 'Open' | 'Closed';
  Thumbnail?: {
    id: number;
    documentId: string;
    url: string;
  };
}

const EventsSection = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Modal functions
  const handleRegisterClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/events?populate[Thumbnail][fields]=url`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        const eventsData = data.data || [];
        console.log('Events data:', eventsData);
        setEvents(eventsData);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Filter events based on status
  const upcomingEvents = events.filter(event => 
    event.EventStatus === 'Open' || event.EventStatus === 'Closed'
  );
  const pastEvents = events.filter(event => 
    event.EventStatus === 'Completed'
  );



  const getEventTypeColor = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('competition')) return 'text-red-400 bg-red-400/10 border-red-400/30';
    if (lowerType.includes('workshop')) return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
    if (lowerType.includes('seminar')) return 'text-green-400 bg-green-400/10 border-green-400/30';
    if (lowerType.includes('hackathon')) return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
    if (lowerType.includes('exhibition')) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
    return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'Closed': return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'Completed': return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };



  return (
    <>
    <Navbar />
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden pt-40">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-blue-900/10 to-purple-900/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(34,197,94,0.1),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-orbitron font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Events & Workshops
            </span>
          </h2>
          <p className="text-xl text-gray-300 font-exo2 max-w-3xl mx-auto leading-relaxed">
            Join our exciting events, workshops, and competitions to enhance your skills, 
            network with peers, and stay updated with the latest in robotics and automation.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-purple-400 rounded-full" />
          </div>
        </div>

        {/* Tab Navigation */}
        {!isLoading && (
          <div className="flex justify-center mb-12">
            <div className="glass backdrop-blur-lg rounded-2xl p-2 border border-white/10">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`px-6 py-3 font-exo2 font-medium rounded-xl transition-all duration-300 ${
                    activeTab === 'upcoming'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Upcoming Events
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`px-6 py-3 font-exo2 font-medium rounded-xl transition-all duration-300 ${
                    activeTab === 'past'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Past Events
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Events Content */}
        {isLoading ? (
          <>
            {/* Tab Navigation Skeleton */}
            <div className="flex justify-center mb-12">
              <div className="glass backdrop-blur-lg rounded-2xl p-2 border border-white/10">
                <div className="flex space-x-2">
                  <div className="animate-pulse">
                    <div className="w-32 h-12 bg-gray-700/50 rounded-xl" />
                  </div>
                  <div className="animate-pulse">
                    <div className="w-28 h-12 bg-gray-700/50 rounded-xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Mixed Events Skeleton - Shows both upcoming and past event styles */}
            <div className="space-y-8 mb-16">
              {/* Upcoming Event Style Skeletons */}
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={`upcoming-${index}`} className="animate-pulse">
                  <div className="glass backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
                    <div className="md:flex">
                      <div className="flex-1 p-8">
                        {/* Badges and Price */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-20 h-6 bg-gray-700/50 rounded-full" />
                            <div className="w-16 h-6 bg-gray-700/50 rounded-full" />
                          </div>
                          <div className="text-right">
                            <div className="w-16 h-8 bg-gray-700/50 rounded mb-1" />
                            <div className="w-20 h-4 bg-gray-700/50 rounded" />
                          </div>
                        </div>

                        {/* Title */}
                        <div className="w-3/4 h-8 bg-gray-700/50 rounded mb-4" />

                        {/* Date and Location */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gray-700/50 rounded" />
                            <div className="w-48 h-4 bg-gray-700/50 rounded" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gray-700/50 rounded" />
                            <div className="w-40 h-4 bg-gray-700/50 rounded" />
                          </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2 mb-6">
                          <div className="w-full h-4 bg-gray-700/50 rounded" />
                          <div className="w-full h-4 bg-gray-700/50 rounded" />
                          <div className="w-3/4 h-4 bg-gray-700/50 rounded" />
                        </div>

                        {/* Register Button */}
                        <div className="w-36 h-12 bg-gray-700/50 rounded" 
                             style={{
                               clipPath: "polygon(0px 0px, 90% 0px, 100% 25%, 100% 100%, 10% 100%, 0px 75%)"
                             }} />
                      </div>

                      {/* Event Visual */}
                      <div className="md:w-80 h-48 md:h-auto bg-gray-700/50" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Past Events Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={`past-${index}`} className="animate-pulse">
                  <div className="glass backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
                    {/* Event Image */}
                    <div className="h-48 bg-gray-700/50 relative">
                      <div className="absolute top-4 left-4 w-20 h-6 bg-gray-600/50 rounded-full" />
                    </div>

                    {/* Event Content */}
                    <div className="p-6">
                      {/* Title */}
                      <div className="w-3/4 h-6 bg-gray-700/50 rounded mb-4" />

                      {/* Date, Location, Status */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-gray-700/50 rounded" />
                          <div className="w-32 h-4 bg-gray-700/50 rounded" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-gray-700/50 rounded" />
                          <div className="w-40 h-4 bg-gray-700/50 rounded" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-gray-700/50 rounded" />
                          <div className="w-24 h-4 bg-gray-700/50 rounded" />
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-2 mb-4">
                        <div className="w-full h-4 bg-gray-700/50 rounded" />
                        <div className="w-full h-4 bg-gray-700/50 rounded" />
                        <div className="w-2/3 h-4 bg-gray-700/50 rounded" />
                      </div>

                      {/* Stats */}
                      <div className="flex justify-between">
                        <div className="text-center">
                          <div className="w-16 h-6 bg-gray-700/50 rounded mb-1" />
                          <div className="w-12 h-3 bg-gray-700/50 rounded" />
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-6 bg-gray-700/50 rounded mb-1" />
                          <div className="w-8 h-3 bg-gray-700/50 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
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
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-exo2 font-semibold rounded-xl hover:from-green-500 hover:to-blue-500 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Upcoming Events */}
            {activeTab === 'upcoming' && (
              <div className="space-y-8">
                {upcomingEvents.map((event) => (
                <div key={event.id} className="group">
                  <div className="glass backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 hover:scale-102 hover:shadow-2xl hover:shadow-blue-500/10">
                    <div className="md:flex">
                      {/* Event Info */}
                      <div className="flex-1 p-8">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-exo2 font-medium border ${getEventTypeColor(event.Type)}`}>
                              {event.Type}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-exo2 font-medium border ${getStatusColor(event.EventStatus)}`}>
                              {event.EventStatus}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-orbitron font-bold text-blue-400">₹Free</div>
                            <div className="text-sm text-gray-400 font-exo2">Registration</div>
                          </div>
                        </div>

                        <h3 className="text-2xl font-orbitron font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                          {event.Title}
                        </h3>

                        <div className="space-y-2 mb-4 text-gray-300 font-exo2">
                          <div className="flex items-center space-x-2">
                            <span className="text-blue-400">📅</span>
                            <span>{new Date(event.Date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-blue-400">🏫</span>
                            <span>NIT Jamshedpur Campus</span>
                          </div>
                        </div>

                        <p className="text-gray-300 font-exo2 mb-6 leading-relaxed">
                          {event.Description}
                        </p>

                        {/* Action Button */}
                        <button 
                          onClick={() => handleRegisterClick(event)}
                          disabled={event.EventStatus === 'Closed'}
                          className={`relative px-8 py-3 font-exo2 font-semibold transition-all duration-300 ${
                            event.EventStatus === 'Closed'
                              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                              : 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-500 hover:to-blue-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]'
                          }`}
                          style={{
                            clipPath: "polygon(0px 0px, 90% 0px, 100% 25%, 100% 100%, 10% 100%, 0px 75%)"
                          }}
                        >
                          <span className="relative z-10">
                            {event.EventStatus === 'Closed' ? 'Registration Closed' : 'Register Now'}
                          </span>
                        </button>
                      </div>

                      {/* Event Visual */}
                      <div className="md:w-80 bg-gradient-to-br from-gray-800 to-gray-900 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3),transparent_70%)]" />
                        <div className="relative z-10 h-full flex items-center justify-center overflow-hidden">
                          {event.Thumbnail ? (
                            <Image
                              src={event.Thumbnail.url}
                              alt={event.Title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="text-6xl opacity-50">🤖</div>
                          )}
                        </div>
                        {/* Floating particles */}
                        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
                        <div className="absolute bottom-4 left-4 w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            )}

            {/* Past Events */}
            {activeTab === 'past' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastEvents.map((event) => (
              <div key={event.id} className="group">
                <div className="glass backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10">
                  {/* Event Image */}
                  <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.3),transparent_70%)]" />
                    <div className="relative z-10 h-full flex items-center justify-center overflow-hidden">
                      {event.Thumbnail ? (
                        <Image
                          src={event.Thumbnail.url}
                          alt={event.Title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="text-4xl opacity-50">📸</div>
                      )}
                    </div>
                    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-exo2 font-medium border ${getEventTypeColor(event.Type)}`}>
                      {event.Type}
                    </span>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-orbitron font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                      {event.Title}
                    </h3>

                    <div className="space-y-1 mb-4 text-gray-300 font-exo2 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-400">📅</span>
                        <span>{new Date(event.Date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-400">🏫</span>
                        <span>NIT Jamshedpur Campus</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-400">✅</span>
                        <span>{event.EventStatus}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 font-exo2 text-sm mb-4 leading-relaxed line-clamp-3">
                      {event.Description}
                    </p>

                    {/* Event Info */}
                    <div className="flex justify-between items-center">
                      <div className="text-center">
                        <div className="text-lg font-orbitron font-bold text-purple-400">{event.Type}</div>
                        <div className="text-xs text-gray-400 font-exo2">Event Type</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-orbitron font-bold text-yellow-400">{new Date(event.Date).getFullYear()}</div>
                        <div className="text-xs text-gray-400 font-exo2">Year</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                ))}
              </div>
            )}
          </>
        )}

        
      </div>
    </section>
    <Footer />
    
    {/* Registration Modal */}
    <EventRegistrationModal 
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      event={selectedEvent}
    />
    </>
  );
};

export default EventsSection;
