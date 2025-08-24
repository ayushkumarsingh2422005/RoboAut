'use client';

import { useState } from 'react';

const TeamSection = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const teamMembers = [
    {
      id: 1,
      name: "Dr. Arjun Kumar",
      position: "Faculty Advisor",
      department: "Computer Science & Engineering",
      expertise: ["Artificial Intelligence", "Machine Learning", "Robotics"],
      experience: "15+ years",
      image: "/team/advisor.jpg",
      gradient: "from-blue-500 to-cyan-500",
      social: {
        email: "arjun.kumar@nitjsr.ac.in",
        linkedin: "arjunkumar",
        scholar: "arjunkumar"
      }
    },
    {
      id: 2,
      name: "Rajesh Patel",
      position: "President",
      year: "4th Year",
      branch: "Mechanical Engineering",
      expertise: ["Robotic Design", "Control Systems", "Project Management"],
      projects: ["Autonomous Bot", "Robotic Arm"],
      image: "/team/president.jpg",
      gradient: "from-purple-500 to-pink-500",
      social: {
        email: "rajesh@student.nitjsr.ac.in",
        linkedin: "rajeshpatel",
        github: "rajeshpatel"
      }
    },
    {
      id: 3,
      name: "Priya Sharma",
      position: "Vice President",
      year: "3rd Year",
      branch: "Electronics & Communication",
      expertise: ["Embedded Systems", "IoT", "Circuit Design"],
      projects: ["Smart Home", "Drone Controller"],
      image: "/team/vp.jpg",
      gradient: "from-green-500 to-teal-500",
      social: {
        email: "priya@student.nitjsr.ac.in",
        linkedin: "priyasharma",
        github: "priyasharma"
      }
    },
    {
      id: 4,
      name: "Amit Singh",
      position: "Technical Head",
      year: "4th Year",
      branch: "Computer Science",
      expertise: ["Software Development", "AI/ML", "Computer Vision"],
      projects: ["Chess Robot", "Vision System"],
      image: "/team/tech_head.jpg",
      gradient: "from-orange-500 to-red-500",
      social: {
        email: "amit@student.nitjsr.ac.in",
        linkedin: "amitsingh",
        github: "amitsingh"
      }
    },
    {
      id: 5,
      name: "Sneha Gupta",
      position: "Events Coordinator",
      year: "3rd Year",
      branch: "Electrical Engineering",
      expertise: ["Event Management", "Public Relations", "Marketing"],
      projects: ["RoboCup Organization", "Workshop Planning"],
      image: "/team/events.jpg",
      gradient: "from-indigo-500 to-purple-500",
      social: {
        email: "sneha@student.nitjsr.ac.in",
        linkedin: "snehagupta",
        instagram: "snehagupta"
      }
    },
    {
      id: 6,
      name: "Karan Verma",
      position: "Research Lead",
      year: "4th Year",
      branch: "Mechanical Engineering",
      expertise: ["Research & Development", "Innovation", "Prototyping"],
      projects: ["Warehouse Automation", "Swarm Robotics"],
      image: "/team/research.jpg",
      gradient: "from-yellow-500 to-orange-500",
      social: {
        email: "karan@student.nitjsr.ac.in",
        linkedin: "karanverma",
        github: "karanverma"
      }
    }
  ];

  const departments = [
    {
      name: "Technical Team",
      count: 25,
      description: "Software development, hardware design, and system integration",
      icon: "⚙️"
    },
    {
      name: "Research Team",
      count: 15,
      description: "Advanced research in AI, ML, and emerging technologies",
      icon: "🔬"
    },
    {
      name: "Events Team",
      count: 12,
      description: "Workshop organization, competitions, and outreach programs",
      icon: "🎯"
    },
    {
      name: "Media Team",
      count: 8,
      description: "Content creation, social media, and documentation",
      icon: "📸"
    }
  ];

  return (
    <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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

        {/* Team Leaders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member) => (
            <div 
              key={member.id}
              className="group relative"
              onMouseEnter={() => setSelectedMember(member.id)}
              onMouseLeave={() => setSelectedMember(null)}
            >
              <div className={`relative glass backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 ${
                selectedMember === member.id ? 'scale-105 shadow-2xl shadow-purple-500/20' : 'hover:scale-102'
              }`}>
                
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                
                {/* Member Photo */}
                <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900">
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-30`} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
                  <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="text-6xl opacity-70">👤</div>
                  </div>
                  
                  {/* Social Links Overlay */}
                  <div className={`absolute inset-0 bg-black/80 flex items-center justify-center space-x-4 transition-opacity duration-300 ${
                    selectedMember === member.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    {Object.entries(member.social).map(([platform]) => (
                      <button key={platform} className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-300">
                        <span className="text-white text-sm">
                          {platform === 'email' && '📧'}
                          {platform === 'linkedin' && '💼'}
                          {platform === 'github' && '💻'}
                          {platform === 'scholar' && '🎓'}
                          {platform === 'instagram' && '📷'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <h3 className="text-xl font-orbitron font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                    {member.name}
                  </h3>
                  
                  <div className={`text-lg font-exo2 font-semibold mb-3 bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}>
                    {member.position}
                  </div>

                  {member.department && (
                    <div className="text-gray-300 font-exo2 text-sm mb-3">{member.department}</div>
                  )}
                  
                  {member.year && member.branch && (
                    <div className="text-gray-300 font-exo2 text-sm mb-3">
                      {member.year} • {member.branch}
                    </div>
                  )}

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.expertise.slice(0, 2).map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-exo2 rounded-lg border border-purple-500/30">
                        {skill}
                      </span>
                    ))}
                    {member.expertise.length > 2 && (
                      <span className="px-3 py-1 bg-gray-500/20 text-gray-300 text-xs font-exo2 rounded-lg border border-gray-500/30">
                        +{member.expertise.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Additional Info */}
                  {member.experience && (
                    <div className="text-sm text-gray-400 font-exo2">
                      Experience: {member.experience}
                    </div>
                  )}
                  
                  {member.projects && (
                    <div className="text-sm text-gray-400 font-exo2">
                      Key Projects: {member.projects.join(', ')}
                    </div>
                  )}
                </div>

                {/* Floating Particles */}
                {selectedMember === member.id && (
                  <>
                    <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full animate-ping" />
                    <div className="absolute bottom-4 left-4 w-1 h-1 bg-indigo-400 rounded-full animate-pulse" />
                  </>
                )}
              </div>

              {/* Hover Glow */}
              {selectedMember === member.id && (
                <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-20 blur-xl rounded-2xl -z-10 animate-pulse`} />
              )}
            </div>
          ))}
        </div>

        {/* Department Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {departments.map((dept) => (
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

        {/* Join Team CTA */}
        {/* <div className="text-center">
          <div className="glass backdrop-blur-lg rounded-2xl p-8 border border-indigo-500/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-orbitron font-bold text-white mb-4">
              Join Our Amazing Team
            </h3>
            <p className="text-gray-300 font-exo2 mb-6">
              Are you passionate about robotics and automation? Join RoboAut and be part of 
              innovative projects that shape the future of technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-exo2 font-semibold text-lg transition-all duration-300 hover:from-indigo-500 hover:to-purple-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
                style={{
                  clipPath: "polygon(0px 0px, 90% 0px, 100% 25%, 100% 100%, 10% 100%, 0px 75%)"
                }}
              >
                <span className="relative z-10">Apply Now</span>
              </button>
              <button className="px-8 py-4 border-2 border-purple-400 text-purple-400 font-exo2 font-semibold text-lg transition-all duration-300 hover:bg-purple-400 hover:text-black hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default TeamSection;
