'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ProjectsGridSkeleton } from '@/components/ProjectSkeleton';
import Image from 'next/image';

// TypeScript interfaces for project data
interface ProjectImage {
  id: number;
  url: string;
  alternativeText?: string;
  caption?: string;
}

interface Project {
  id: number;
  Title: string;
  Description: string;
  CurrentStatus: string;
  Team_Lead: string;
  Team_Members: string;
  Technologies_Used: string;
  Start_Date: string;
  End_Date?: string;
  Links: string;
  Image: ProjectImage[];
}

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Define available statuses for filtering
  const statusOptions = [
    { value: 'all', label: 'All Projects', icon: '🌟' },
    { value: 'complete', label: 'Completed', icon: '✓' },
    { value: 'ongoing', label: 'Ongoing', icon: '⟳' },
    { value: 'research phase', label: 'Research', icon: '🔬' }
  ];

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'complete':
      case 'completed':
        return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30';
      case 'in progress':
      case 'ongoing':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'research phase':
        return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
      case 'prototype':
        return 'text-amber-400 bg-amber-400/10 border-amber-400/30';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'complete':
      case 'completed':
        return '✓';
      case 'in progress':
      case 'ongoing':
        return '⟳';
      case 'research phase':
        return '🔬';
      case 'prototype':
        return '⚡';
      default:
        return '●';
    }
  };

  // Filter projects based on selected status
  const filterProjects = (status: string) => {
    setSelectedStatus(status);
    if (status === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        project.CurrentStatus?.toLowerCase().includes(status.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/projects?populate=Image`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data.data || []);
        setFilteredProjects(data.data || []); // Initialize filtered projects
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  return (
    <>
      <Navbar />
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden pt-40">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-cyan-900/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(59,130,246,0.1),transparent_50%)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-orbitron font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Our Projects
              </span>
            </h2>
            <p className="text-xl text-gray-300 font-exo2 max-w-3xl mx-auto leading-relaxed">
              Pushing the boundaries of robotics and automation through innovative projects
              that solve real-world problems and advance technological frontiers.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
            </div>
          </div>

          {/* Status Filter */}
          {!isLoading && !error && projects.length > 0 && (
            <div className="mb-12">
              <div className="flex flex-wrap justify-center gap-3">
                {statusOptions.map((status) => (
                  <button
                    key={status.value}
                    onClick={() => filterProjects(status.value)}
                    className={`group flex items-center space-x-2 px-6 py-3 rounded-2xl font-exo2 font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                      selectedStatus === status.value
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-white/20 hover:border-white/40'
                    }`}
                  >
                    <span className="text-lg">{status.icon}</span>
                    <span>{status.label}</span>
                    {selectedStatus === status.value && (
                      <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                        {filteredProjects.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              
              {/* Filter Results Summary */}
              <div className="text-center mt-6">
                <p className="text-gray-400 font-exo2">
                  {selectedStatus === 'all' 
                    ? `Showing all ${projects.length} projects`
                    : `Showing ${filteredProjects.length} ${selectedStatus} project${filteredProjects.length !== 1 ? 's' : ''}`
                  }
                </p>
              </div>
            </div>
          )}

          {/* Projects Content */}
          {isLoading ? (
            <ProjectsGridSkeleton />
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
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-exo2 font-semibold rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-2xl font-orbitron text-white mb-4">
                {selectedStatus === 'all' ? 'No Projects Found' : `No ${selectedStatus} Projects`}
              </h3>
              <p className="text-gray-400 font-exo2 max-w-md mx-auto">
                {selectedStatus === 'all' 
                  ? "We're currently working on some amazing projects. Check back soon!"
                  : `No projects found with "${selectedStatus}" status. Try selecting a different filter.`
                }
              </p>
              {selectedStatus !== 'all' && (
                <button
                  onClick={() => filterProjects('all')}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-exo2 font-semibold rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                >
                  View All Projects
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Enhanced Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {filteredProjects.map((project, index) => {
                  const imgUrl = project.Image?.[0]?.url || '/placeholder.jpg';
                  return (
                    <div
                      key={project.id}
                      className="group relative animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      {/* Enhanced Project Card */}
                      <div
                        className={`relative h-[420px] glass backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden transition-all duration-700 transform ${
                          hoveredProject === project.id
                            ? 'scale-105 shadow-2xl shadow-blue-500/30 -translate-y-2'
                            : 'hover:scale-102 hover:-translate-y-1'
                        }`}
                      >
                        {/* Enhanced Background Image */}
                        <div className="absolute inset-0">
                          <Image
                            src={imgUrl}
                            alt={project.Title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            priority={false}
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80" />
                        </div>

                        {/* Enhanced Overlay with Pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/60 to-gray-900/60" />
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.3),transparent_50%)]" />
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.3),transparent_50%)]" />
                        </div>

                        {/* Enhanced Content */}
                        <div className="relative z-10 p-8 h-auto flex flex-col">
                          {/* Enhanced Status Badge */}
                          <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center space-x-2">
                              <span
                                className={`px-4 py-2 rounded-full text-sm font-exo2 font-semibold border-2 backdrop-blur-sm ${getStatusColor(
                                  project.CurrentStatus
                                )}`}
                              >
                                <span className="mr-2">{getStatusIcon(project.CurrentStatus)}</span>
                                {project.CurrentStatus}
                              </span>
                            </div>
                          </div>

                          {/* Enhanced Project Title */}
                          <h3 className="text-2xl font-orbitron font-bold text-white mb-4 group-hover:text-blue-400 transition-all duration-300 leading-tight">
                            {project.Title}
                          </h3>

                          {/* Enhanced Project Description */}
                          <p className="text-gray-300 font-exo2 text-base mb-6 flex-grow line-clamp-6">
                            {project.Description}
                          </p>

                          {/* Enhanced Action Button */}
                          <button
                            onClick={() => openModal(project)}
                            className="group/btn w-full px-6 py-3 bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white font-exo2 font-semibold text-sm rounded-xl transition-all duration-300 hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 relative overflow-hidden"
                          >
                            <span className="relative z-10 flex items-center justify-center">
                              <span className="mr-2">View Details</span>
                              <span className="transform group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                          </button>
                        </div>

                        {/* Enhanced Hover Effects */}
                        {hoveredProject === project.id && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl rounded-3xl -z-10 animate-pulse-glow" />
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Enhanced Project Modal */}
      {isModalOpen && selectedProject && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in h-screen"
          onClick={closeModal}
        >
          <div 
            className="bg-gray-900/95 backdrop-blur-xl max-w-4xl w-full rounded-3xl shadow-2xl overflow-y-scroll no-scrollbar relative border border-white/20 animate-slide-in-left h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Enhanced Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 w-10 h-10 bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-20 backdrop-blur-sm border border-white/10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Enhanced Modal Content */}
            <div className="p-8">
              {/* Enhanced Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-orbitron text-white mb-2">
                      {selectedProject.Title}
                    </h2>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-exo2 font-semibold border-2 ${getStatusColor(
                          selectedProject.CurrentStatus
                        )}`}
                      >
                        <span className="mr-2">{getStatusIcon(selectedProject.CurrentStatus)}</span>
                        {selectedProject.CurrentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Image Gallery */}
              {selectedProject.Image?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-orbitron text-white mb-4 flex items-center">
                    <span className="mr-2">📸</span>
                    Project Gallery
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedProject.Image.map((img: ProjectImage, index: number) => (
                      <div key={img.id} className="group relative overflow-hidden rounded-2xl border border-white/20 h-48">
                        <Image
                          src={img.url}
                          alt={`${selectedProject.Title} - Image ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          priority={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-3 left-3 text-white/80 text-sm font-exo2">
                          Image {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Enhanced Description */}
              <div className="mb-8">
                <h3 className="text-xl font-orbitron text-white mb-4 flex items-center">
                  <span className="mr-2">📝</span>
                  Project Description
                </h3>
                <div className="bg-gray-800/30 rounded-2xl p-6 border border-white/10">
                  <p className="text-gray-300 font-exo2 text-base leading-relaxed whitespace-pre-line">
                    {selectedProject.Description}
                  </p>
                </div>
              </div>

              {/* Enhanced Project Links */}
              {selectedProject.Links && (
                <div className="flex justify-center">
                  <a
                    href={selectedProject.Links.replace(/"/g, '')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-exo2 font-semibold text-lg rounded-2xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                  >
                    <span className="mr-3">🔗</span>
                    <span>Visit Project</span>
                    <span className="ml-3 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ProjectsSection;
