'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { TeamGridSkeleton, DepartmentSkeleton } from '@/components/TeamSkeleton';
import Image from 'next/image';
import { useEffect, useState, useCallback, useMemo } from 'react';

interface TeamMember {
  id: number;
  Name: string;
  Designation: string;
  Email: string;
  Phone: string;
  Instagram?: string;
  LinkedIn?: string;
  Github?: string;
  Description: string;
  ProfileImage: {
    url: string;
  };
}

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Define available departments for filtering
  const departments = useMemo(() => [
    {
      value: 'all',
      name: "All Members",
      count: 0,
      description: "Complete team overview",
      icon: "👥"
    },
    {
      value: "technical",
      name: "Technical Team",
      count: 0,
      description: "Software development, hardware design, and system integration",
      icon: "⚙️"
    },
    {
      value: "research",
      name: "Research Team",
      count: 0,
      description: "Advanced research in AI, ML, and emerging technologies",
      icon: "🔬"
    },
    {
      value: "events",
      name: "Events Team",
      count: 0,
      description: "Workshop organization, competitions, and outreach programs",
      icon: "🎯"
    },
    {
      value: "media",
      name: "Media Team",
      count: 0,
      description: "Content creation, social media, and documentation",
      icon: "📸"
    }
  ], []);

  // Get department color based on designation
  const getDepartmentColor = (designation: string) => {
    const designationLower = designation.toLowerCase();
    if (designationLower.includes('founder') || designationLower.includes('president')) {
      return 'from-red-500 to-pink-500';
    } else if (designationLower.includes('head') || designationLower.includes('lead')) {
      return 'from-blue-500 to-cyan-500';
    } else if (designationLower.includes('technical') || designationLower.includes('developer')) {
      return 'from-green-500 to-emerald-500';
    } else if (designationLower.includes('research')) {
      return 'from-purple-500 to-violet-500';
    } else if (designationLower.includes('events') || designationLower.includes('coordinator')) {
      return 'from-orange-500 to-amber-500';
    } else if (designationLower.includes('media') || designationLower.includes('content')) {
      return 'from-indigo-500 to-blue-500';
    } else {
      return 'from-gray-500 to-slate-500';
    }
  };

  // Get department icon based on designation
  const getDepartmentIcon = (designation: string) => {
    const designationLower = designation.toLowerCase();
    if (designationLower.includes('founder') || designationLower.includes('president')) {
      return '👑';
    } else if (designationLower.includes('head') || designationLower.includes('lead')) {
      return '🎯';
    } else if (designationLower.includes('technical') || designationLower.includes('developer')) {
      return '⚙️';
    } else if (designationLower.includes('research')) {
      return '🔬';
    } else if (designationLower.includes('events') || designationLower.includes('coordinator')) {
      return '🎪';
    } else if (designationLower.includes('media') || designationLower.includes('content')) {
      return '📸';
    } else {
      return '👤';
    }
  };



  // Update department counts
  const updateDepartmentCounts = useCallback((members: TeamMember[]) => {
    const counts = {
      all: members.length,
      technical: members.filter(m => m.Designation.toLowerCase().includes('technical') || m.Designation.toLowerCase().includes('developer')).length,
      research: members.filter(m => m.Designation.toLowerCase().includes('research')).length,
      events: members.filter(m => m.Designation.toLowerCase().includes('events') || m.Designation.toLowerCase().includes('coordinator')).length,
      media: members.filter(m => m.Designation.toLowerCase().includes('media') || m.Designation.toLowerCase().includes('content')).length,
    };

    departments.forEach(dept => {
      if (dept.value !== 'all') {
        dept.count = counts[dept.value as keyof typeof counts] || 0;
      } else {
        dept.count = counts.all;
      }
    });
  }, [departments]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/pors?populate[ProfileImage][fields]=url&sort=Rank:asc`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }
        const data = await response.json();
        const members = data.data || [];
        console.log(members)
        setTeamMembers(members);
        updateDepartmentCounts(members);
      } catch (err) {
        console.error("Error fetching team members:", err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeamMembers();
  }, [updateDepartmentCounts]);


  const filteredMembers = teamMembers;

  return (
    <>
      <Navbar />
      <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden pt-40">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-purple-900/10 to-pink-900/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(99,102,241,0.1),transparent_50%)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-orbitron font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Our Team
              </span>
            </h2>
            <p className="text-xl text-gray-300 font-exo2 max-w-3xl mx-auto leading-relaxed">
              Meet the brilliant minds behind RoboAut. Our diverse team of students and faculty
              work together to push the boundaries of robotics and automation technology.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full" />
            </div>
          </div>



          {/* Team Members Content */}
          {isLoading ? (
            <>
              <TeamGridSkeleton />
              <DepartmentSkeleton />
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
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-exo2 font-semibold rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Enhanced Team Members Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {filteredMembers.map((member, index) => (
                  <div
                    key={member.id}
                    className="group relative animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div
                      className={`relative glass backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 transform`}
                    >

                      {/* Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${getDepartmentColor(member.Designation)} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />

                      {/* Member Photo */}
                      <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900">
                        <div className={`absolute inset-0 bg-gradient-to-br ${getDepartmentColor(member.Designation)} opacity-30`} />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
                        <div className="relative z-10 h-full flex items-center justify-center overflow-hidden">
                          <Image
                            src={member.ProfileImage.url}
                            alt={member.Name}
                            width={256}
                            height={256}
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>

                        {/* Social Links Overlay */}
                        <div className={`absolute inset-0 bg-black/80 flex items-center justify-center space-x-4 transition-opacity duration-300 z-10 opacity-0 group-hover:opacity-100`}>
                          {member.LinkedIn && (
                            <a
                              href={member.LinkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-300 hover:scale-110"
                              title="LinkedIn"
                            >
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              </svg>
                            </a>
                          )}
                          {/* Instagram */}
                          {member.Instagram && (
                            <a
                              href={member.Instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-300 hover:scale-110"
                              title="Instagram"
                            >
                              <svg
                                className="w-6 h-6 text-white"
                                fill="currentColor"
                                viewBox="0 0 448 512"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9 114.9-51.3 114.9-114.9S287.6 141 224.1 141zm0 189.6c-41.2 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.5 74.7-74.7 74.7zm146.4-194.3 c0 14.9-12 26.9-26.9 26.9-14.9 0-26.9-12-26.9-26.9 0-14.9 12-26.9 26.9-26.9 14.9 0 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9 -26.2-26.2-58-34.4-93.9-36.2 -37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9 26.2 26.2 58 34.4 93.9 36.2 37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1 s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9 s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                              </svg>
                            </a>
                          )}
                          {/* Github */}
                          {member.Github && (
                            <a
                              href={member.Github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-300 hover:scale-110"
                              title="GitHub"
                            >
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                            </a>
                          )}
                          {/* Phone */}
                          {member.Phone && (
                            <a
                              href={`tel:${member.Phone}`}
                              className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-300 hover:scale-110"
                              title="Phone"
                            >
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                              </svg>
                            </a>
                          )}
                          {/* Email */}
                          {member.Email && (
                            <a
                              href={`mailto:${member.Email}`}
                              className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-300 hover:scale-110"
                              title="Email"
                            >
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Member Info */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-orbitron font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                            {member.Name}
                          </h3>
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center border border-white/20">
                            <span className="text-white/60 text-sm">#{index + 1}</span>
                          </div>
                        </div>

                        <div className={`text-lg font-exo2 font-semibold mb-3 bg-gradient-to-r ${getDepartmentColor(member.Designation)} bg-clip-text text-transparent`}>
                          {member.Designation}
                        </div>

                        <div className="text-gray-300 font-exo2 text-sm mb-3">
                          {member.Description}
                        </div>

                        {/* Department Badge */}
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{getDepartmentIcon(member.Designation)}</span>
                          <span className="text-xs text-gray-400 font-exo2">
                            {member.Designation.includes('Founder') || member.Designation.includes('President')
                              ? 'Leadership'
                              : member.Designation.includes('Head')
                                ? 'Management'
                                : 'Team Member'
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Department Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {departments.slice(1).map((dept) => (
                  <div key={dept.name} className="glass backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-500 hover:scale-105">
                    <div className="text-center">
                      <div className="text-4xl mb-4">{dept.icon}</div>
                      <h3 className="text-lg font-orbitron font-bold text-white mb-2">{dept.name}</h3>
                      <div className="text-3xl font-orbitron font-bold text-purple-400 mb-2">{dept.count}</div>
                      <p className="text-gray-300 font-exo2 text-sm leading-relaxed">{dept.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TeamSection;
