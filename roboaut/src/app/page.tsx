'use client';

import Spline from "@splinetool/react-spline";
import Navbar from '../components/Navbar';
import ProjectsSection from '../components/sections/ProjectsSection';
import AchievementsSection from '../components/sections/AchievementsSection';
import EventsSection from '../components/sections/EventsSection';
import TeamSection from '../components/sections/TeamSection';
import ResourcesSection from '../components/sections/ResourcesSection';
import SponsorsSection from '../components/sections/SponsorsSection';
import Footer from '../components/Footer';

// Temporary placeholder for 3D model
const SplinePlaceholder = () => (
  <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 animate-pulse rounded-lg flex items-center justify-center">
    <div className="text-blue-400 text-2xl font-orbitron">3D Model Loading...</div>
  </div>
);

export default function Home() {

  // Pre-defined particle positions to avoid hydration mismatch
  const particlePositions = [
    { left: '10%', top: '20%', delay: '0s', duration: '3s' },
    { left: '25%', top: '15%', delay: '0.5s', duration: '4s' },
    { left: '40%', top: '30%', delay: '1s', duration: '3.5s' },
    { left: '55%', top: '25%', delay: '1.5s', duration: '4.5s' },
    { left: '70%', top: '35%', delay: '2s', duration: '3s' },
    { left: '85%', top: '20%', delay: '2.5s', duration: '4s' },
    { left: '15%', top: '60%', delay: '0.3s', duration: '3.5s' },
    { left: '30%', top: '70%', delay: '0.8s', duration: '4.2s' },
    { left: '45%', top: '65%', delay: '1.3s', duration: '3.8s' },
    { left: '60%', top: '75%', delay: '1.8s', duration: '4.1s' },
    { left: '75%', top: '60%', delay: '2.3s', duration: '3.3s' },
    { left: '90%', top: '70%', delay: '2.8s', duration: '4.3s' },
    { left: '20%', top: '85%', delay: '0.2s', duration: '3.7s' },
    { left: '35%', top: '90%', delay: '0.7s', duration: '4.4s' },
    { left: '50%', top: '85%', delay: '1.2s', duration: '3.9s' },
    { left: '65%', top: '90%', delay: '1.7s', duration: '4.6s' },
    { left: '80%', top: '85%', delay: '2.2s', duration: '3.4s' },
    { left: '95%', top: '90%', delay: '2.7s', duration: '4.7s' },
    { left: '5%', top: '50%', delay: '0.1s', duration: '3.6s' },
    { left: '95%', top: '50%', delay: '0.6s', duration: '4.8s' }
  ];

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Gradient Particle Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_50%)]" />

        {/* Animated particles with fixed positions */}
        {particlePositions.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration
            }}
          />
        ))}
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
      <div className="absolute top-1/4 right-1/4 w-48 h-32 glass rounded-lg animate-float opacity-60" />
      <div className="absolute bottom-1/4 left-1/4 w-32 h-48 glass rounded-lg animate-float opacity-60" style={{ animationDelay: '2s' }} />

      {/* Scanning Line Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-scan" />
      </div>
    </div>
    
    {/* Additional Sections */}
    <ProjectsSection />
    <AchievementsSection />
    <EventsSection />
    <TeamSection />
    <ResourcesSection />
    <SponsorsSection />
    <Footer />
    </>
  );
}
