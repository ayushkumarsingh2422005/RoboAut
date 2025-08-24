'use client';

import { useState, useEffect, useRef } from 'react';

const AchievementsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    projects: 0,
    members: 0,
    awards: 0,
    workshops: 0
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  const finalCounts = {
    projects: 25,
    members: 150,
    awards: 12,
    workshops: 30
  };

  const achievements = [
    {
      id: 1,
      title: "National Robotics Championship",
      year: "2024",
      position: "1st Place",
      description: "Won the national championship in autonomous robot navigation category",
      icon: "🏆",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      id: 2,
      title: "IEEE Student Innovation Award",
      year: "2023",
      position: "Winner",
      description: "Recognized for outstanding innovation in robotic automation solutions",
      icon: "🎖️",
      gradient: "from-blue-400 to-purple-500"
    },
    {
      id: 3,
      title: "Smart India Hackathon",
      year: "2023",
      position: "2nd Place",
      description: "Developed AI-powered traffic management system using IoT sensors",
      icon: "🥈",
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      id: 4,
      title: "International Drone Challenge",
      year: "2024",
      position: "3rd Place",
      description: "Competed in autonomous drone racing and payload delivery challenge",
      icon: "🏅",
      gradient: "from-green-400 to-teal-500"
    }
  ];

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
    <section id="achievements" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
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

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <div key={achievement.id} className="group relative">
              <div className="relative glass backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon and Year */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{achievement.icon}</div>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm font-exo2 rounded-full border border-blue-500/30">
                      {achievement.year}
                    </span>
                  </div>

                  {/* Title and Position */}
                  <h3 className="text-2xl font-orbitron font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {achievement.title}
                  </h3>
                  <div className={`text-lg font-exo2 font-semibold mb-4 bg-gradient-to-r ${achievement.gradient} bg-clip-text text-transparent`}>
                    {achievement.position}
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 font-exo2 leading-relaxed mb-6">
                    {achievement.description}
                  </p>

                  {/* Decorative Line */}
                  <div className={`w-full h-1 bg-gradient-to-r ${achievement.gradient} rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>

                {/* Floating Particles */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '0.5s' }} />
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-0 group-hover:opacity-20 blur-xl rounded-2xl -z-10 transition-opacity duration-500`} />
            </div>
          ))}
        </div>

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
  );
};

export default AchievementsSection;
