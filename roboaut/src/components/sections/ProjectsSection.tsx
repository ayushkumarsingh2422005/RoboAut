'use client';

import { useState } from 'react';

const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "Autonomous Navigation Bot",
      description: "Advanced AI-powered robot capable of autonomous navigation in complex environments using computer vision and LIDAR sensors.",
      technologies: ["Python", "OpenCV", "ROS", "TensorFlow"],
      status: "Completed",
      image: "/project1.jpg",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Smart Home Automation",
      description: "IoT-based home automation system with voice control, mobile app integration, and energy optimization algorithms.",
      technologies: ["Arduino", "ESP32", "React Native", "Firebase"],
      status: "In Progress",
      image: "/project2.jpg",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Robotic Arm Controller",
      description: "6-DOF robotic arm with precise control system for industrial automation and research applications.",
      technologies: ["C++", "MATLAB", "Solidworks", "PID Control"],
      status: "Completed",
      image: "/project3.jpg",
      gradient: "from-green-500 to-teal-500"
    },
    {
      id: 4,
      title: "Drone Swarm System",
      description: "Coordinated multi-drone system for search and rescue operations with real-time communication protocols.",
      technologies: ["Python", "MAVLink", "Computer Vision", "Networking"],
      status: "Research Phase",
      image: "/project4.jpg",
      gradient: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      title: "AI Chess Robot",
      description: "Intelligent chess-playing robot with computer vision for piece recognition and mechanical arm for moves.",
      technologies: ["Python", "Chess Engine", "OpenCV", "Servo Control"],
      status: "Completed",
      image: "/project5.jpg",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      id: 6,
      title: "Warehouse Automation",
      description: "Automated inventory management system with robotic sorting and real-time tracking capabilities.",
      technologies: ["ROS", "RFID", "Database", "Machine Learning"],
      status: "Prototype",
      image: "/project6.jpg",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'In Progress': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'Research Phase': return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
      case 'Prototype': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Card */}
              <div className={`relative h-96 glass backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 transform ${
                hoveredProject === project.id 
                  ? 'scale-105 shadow-2xl shadow-blue-500/20' 
                  : 'hover:scale-102'
              }`}>
                
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                
                {/* Project Image Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-50" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
                
                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col">
                  {/* Status Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-exo2 font-medium border ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl font-orbitron font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-gray-300 font-exo2 text-sm leading-relaxed mb-4 flex-grow">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs font-exo2 rounded-lg border border-blue-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white font-exo2 font-medium text-sm rounded-lg transition-all duration-300 hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-blue-500/25 group-hover:scale-105">
                      View Details
                    </button>
                  </div>
                </div>

                {/* Floating Particles */}
                {hoveredProject === project.id && (
                  <>
                    <div className="absolute top-4 right-4 w-1 h-1 bg-blue-400 rounded-full animate-ping" />
                    <div className="absolute bottom-4 left-4 w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse" />
                    <div className="absolute top-1/2 left-4 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                  </>
                )}
              </div>

              {/* Hover Glow Effect */}
              {hoveredProject === project.id && (
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 blur-xl rounded-2xl -z-10 animate-pulse`} />
              )}
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <button 
            className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-exo2 font-semibold text-lg transition-all duration-300 hover:from-blue-500 hover:to-purple-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
            style={{
              clipPath: "polygon(0px 0px, 90% 0px, 100% 25%, 100% 100%, 10% 100%, 0px 75%)"
            }}
          >
            <span className="relative z-10">View All Projects</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
