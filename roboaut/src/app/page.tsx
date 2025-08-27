'use client';

import Spline from "@splinetool/react-spline";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';



export default function Home() {

  // Generate randomized particle positions for dynamic motion
  const generateRandomParticles = () => {
    const particles = [];
    for (let i = 0; i < 25; i++) {
      // Add some randomness to positions while keeping them spread out
      const baseLeft = (i % 5) * 20 + Math.random() * 15;
      const baseTop = Math.floor(i / 5) * 20 + Math.random() * 15;

      particles.push({
        left: `${Math.min(Math.max(baseLeft, 2), 95)}%`,
        top: `${Math.min(Math.max(baseTop, 5), 90)}%`,
        delay: `${Math.random() * 3}s`,
        duration: `${3 + Math.random() * 3}s`,
        size: Math.random() * 3 + 1, // Random size between 1-4px
        opacity: 0.3 + Math.random() * 0.7, // Random opacity between 0.3-1
        moveX: (Math.random() - 0.5) * 100, // Random horizontal movement
        moveY: (Math.random() - 0.5) * 100, // Random vertical movement
        animationType: Math.floor(Math.random() * 5), // 0: pulse, 1: float, 2: glow, 3: random-float, 4: drift
        color: Math.floor(Math.random() * 4) // 0: blue, 1: purple, 2: cyan, 3: white
      });
    }
    return particles;
  };

  const particlePositions = generateRandomParticles();

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-black overflow-hidden">
        {/* Gradient Particle Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_50%)]" />

          {/* Animated particles with random positions and motion */}
          {particlePositions.map((particle, i) => {
            // Determine animation class based on type
            const getAnimationClass = (type: number) => {
              switch (type) {
                case 0: return 'animate-pulse';
                case 1: return 'animate-float';
                case 2: return 'animate-glow';
                case 3: return 'animate-random-float';
                case 4: return 'animate-drift';
                default: return 'animate-pulse';
              }
            };

            // Determine color class based on color type
            const getColorClass = (colorType: number) => {
              switch (colorType) {
                case 0: return 'bg-blue-400';
                case 1: return 'bg-purple-400';
                case 2: return 'bg-cyan-400';
                case 3: return 'bg-white';
                default: return 'bg-blue-400';
              }
            };

            return (
              <div
                key={i}
                className={`absolute rounded-full ${getColorClass(particle.color)} ${getAnimationClass(particle.animationType)}`}
                style={{
                  left: particle.left,
                  top: particle.top,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  opacity: particle.opacity,
                  animationDelay: particle.delay,
                  animationDuration: particle.duration,
                  transform: `translate(${particle.moveX * 0.3}px, ${particle.moveY * 0.3}px)`,
                  transition: 'transform 8s ease-in-out infinite',
                  filter: `blur(${Math.random() * 0.5}px)` // Add slight blur for depth
                }}
              />
            );
          })}
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex min-h-screen pt-20">
          {/* Left Side - Hero Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 xl:px-24">
            <div className="space-y-8">
              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight animate-slide-in-left">
                  <span className="font-orbitron bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent neon-text">
                    RoboAut
                  </span>
                </h1>
                <h2 className="text-xl lg:text-2xl xl:text-3xl font-exo2 text-gray-300 font-light animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                  Robotics & Automation Club
                </h2>
                <h3 className="text-lg lg:text-xl xl:text-2xl font-exo2 text-blue-400 font-medium animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
                  NIT Jamshedpur
                </h3>
              </div>

              {/* Description */}
              <p className="text-lg lg:text-xl text-gray-400 font-exo2 leading-relaxed max-w-2xl animate-slide-in-left" style={{ animationDelay: '0.6s' }}>
                Pioneering the future of robotics and automation technology.
                Join us in building tomorrow&apos;s innovations through cutting-edge
                research, development, and collaboration.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-slide-in-left" style={{ animationDelay: '0.8s' }}>
                {/* Primary CTA Button - Robotic Style */}
                <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-exo2 font-semibold text-lg transition-all duration-300 hover:from-blue-500 hover:to-purple-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] animate-glow"
                  style={{
                    clipPath:
                      "polygon(0px 0px, 90% 0px, 100% 25%, 100% 100%, 10% 100%, 0px 75%)"
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span
                    className="relative z-10"
                  >
                    Join the Revolution
                  </span>
                </button>

                {/* Secondary Button */}
                <button className="px-8 py-4 border-2 border-transparent bg-blue-400/20 backdrop-blur-md text-blue-400 font-exo2 font-semibold text-lg transition-all duration-300 hover:bg-blue-400 hover:text-black hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-105"
                  style={{
                    clipPath:
                      "polygon(0px 0px, 90% 0px, 100% 25%, 100% 100%, 10% 100%, 0px 75%)"
                  }}
                >
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 animate-slide-in-left" style={{ animationDelay: '1s' }}>
                <div className="text-center group">
                  <div className="text-2xl lg:text-3xl font-orbitron font-bold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">50+</div>
                  <div className="text-sm text-gray-400 font-exo2">Active Members</div>
                </div>
                <div className="text-center group">
                  <div className="text-2xl lg:text-3xl font-orbitron font-bold text-purple-400 group-hover:text-purple-300 transition-colors duration-300">25+</div>
                  <div className="text-sm text-gray-400 font-exo2">Projects</div>
                </div>
                <div className="text-center group">
                  <div className="text-2xl lg:text-3xl font-orbitron font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">10+</div>
                  <div className="text-sm text-gray-400 font-exo2">Awards</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - 3D Model */}
          <div className="hidden lg:block w-1/2 relative">
            <div className="absolute inset-0">
              <Spline
                scene="https://prod.spline.design/0QyJL1t8RrUqB8JA/scene.splinecode"
                // scene="https://prod.spline.design/erjpvAcqUFO5eSJa/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />

        {/* Tech Circuit Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M0 10h20M10 0v20" stroke="currentColor" strokeWidth="0.1" fill="none" className="text-blue-400" />
                <circle cx="10" cy="10" r="0.5" fill="currentColor" className="text-blue-400" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#circuit)" />
          </svg>
        </div>

        {/* Glassmorphism Cards */}
        {/* <div className="absolute top-1/4 right-1/4 w-48 h-32 glass rounded-lg animate-float opacity-60" />
      <div className="absolute bottom-1/4 left-1/4 w-32 h-48 glass rounded-lg animate-float opacity-60" style={{ animationDelay: '2s' }} /> */}

        {/* Scanning Line Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-scan" />
        </div>
      </div>

      {/* About RoboAut Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-cyan-900/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-orbitron font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                About RoboAut
              </span>
            </h2>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
            </div>
          </div>

          {/* Club Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl lg:text-3xl font-orbitron font-bold text-white">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Our Mission
                  </span>
                </h3>
                <p className="text-lg text-gray-300 font-exo2 leading-relaxed">
                  At RoboAut, we are dedicated to fostering innovation in robotics and automation.
                  Our mission is to create a collaborative environment where students can explore,
                  learn, and build cutting-edge robotic solutions that address real-world challenges.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl lg:text-3xl font-orbitron font-bold text-white">
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    What We Do
                  </span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mt-3"></div>
                    <p className="text-gray-300 font-exo2">
                      <span className="text-blue-400 font-semibold">Research & Development:</span>
                      Conducting cutting-edge research in AI, machine learning, and robotics
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-2 h-2 bg-purple-400 rounded-full mt-3"></div>
                    <p className="text-gray-300 font-exo2">
                      <span className="text-purple-400 font-semibold">Practical Projects:</span>
                      Building autonomous robots, IoT systems, and automation solutions
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-2 h-2 bg-cyan-400 rounded-full mt-3"></div>
                    <p className="text-gray-300 font-exo2">
                      <span className="text-cyan-400 font-semibold">Skill Development:</span>
                      Organizing workshops, seminars, and hands-on training sessions
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full mt-3"></div>
                    <p className="text-gray-300 font-exo2">
                      <span className="text-green-400 font-semibold">Community Building:</span>
                      Creating a network of robotics enthusiasts and industry connections
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="glass backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-blue-400/30 transition-all duration-500 hover:scale-105">
                <div className="text-4xl mb-4">🤖</div>
                <h4 className="text-xl font-orbitron font-bold text-white mb-2">Innovation</h4>
                <p className="text-gray-300 font-exo2 text-sm">
                  Pushing boundaries with creative solutions and breakthrough technologies
                </p>
              </div>

              <div className="glass backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-500 hover:scale-105">
                <div className="text-4xl mb-4">🔬</div>
                <h4 className="text-xl font-orbitron font-bold text-white mb-2">Research</h4>
                <p className="text-gray-300 font-exo2 text-sm">
                  Contributing to academic research and publishing in top-tier conferences
                </p>
              </div>

              <div className="glass backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-500 hover:scale-105">
                <div className="text-4xl mb-4">🏆</div>
                <h4 className="text-xl font-orbitron font-bold text-white mb-2">Excellence</h4>
                <p className="text-gray-300 font-exo2 text-sm">
                  Achieving recognition in national and international competitions
                </p>
              </div>

              <div className="glass backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-green-400/30 transition-all duration-500 hover:scale-105">
                <div className="text-4xl mb-4">🌐</div>
                <h4 className="text-xl font-orbitron font-bold text-white mb-2">Community</h4>
                <p className="text-gray-300 font-exo2 text-sm">
                  Building a strong network of students, faculty, and industry partners
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="glass backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20 max-w-3xl mx-auto">
              <h3 className="text-2xl font-orbitron font-bold text-white mb-4">
                Ready to Shape the Future?
              </h3>
              <p className="text-gray-300 font-exo2 mb-6 leading-relaxed">
                Join RoboAut and be part of a community that's pioneering the next generation
                of robotics and automation technology. Whether you're a beginner or an expert,
                there's a place for you in our innovative ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-exo2 font-semibold text-lg transition-all duration-300 hover:from-blue-500 hover:to-purple-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                  style={{
                    clipPath: "polygon(0px 0px, 90% 0px, 100% 25%, 100% 100%, 10% 100%, 0px 75%)"
                  }}
                >
                  <span className="relative z-10">Join RoboAut</span>
                </button>
                <button className="px-8 py-4 border-2 border-transparent bg-cyan-400/20 backdrop-blur-md text-cyan-400 font-exo2 font-semibold text-lg transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105"
                  style={{
                    clipPath: "polygon(0px 0px, 90% 0px, 100% 25%, 100% 100%, 10% 100%, 0px 75%)"
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Words from Prof Incharge Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-cyan-900/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(139,92,246,0.1),transparent_50%)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-orbitron font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Message from Faculty Incharge
              </span>
            </h2>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full" />
            </div>
          </div>

          {/* Prof Message */}
          <div className="max-w-4xl mx-auto">
            <div className="glass backdrop-blur-lg rounded-2xl p-8 lg:p-12 border border-purple-500/20 relative overflow-hidden">
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-6xl text-purple-400/20">"</div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-purple-400/30">
                    <div className="text-3xl">👨‍🏫</div>
                  </div>
                  <h3 className="text-2xl font-orbitron font-bold text-white mb-2">
                    Dr. Rajesh Kumar
                  </h3>
                  <p className="text-purple-400 font-exo2 font-medium">
                    Faculty Incharge, RoboAut Club
                  </p>
                  <p className="text-gray-400 font-exo2 text-sm">
                    Department of Electrical Engineering, NIT Jamshedpur
                  </p>
                </div>

                <div className="space-y-6 text-lg text-gray-300 font-exo2 leading-relaxed text-center">
                  <p>
                    "RoboAut represents the pinnacle of student innovation and technological advancement 
                    at NIT Jamshedpur. As the faculty incharge, I am immensely proud to witness the 
                    remarkable growth and achievements of our students in the field of robotics and automation."
                  </p>
                  
                  <p>
                    "Our club has consistently demonstrated that with the right guidance, resources, and 
                    determination, students can achieve extraordinary feats. From autonomous navigation 
                    systems to smart home automation, our projects showcase the practical application 
                    of theoretical knowledge."
                  </p>
                  
                  <p>
                    "I encourage all students to join RoboAut and be part of this incredible journey 
                    of learning, innovation, and growth. Together, we are not just building robots; 
                    we are shaping the future of technology."
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-purple-500/20">
                  <div className="flex items-center justify-center space-x-2 text-purple-400">
                    <span className="text-sm font-exo2">Best Wishes,</span>
                    <span className="text-sm font-exo2 font-semibold">Dr. Rajesh Kumar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join RoboAut Section */}
            {/* Quick Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-blue-900/10 to-purple-900/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.1),transparent_50%)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-orbitron font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                RoboAut by the Numbers
              </span>
            </h2>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-purple-400 rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="glass backdrop-blur-lg rounded-2xl p-6 border border-green-500/20 hover:border-green-400/40 transition-all duration-500 hover:scale-105">
                <div className="text-4xl lg:text-5xl font-orbitron font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  50+
                </div>
                <div className="text-gray-300 font-exo2 font-medium">Active Members</div>
                <div className="text-gray-500 font-exo2 text-sm">From all branches</div>
              </div>
            </div>

            <div className="text-center group">
              <div className="glass backdrop-blur-lg rounded-2xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 hover:scale-105">
                <div className="text-4xl lg:text-5xl font-orbitron font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  25+
                </div>
                <div className="text-gray-300 font-exo2 font-medium">Projects</div>
                <div className="text-gray-500 font-exo2 text-sm">Completed & ongoing</div>
              </div>
            </div>

            <div className="text-center group">
              <div className="glass backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:scale-105">
                <div className="text-4xl lg:text-5xl font-orbitron font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  10+
                </div>
                <div className="text-gray-300 font-exo2 font-medium">Awards</div>
                <div className="text-gray-500 font-exo2 text-sm">National & international</div>
              </div>
            </div>

            <div className="text-center group">
              <div className="glass backdrop-blur-lg rounded-2xl p-6 border border-orange-500/20 hover:border-orange-400/40 transition-all duration-500 hover:scale-105">
                <div className="text-4xl lg:text-5xl font-orbitron font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  15+
                </div>
                <div className="text-gray-300 font-exo2 font-medium">Workshops</div>
                <div className="text-gray-500 font-exo2 text-sm">Conducted annually</div>
              </div>
            </div>
          </div>
        </div>
      </section>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-orbitron font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
                Why Join RoboAut?
              </span>
            </h2>
            <p className="text-xl text-gray-300 font-exo2 max-w-3xl mx-auto leading-relaxed">
              Discover the unique opportunities and experiences that await you as a member of our robotics community
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full" />
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-500 hover:scale-105 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🚀</div>
              <h3 className="text-xl font-orbitron font-bold text-white mb-4">Hands-on Experience</h3>
              <p className="text-gray-300 font-exo2 leading-relaxed">
                Work on real-world projects using cutting-edge technologies like ROS, Arduino, 
                Raspberry Pi, and advanced sensors. Gain practical skills that industry demands.
              </p>
            </div>

            <div className="glass backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 hover:scale-105 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🏆</div>
              <h3 className="text-xl font-orbitron font-bold text-white mb-4">Competition Success</h3>
              <p className="text-gray-300 font-exo2 leading-relaxed">
                Participate in prestigious robotics competitions like Robocon, eYRC, and 
                international hackathons. Win awards and recognition for your innovations.
              </p>
            </div>

            <div className="glass backdrop-blur-lg rounded-2xl p-8 border border-green-500/20 hover:border-green-400/40 transition-all duration-500 hover:scale-105 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🤝</div>
              <h3 className="text-xl font-orbitron font-bold text-white mb-4">Industry Connections</h3>
              <p className="text-gray-300 font-exo2 leading-relaxed">
                Network with industry professionals, attend tech talks, and get internship 
                opportunities with leading robotics and automation companies.
              </p>
            </div>

            <div className="glass backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:scale-105 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">📚</div>
              <h3 className="text-xl font-orbitron font-bold text-white mb-4">Skill Development</h3>
              <p className="text-gray-300 font-exo2 leading-relaxed">
                Attend workshops on AI, machine learning, computer vision, and robotics. 
                Learn from experts and enhance your technical expertise.
              </p>
            </div>

            <div className="glass backdrop-blur-lg rounded-2xl p-8 border border-orange-500/20 hover:border-orange-400/40 transition-all duration-500 hover:scale-105 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">💡</div>
              <h3 className="text-xl font-orbitron font-bold text-white mb-4">Innovation Hub</h3>
              <p className="text-gray-300 font-exo2 leading-relaxed">
                Be part of a creative environment where ideas flourish. Collaborate with 
                like-minded innovators and turn your concepts into reality.
              </p>
            </div>

            <div className="glass backdrop-blur-lg rounded-2xl p-8 border border-red-500/20 hover:border-red-400/40 transition-all duration-500 hover:scale-105 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🌍</div>
              <h3 className="text-xl font-orbitron font-bold text-white mb-4">Global Impact</h3>
              <p className="text-gray-300 font-exo2 leading-relaxed">
                Contribute to solutions that address real-world challenges. Your projects 
                could make a difference in healthcare, agriculture, or environmental conservation.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-blue-900/10 to-green-900/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(34,211,238,0.1),transparent_50%)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-orbitron font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
                Why Join RoboAut?
              </span>
            </h2>
            <p className="text-xl text-gray-300 font-exo2 max-w-3xl mx-auto leading-relaxed">
              Discover the unique opportunities and experiences that await you as a member of our robotics community
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full" />
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-500 hover:scale-105 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🚀</div>
              <h3 className="text-xl font-orbitron font-bold text-white mb-4">Hands-on Experience</h3>
              <p className="text-gray-300 font-exo2 leading-relaxed">
                Work on real-world projects using cutting-edge technologies like ROS, Arduino, 
                Raspberry Pi, and advanced sensors. Gain practical skills that industry demands.
              </p>
            </div>

            <div className="glass backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 hover:scale-105 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🏆</div>
              <h3 className="text-xl font-orbitron font-bold text-white mb-4">Competition Success</h3>
              <p className="text-gray-300 font-exo2 leading-relaxed">
                Participate in prestigious robotics competitions like Robocon, eYRC, and 
                international hackathons. Win awards and recognition for your innovations.
              </p>
            </div>

            <div className="glass backdrop-blur-lg rounded-2xl p-8 border border-green-500/20 hover:border-green-400/40 transition-all duration-500 hover:scale-105 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🤝</div>
              <h3 className="text-xl font-orbitron font-bold text-white mb-4">Industry Connections</h3>
              <p className="text-gray-300 font-exo2 leading-relaxed">
                Network with industry professionals, attend tech talks, and get internship 
                opportunities with leading robotics and automation companies.
              </p>
            </div>

            <div className="glass backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:scale-105 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">📚</div>
              <h3 className="text-xl font-orbitron font-bold text-white mb-4">Skill Development</h3>
              <p className="text-gray-300 font-exo2 leading-relaxed">
                Attend workshops on AI, machine learning, computer vision, and robotics. 
                Learn from experts and enhance your technical expertise.
              </p>
            </div>

            <div className="glass backdrop-blur-lg rounded-2xl p-8 border border-orange-500/20 hover:border-orange-400/40 transition-all duration-500 hover:scale-105 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">💡</div>
              <h3 className="text-xl font-orbitron font-bold text-white mb-4">Innovation Hub</h3>
              <p className="text-gray-300 font-exo2 leading-relaxed">
                Be part of a creative environment where ideas flourish. Collaborate with 
                like-minded innovators and turn your concepts into reality.
              </p>
            </div>

            <div className="glass backdrop-blur-lg rounded-2xl p-8 border border-red-500/20 hover:border-red-400/40 transition-all duration-500 hover:scale-105 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🌍</div>
              <h3 className="text-xl font-orbitron font-bold text-white mb-4">Global Impact</h3>
              <p className="text-gray-300 font-exo2 leading-relaxed">
                Contribute to solutions that address real-world challenges. Your projects 
                could make a difference in healthcare, agriculture, or environmental conservation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-blue-900/10 to-purple-900/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.1),transparent_50%)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-orbitron font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                RoboAut by the Numbers
              </span>
            </h2>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-purple-400 rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="glass backdrop-blur-lg rounded-2xl p-6 border border-green-500/20 hover:border-green-400/40 transition-all duration-500 hover:scale-105">
                <div className="text-4xl lg:text-5xl font-orbitron font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  50+
                </div>
                <div className="text-gray-300 font-exo2 font-medium">Active Members</div>
                <div className="text-gray-500 font-exo2 text-sm">From all branches</div>
              </div>
            </div>

            <div className="text-center group">
              <div className="glass backdrop-blur-lg rounded-2xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 hover:scale-105">
                <div className="text-4xl lg:text-5xl font-orbitron font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  25+
                </div>
                <div className="text-gray-300 font-exo2 font-medium">Projects</div>
                <div className="text-gray-500 font-exo2 text-sm">Completed & ongoing</div>
              </div>
            </div>

            <div className="text-center group">
              <div className="glass backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:scale-105">
                <div className="text-4xl lg:text-5xl font-orbitron font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  10+
                </div>
                <div className="text-gray-300 font-exo2 font-medium">Awards</div>
                <div className="text-gray-500 font-exo2 text-sm">National & international</div>
              </div>
            </div>

            <div className="text-center group">
              <div className="glass backdrop-blur-lg rounded-2xl p-6 border border-orange-500/20 hover:border-orange-400/40 transition-all duration-500 hover:scale-105">
                <div className="text-4xl lg:text-5xl font-orbitron font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  15+
                </div>
                <div className="text-gray-300 font-exo2 font-medium">Workshops</div>
                <div className="text-gray-500 font-exo2 text-sm">Conducted annually</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
