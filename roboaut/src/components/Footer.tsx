'use client';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    about: [
      { name: 'Our Team', href: '/team' },
      { name: 'Gallery', href: '/gallery' },
      { name: 'Achievements', href: '/achievements' },
      { name: 'Sponsors', href: '/sponsors' },
      { name: 'Projects', href: '/projects' }
    ],
    community: [
      { name: 'Resources', href: '/resources' },
      { name: 'Events', href: '/events' },
      { name: 'Join Us', href: '/reach-us' },
      { name: 'Become Sponsor', href: '/reach-us' },
      { name: 'Event Participant', href: '/events' }
    ]
  };

  const socialLinks = [
    { 
      name: 'Instagram', 
      href: 'https://www.instagram.com/teamroboaut/', 
      color: 'hover:text-pink-400',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    { 
      name: 'LinkedIn', 
      href: 'https://www.linkedin.com/in/team-roboaut-124064320/', 
      color: 'hover:text-blue-400',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    { 
      name: 'Twitter', 
      href: 'https://twitter.com/roboaut_nitjsr', 
      color: 'hover:text-sky-400',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    { 
      name: 'YouTube', 
      href: 'https://youtube.com/roboautnitjsr', 
      color: 'hover:text-red-400',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    // { 
    //   name: 'GitHub', 
    //   href: 'https://github.com/roboaut-nitjsr', 
    //   color: 'hover:text-purple-400',
    //   icon: (
    //     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    //       <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    //     </svg>
    //   )
    // },
    // { 
    //   name: 'Discord', 
    //   href: 'https://discord.gg/roboaut', 
    //   color: 'hover:text-indigo-400',
    //   icon: (
    //     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    //       <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
    //     </svg>
    //   )
    // }
  ];

  const contactInfo = [
    { 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ), 
      text: 'NIT Jamshedpur, Jharkhand 831014, India' 
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ), 
      text: 'teamroboaut@nitjsr.ac.in' 
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      ), 
      text: '+91 97119 44706' 
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM11 19.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      ), 
      text: 'www.roboaut.in' 
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-black to-blue-900 border-t border-blue-500/20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_50%)]" />
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Brand Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-orbitron font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                  RoboAut
                </h3>
                <p className="text-gray-300 font-exo2 leading-relaxed">
                  Robotics & Automation Club of NIT Jamshedpur. Pioneering the future of technology 
                  through innovation, education, and cutting-edge research in robotics and automation.
                </p>
              </div>
            </div>

            {/* About Links */}
            <div>
              <h4 className="text-lg font-orbitron font-semibold text-white mb-6">About RoboAut</h4>
              <ul className="space-y-3">
                {footerLinks.about.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-gray-300 font-exo2 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2 rounded-full"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community Links */}
            <div>
              <h4 className="text-lg font-orbitron font-semibold text-white mb-6">Community</h4>
              <ul className="space-y-3">
                {footerLinks.community.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-gray-300 font-exo2 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all duration-300 mr-0 group-hover:mr-2 rounded-full"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Social Section */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div>
                <h4 className="text-lg font-orbitron font-semibold text-white mb-4">Contact Us</h4>
                <div className="space-y-3">
                  {contactInfo.map((contact, index) => (
                    <div key={index} className="flex items-start space-x-3 text-gray-300 font-exo2 text-sm">
                      <div className="text-blue-400 mt-0.5 flex-shrink-0">
                        {contact.icon}
                      </div>
                      <span>{contact.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-orbitron font-semibold text-white mb-4">Follow Us</h4>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 glass backdrop-blur-lg rounded-xl border border-white/10 text-gray-300 ${social.color} transition-all duration-300 hover:scale-110 hover:border-white/20 group`}
                      title={social.name}
                    >
                      <div className="group-hover:scale-110 transition-transform duration-300">
                        {social.icon}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          {/* <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="max-w-2xl mx-auto text-center">
              <h4 className="text-2xl font-orbitron font-bold text-white mb-4">Stay Connected</h4>
              <p className="text-gray-300 font-exo2 mb-6">
                Subscribe to our newsletter for the latest updates on projects, events, and robotics innovations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-black/50 border border-blue-500/30 rounded-xl text-white placeholder-gray-400 font-exo2 focus:border-blue-400 focus:outline-none transition-colors duration-300"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-exo2 font-semibold rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
                  Subscribe
                </button>
              </div>
            </div>
          </div> */}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              
              {/* Copyright */}
              <div className="text-gray-400 font-exo2 text-sm">
                © {currentYear} RoboAut - Robotics & Automation Club, NIT Jamshedpur. All rights reserved.
              </div>

              {/* Additional Links */}
              <div className="flex flex-wrap items-center space-x-6 text-sm font-exo2">
              <p className="text-gray-500 font-exo2 text-sm">
                Designed and Developed by{' '}
                <a 
                  href="https://www.digicraft.one/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium"
                >
                  DigiCraft
                </a>
              </p>
              </div>
            </div>

            {/* Floating Decoration */}
            <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-50" />
            <div className="absolute bottom-4 right-4 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-50" />
          </div>
        </div>

        {/* Back to Top Button */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/25 z-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
