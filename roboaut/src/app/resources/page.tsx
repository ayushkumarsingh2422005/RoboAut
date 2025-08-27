'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useState } from 'react';

const ResourcesSection = () => {
  const [activeCategory, setActiveCategory] = useState('tutorials');

  const resources = {
    tutorials: [
      {
        id: 1,
        title: "Getting Started with Arduino",
        description: "Complete beginner's guide to Arduino programming and circuit design",
        type: "Video Series",
        duration: "3 hours",
        level: "Beginner",
        downloads: 1250,
        rating: 4.8,
        thumbnail: "/resources/arduino.jpg"
      },
      {
        id: 2,
        title: "ROS Programming Fundamentals",
        description: "Learn Robot Operating System from basics to advanced concepts",
        type: "PDF Guide",
        pages: 120,
        level: "Intermediate",
        downloads: 890,
        rating: 4.9,
        thumbnail: "/resources/ros.jpg"
      },
      {
        id: 3,
        title: "Computer Vision for Robotics",
        description: "OpenCV and deep learning techniques for robotic vision systems",
        type: "Workshop Recording",
        duration: "5 hours",
        level: "Advanced",
        downloads: 560,
        rating: 4.7,
        thumbnail: "/resources/cv.jpg"
      }
    ],
    projects: [
      {
        id: 4,
        title: "Line Following Robot",
        description: "Complete source code and documentation for autonomous line following",
        type: "GitHub Repository",
        language: "C++/Arduino",
        level: "Beginner",
        downloads: 2100,
        rating: 4.6,
        thumbnail: "/projects/line_robot.jpg"
      },
      {
        id: 5,
        title: "Gesture Controlled Robot",
        description: "Hand gesture recognition using computer vision and servo control",
        type: "Complete Project",
        language: "Python",
        level: "Intermediate",
        downloads: 1680,
        rating: 4.8,
        thumbnail: "/projects/gesture_robot.jpg"
      },
      {
        id: 6,
        title: "Voice Assistant Robot",
        description: "AI-powered voice recognition and natural language processing",
        type: "Advanced Project",
        language: "Python/TensorFlow",
        level: "Advanced",
        downloads: 920,
        rating: 4.9,
        thumbnail: "/projects/voice_robot.jpg"
      }
    ],
    tools: [
      {
        id: 7,
        title: "RoboAut Simulator",
        description: "Custom robot simulation environment for testing algorithms",
        type: "Software Tool",
        platform: "Windows/Linux",
        level: "All Levels",
        downloads: 3200,
        rating: 4.7,
        thumbnail: "/tools/simulator.jpg"
      },
      {
        id: 8,
        title: "Circuit Design Templates",
        description: "Pre-designed circuit templates for common robotics applications",
        type: "Design Files",
        format: "Eagle/KiCad",
        level: "Intermediate",
        downloads: 1450,
        rating: 4.5,
        thumbnail: "/tools/circuits.jpg"
      },
      {
        id: 9,
        title: "3D Printed Parts Library",
        description: "Collection of 3D printable parts for robot construction",
        type: "STL Files",
        format: "STL/STEP",
        level: "All Levels",
        downloads: 2800,
        rating: 4.8,
        thumbnail: "/tools/3d_parts.jpg"
      }
    ]
  };

  const categories = [
    { id: 'tutorials', name: 'Tutorials', icon: '📚', count: resources.tutorials.length },
    { id: 'projects', name: 'Projects', icon: '🚀', count: resources.projects.length },
    { id: 'tools', name: 'Tools', icon: '🛠️', count: resources.tools.length }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'Advanced': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
    }
  };

  return (
    <>
      <Navbar />
      <section id="resources" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-blue-900 pt-40">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.1),transparent_50%)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-orbitron font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Learning Resources
              </span>
            </h2>
            <p className="text-xl text-gray-300 font-exo2 max-w-3xl mx-auto leading-relaxed">
              Access our comprehensive collection of tutorials, project source codes, tools,
              and documentation to accelerate your robotics learning journey.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
            </div>
          </div>

          {/* Category Navigation */}
          <div className="flex justify-center mb-12">
            <div className="glass backdrop-blur-lg rounded-2xl p-2 border border-white/10">
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center space-x-3 px-6 py-3 font-exo2 font-medium rounded-xl transition-all duration-300 ${activeCategory === category.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span>{category.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${activeCategory === category.id ? 'bg-white/20' : 'bg-blue-500/20'
                      }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {resources[activeCategory as keyof typeof resources].map((resource) => (
              <div key={resource.id} className="group">
                <div className="glass backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">

                  {/* Resource Thumbnail */}
                  <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3),transparent_70%)]" />
                    <div className="relative z-10 h-full flex items-center justify-center">
                      <div className="text-5xl opacity-50">📁</div>
                    </div>

                    {/* Type Badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-blue-600/80 text-white text-sm font-exo2 rounded-lg">
                      {resource.type}
                    </span>

                    {/* Level Badge */}
                    <span className={`absolute top-4 right-4 px-3 py-1 rounded-lg text-sm font-exo2 border ${getLevelColor(resource.level)}`}>
                      {resource.level}
                    </span>
                  </div>

                  {/* Resource Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-orbitron font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                      {resource.title}
                    </h3>

                    <p className="text-gray-300 font-exo2 text-sm mb-4 leading-relaxed">
                      {resource.description}
                    </p>

                    {/* Resource Metadata */}
                    <div className="space-y-2 mb-4 text-sm text-gray-400 font-exo2">
                      {'duration' in resource && (
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-400">⏱️</span>
                          <span>Duration: {resource.duration}</span>
                        </div>
                      )}
                      {'pages' in resource && (
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-400">📄</span>
                          <span>Pages: {resource.pages}</span>
                        </div>
                      )}
                      {'language' in resource && (
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-400">💻</span>
                          <span>Language: {resource.language}</span>
                        </div>
                      )}
                      {'platform' in resource && (
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-400">🖥️</span>
                          <span>Platform: {resource.platform}</span>
                        </div>
                      )}
                      {'format' in resource && (
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-400">📋</span>
                          <span>Format: {resource.format}</span>
                        </div>
                      )}
                    </div>

                    {/* Stats and Action */}
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-4 text-sm text-gray-400 font-exo2">
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-400">⭐</span>
                          <span>{resource.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-green-400">⬇️</span>
                          <span>{resource.downloads}</span>
                        </div>
                      </div>

                      <button className="px-4 py-2 bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white font-exo2 font-medium text-sm rounded-lg transition-all duration-300 hover:from-blue-500 hover:to-purple-500 hover:scale-105">
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Study Groups */}
          <div className="glass backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/20 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-orbitron font-bold text-white mb-4">
                Join Study Groups
              </h3>
              <p className="text-gray-300 font-exo2 max-w-2xl mx-auto">
                Connect with fellow learners in our specialized study groups for collaborative learning and project development.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <div className="text-3xl mb-3">🤖</div>
                <h4 className="font-orbitron font-bold text-white mb-2">Robotics Fundamentals</h4>
                <p className="text-sm text-gray-300 font-exo2 mb-3">Weekly sessions on basic robotics concepts</p>
                <span className="text-blue-400 font-exo2 text-sm">42 members</span>
              </div>

              <div className="text-center p-6 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <div className="text-3xl mb-3">🧠</div>
                <h4 className="font-orbitron font-bold text-white mb-2">AI & Machine Learning</h4>
                <p className="text-sm text-gray-300 font-exo2 mb-3">Advanced AI techniques for robotics</p>
                <span className="text-purple-400 font-exo2 text-sm">28 members</span>
              </div>

              <div className="text-center p-6 bg-green-500/10 rounded-xl border border-green-500/20">
                <div className="text-3xl mb-3">🔧</div>
                <h4 className="font-orbitron font-bold text-white mb-2">Hardware Development</h4>
                <p className="text-sm text-gray-300 font-exo2 mb-3">PCB design and embedded systems</p>
                <span className="text-green-400 font-exo2 text-sm">35 members</span>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          {/* <div className="text-center">
          <div className="glass backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-orbitron font-bold text-white mb-4">
              Get Latest Resources
            </h3>
            <p className="text-gray-300 font-exo2 mb-6">
              Subscribe to receive notifications about new tutorials, project releases, and exclusive content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-black/50 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 font-exo2 focus:border-blue-400 focus:outline-none transition-colors duration-300"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-exo2 font-semibold rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div> */}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ResourcesSection;
