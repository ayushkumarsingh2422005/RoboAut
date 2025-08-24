'use client';

import { useState } from 'react';

const EventsSection = () => {

  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingEvents = [
    {
      id: 1,
      title: "RoboCup National Championship",
      date: "March 15, 2024",
      time: "09:00 AM",
      location: "NIT Jamshedpur Campus",
      type: "Competition",
      description: "Annual robotics competition featuring autonomous navigation, object manipulation, and AI challenges.",
      registrations: 45,
      maxRegistrations: 60,
      price: "₹500",
      highlights: ["Cash Prizes", "Industry Mentors", "Certificate", "Networking"]
    },
    {
      id: 2,
      title: "AI & Machine Learning Workshop",
      date: "March 22, 2024",
      time: "10:00 AM",
      location: "Computer Science Block",
      type: "Workshop",
      description: "Hands-on workshop covering neural networks, computer vision, and robotics applications.",
      registrations: 28,
      maxRegistrations: 40,
      price: "₹300",
      highlights: ["Practical Sessions", "Industry Expert", "Certification", "Project Kit"]
    },
    {
      id: 3,
      title: "Tech Talk: Future of Automation",
      date: "April 5, 2024",
      time: "02:00 PM",
      location: "Main Auditorium",
      type: "Seminar",
      description: "Industry leaders discuss emerging trends in robotics, IoT, and industrial automation.",
      registrations: 120,
      maxRegistrations: 150,
      price: "Free",
      highlights: ["Industry Insights", "Q&A Session", "Networking", "Refreshments"]
    }
  ];

  const pastEvents = [
    {
      id: 4,
      title: "Drone Building Workshop",
      date: "February 10, 2024",
      location: "Workshop Lab",
      type: "Workshop",
      description: "Comprehensive workshop on drone assembly, programming, and flight operations.",
      participants: 35,
      rating: 4.8,
      images: ["drone1.jpg", "drone2.jpg", "drone3.jpg"]
    },
    {
      id: 5,
      title: "Smart City Hackathon",
      date: "January 20-21, 2024",
      location: "Innovation Center",
      type: "Hackathon",
      description: "48-hour hackathon focused on IoT solutions for smart city infrastructure.",
      participants: 80,
      rating: 4.9,
      images: ["hack1.jpg", "hack2.jpg", "hack3.jpg"]
    },
    {
      id: 6,
      title: "Robotics Showcase",
      date: "December 15, 2023",
      location: "Exhibition Hall",
      type: "Exhibition",
      description: "Annual showcase of student projects and research in robotics and automation.",
      participants: 200,
      rating: 4.7,
      images: ["show1.jpg", "show2.jpg", "show3.jpg"]
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'Competition': return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'Workshop': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'Seminar': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'Hackathon': return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
      case 'Exhibition': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getRegistrationStatus = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return { color: 'text-red-400', status: 'Almost Full' };
    if (percentage >= 70) return { color: 'text-yellow-400', status: 'Filling Fast' };
    return { color: 'text-green-400', status: 'Available' };
  };

  return (
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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

        {/* Upcoming Events */}
        {activeTab === 'upcoming' && (
          <div className="space-y-8">
            {upcomingEvents.map((event) => {
              const registrationStatus = getRegistrationStatus(event.registrations, event.maxRegistrations);
              return (
                <div key={event.id} className="group">
                  <div className="glass backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 hover:scale-102 hover:shadow-2xl hover:shadow-blue-500/10">
                    <div className="md:flex">
                      {/* Event Info */}
                      <div className="flex-1 p-8">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-exo2 font-medium border ${getEventTypeColor(event.type)}`}>
                              {event.type}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-exo2 font-medium border ${registrationStatus.color.replace('text-', 'border-').replace('-400', '-400/30')} ${registrationStatus.color.replace('text-', 'bg-').replace('-400', '-400/10')} ${registrationStatus.color}`}>
                              {registrationStatus.status}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-orbitron font-bold text-blue-400">{event.price}</div>
                            <div className="text-sm text-gray-400 font-exo2">Registration Fee</div>
                          </div>
                        </div>

                        <h3 className="text-2xl font-orbitron font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                          {event.title}
                        </h3>

                        <div className="space-y-2 mb-4 text-gray-300 font-exo2">
                          <div className="flex items-center space-x-2">
                            <span className="text-blue-400">📅</span>
                            <span>{event.date} at {event.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-blue-400">📍</span>
                            <span>{event.location}</span>
                          </div>
                        </div>

                        <p className="text-gray-300 font-exo2 mb-6 leading-relaxed">
                          {event.description}
                        </p>

                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {event.highlights.map((highlight) => (
                            <span key={highlight} className="px-3 py-1 bg-green-500/20 text-green-300 text-sm font-exo2 rounded-lg border border-green-500/30">
                              {highlight}
                            </span>
                          ))}
                        </div>

                        {/* Registration Progress */}
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-exo2 text-gray-300">Registrations</span>
                            <span className="text-sm font-exo2 text-gray-300">{event.registrations}/{event.maxRegistrations}</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${(event.registrations / event.maxRegistrations) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Action Button */}
                        <button 
                          className="relative px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-exo2 font-semibold transition-all duration-300 hover:from-green-500 hover:to-blue-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                          style={{
                            clipPath: "polygon(0px 0px, 90% 0px, 100% 25%, 100% 100%, 10% 100%, 0px 75%)"
                          }}
                        >
                          <span className="relative z-10">Register Now</span>
                        </button>
                      </div>

                      {/* Event Visual */}
                      <div className="md:w-80 bg-gradient-to-br from-gray-800 to-gray-900 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3),transparent_70%)]" />
                        <div className="relative z-10 h-full flex items-center justify-center">
                          <div className="text-6xl opacity-50">🤖</div>
                        </div>
                        {/* Floating particles */}
                        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
                        <div className="absolute bottom-4 left-4 w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
                    <div className="relative z-10 h-full flex items-center justify-center">
                      <div className="text-4xl opacity-50">📸</div>
                    </div>
                    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-exo2 font-medium border ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-orbitron font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                      {event.title}
                    </h3>

                    <div className="space-y-1 mb-4 text-gray-300 font-exo2 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-400">📅</span>
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-400">📍</span>
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 font-exo2 text-sm mb-4 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Event Stats */}
                    <div className="flex justify-between items-center">
                      <div className="text-center">
                        <div className="text-xl font-orbitron font-bold text-purple-400">{event.participants}</div>
                        <div className="text-xs text-gray-400 font-exo2">Participants</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-orbitron font-bold text-yellow-400">{event.rating}</div>
                        <div className="text-xs text-gray-400 font-exo2">Rating</div>
                      </div>
                      <button className="px-4 py-2 bg-purple-600/20 text-purple-300 text-sm font-exo2 rounded-lg border border-purple-500/30 hover:bg-purple-600/30 transition-colors duration-300">
                        View Gallery
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Newsletter Signup */}
        {/* <div className="mt-16 text-center">
          <div className="glass backdrop-blur-lg rounded-2xl p-8 border border-green-500/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-orbitron font-bold text-white mb-4">
              Stay Updated with Latest Events
            </h3>
            <p className="text-gray-300 font-exo2 mb-6">
              Subscribe to our newsletter and never miss an exciting robotics event or workshop.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-white placeholder-gray-400 font-exo2 focus:border-green-400 focus:outline-none transition-colors duration-300"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-exo2 font-semibold rounded-lg hover:from-green-500 hover:to-blue-500 transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default EventsSection;
