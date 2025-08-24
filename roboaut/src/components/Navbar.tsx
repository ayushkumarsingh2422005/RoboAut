'use client';

import { useState, useRef, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left?: number;
    width?: number;
  }>({});
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Events', href: '#events' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
    setIsOpen(false); // Close mobile menu when item is clicked
    updateIndicator(itemName);
  };

  const updateIndicator = (itemName: string) => {
    if (navRef.current) {
      const activeLink = navRef.current.querySelector(`[data-nav="${itemName}"]`) as HTMLElement;
      if (activeLink) {
        const { offsetLeft, offsetWidth } = activeLink;
        setIndicatorStyle({
          left: offsetLeft,
          width: offsetWidth,
        });
      }
    }
  };

  useEffect(() => {
    updateIndicator(activeItem);
  }, [activeItem]);

  useEffect(() => {
    const handleResize = () => updateIndicator(activeItem);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeItem]);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when at top of page
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

      return (
      <nav className={`fixed left-4 right-4 md:left-8 md:right-8 lg:left-12 lg:right-12 z-50 glass backdrop-blur-md rounded-2xl border border-blue-500/20 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500 ease-out ${
        isVisible ? 'top-4 opacity-100 translate-y-0' : '-top-20 opacity-0 -translate-y-full'
      }`}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-orbitron font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent neon-text flex items-center gap-2">
              <img src="/logo.png" alt="RoboAut" className="w-10 h-10" />RoboAut
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 relative" ref={navRef}>
              {/* Moving Rectangle Indicator */}
              <div
                className="absolute top-1/2 transform -translate-y-1/2 h-10 bg-gradient-to-r from-blue-500/20 via-purple-500/30 to-cyan-500/20 backdrop-blur-sm border border-blue-400/30 rounded-xl transition-all duration-500 ease-out"
                style={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1)'
                }}
              />
              
              <div className="flex items-baseline space-x-8 relative z-10">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    data-nav={item.name}
                    onClick={() => handleItemClick(item.name)}
                    className={`relative px-3 py-2 text-sm font-exo2 font-medium transition-all duration-300 ${
                      activeItem === item.name
                        ? 'text-white font-semibold'
                        : 'text-gray-300 hover:text-blue-400'
                    }`}
                  >
                    {item.name}
                    
                    {/* Floating particles for active item */}
                    {/* {activeItem === item.name && (
                      <>
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                          <div className="w-1 h-1 bg-blue-400 rounded-full animate-ping" />
                        </div>
                        <div className="absolute -bottom-1 left-1/4">
                          <div className="w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                        </div>
                        <div className="absolute -bottom-1 right-1/4">
                          <div className="w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                        </div>
                      </>
                    )} */}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              className="relative px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-exo2 font-semibold text-sm transition-all duration-300 hover:from-blue-500 hover:to-purple-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              style={{
                clipPath: "polygon(0px 0px, 90% 0px, 100% 25%, 100% 100%, 10% 100%, 0px 75%)"
              }}
            >
              <span className="relative z-10">Join Us</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-8 h-8 text-gray-400 hover:text-blue-400 focus:outline-none transition-colors duration-300"
            >
              <span className="sr-only">Open main menu</span>
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span
                  className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
                    isOpen ? 'rotate-45' : '-translate-y-1.5'
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
                    isOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
                    isOpen ? '-rotate-45' : 'translate-y-1.5'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 glass backdrop-blur-lg border-t border-blue-500/20">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => handleItemClick(item.name)}
              className={`relative block px-3 py-2 text-base font-exo2 font-medium transition-all duration-300 ${
                activeItem === item.name
                  ? 'text-blue-400 bg-blue-500/10 border-l-2 border-blue-400'
                  : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/5'
              }`}
            >
              {item.name}
              
              {/* Active mobile item effect */}
              {activeItem === item.name && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                </div>
              )}
            </a>
          ))}
          
          {/* Mobile CTA Button */}
          <div className="px-3 py-2">
            <button
              className="w-full relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-exo2 font-semibold text-sm transition-all duration-300 hover:from-blue-500 hover:to-purple-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              style={{
                clipPath: "polygon(0px 0px, 90% 0px, 100% 25%, 100% 100%, 10% 100%, 0px 75%)"
              }}
            >
              <span className="relative z-10">Join Us</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
          style={{ zIndex: -1 }}
        />
      )}
    </nav>
  );
};

export default Navbar;
