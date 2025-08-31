'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ReachUsPage() {
  const [formData, setFormData] = useState({
    YourName: '',
    Email: '',
    Subject: '',
    Description: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/contact-forms`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: formData
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to submit form');
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      
      setSubmitStatus('success');
      // Reset form after successful submission
      setFormData({
        YourName: '',
        Email: '',
        Subject: '',
        Description: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred while submitting the form');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Visit Us',
      details: ['National Institute of Technology Jamshedpur', 'Adityapur, Jamshedpur - 831014', 'Jharkhand, India'],
      color: 'blue'
    },
    {
      icon: '📧',
      title: 'Email Us',
      details: ['roboaut@nitjsr.ac.in', 'president@roboaut.nitjsr.ac.in', 'info@roboaut.nitjsr.ac.in'],
      color: 'purple'
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: ['+91 9876543210', '+91 8765432109', 'Mon-Fri 9:00 AM - 6:00 PM'],
      color: 'green'
    },
    {
      icon: '🌐',
      title: 'Follow Us',
      details: ['@teamroboaut', 'linkedin.com/in/team-roboaut-124064320', 'github.com/roboaut-nitjsr'],
      color: 'cyan'
    }
  ];

  const teamContacts = [
    {
      name: 'Dr. Vijay Kumar Dalla',
      position: 'Prof in Charge',
      email: 'vijaydalla.me@nitjsr.ac.in',
      phone: '+91 8126084443',
      image: '/team/vp.png'
    },
    {
      name: 'Ashish Ranjan',
      position: 'Founder',
      phone: '+91 9572828798',
      image: '/team/founder.png'
    },
    {
      name: 'Supreet Singh',
      position: 'President',
      phone: '+91 9711944706',
      image: '/team/president.png'
    }
  ];

  const getColorClass = (color: string) => {
    switch (color) {
      case 'blue': return 'from-blue-500 to-cyan-500';
      case 'purple': return 'from-purple-500 to-pink-500';
      case 'green': return 'from-green-500 to-teal-500';
      case 'cyan': return 'from-cyan-500 to-blue-500';
      default: return 'from-blue-500 to-purple-500';
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-black overflow-hidden">
        {/* Global Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_50%)]" />
          
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 pt-20">
          {/* Hero Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
              {/* Section Header */}
              <div className="text-center mb-16">
                <h1 className="text-4xl lg:text-6xl font-orbitron font-bold text-white mb-6">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Reach Us
                  </span>
                </h1>
                <p className="text-xl text-gray-300 font-exo2 max-w-3xl mx-auto leading-relaxed">
                  Get in touch with RoboAut. Whether you have questions, want to collaborate, 
                  or are interested in joining our community, we&apos;d love to hear from you.
                </p>
                <div className="mt-8 flex justify-center">
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                </div>
              </div>

              {/* Contact Information Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {contactInfo.map((info, index) => (
                  <div key={index} className="glass backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
                    <div className="text-center">
                      <div className="text-4xl mb-4">{info.icon}</div>
                      <h3 className={`text-xl font-orbitron font-bold bg-gradient-to-r ${getColorClass(info.color)} bg-clip-text text-transparent mb-4`}>
                        {info.title}
                      </h3>
                      <div className="space-y-2">
                        {info.details.map((detail, idx) => (
                          <div key={idx} className="text-gray-300 font-exo2 text-sm">
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Contact Form */}
                <div className="glass backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h2 className="text-3xl font-orbitron font-bold text-white mb-6">
                    Send us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-300 font-exo2 font-medium mb-2">Name</label>
                        <input
                          type="text"
                          name="YourName"
                          value={formData.YourName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/50 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 font-exo2 focus:border-blue-400 focus:outline-none transition-colors duration-300"
                          placeholder="Your full name"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-exo2 font-medium mb-2">Email</label>
                        <input
                          type="email"
                          name="Email"
                          value={formData.Email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/50 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 font-exo2 focus:border-blue-400 focus:outline-none transition-colors duration-300"
                          placeholder="your.email@example.com"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 font-exo2 font-medium mb-2">Subject</label>
                      <input
                        type="text"
                        name="Subject"
                        value={formData.Subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/50 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 font-exo2 focus:border-blue-400 focus:outline-none transition-colors duration-300"
                        placeholder="Your subject"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 font-exo2 font-medium mb-2">Message</label>
                      <textarea
                        name="Description"
                        value={formData.Description}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-3 bg-black/50 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 font-exo2 focus:border-blue-400 focus:outline-none transition-colors duration-300 resize-none"
                        placeholder="Tell us how we can help you..."
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    {/* Success/Error Messages */}
                    {submitStatus === 'success' && (
                      <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <span className="text-green-400 text-xl">✅</span>
                          <div>
                            <div className="text-green-400 font-exo2 font-semibold">Message Sent Successfully!</div>
                            <div className="text-green-300 font-exo2 text-sm">We&apos;ll get back to you soon.</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <span className="text-red-400 text-xl">❌</span>
                          <div>
                            <div className="text-red-400 font-exo2 font-semibold">Failed to Send Message</div>
                            <div className="text-red-300 font-exo2 text-sm">{errorMessage}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full relative px-8 py-4 font-exo2 font-semibold text-lg transition-all duration-300 ${
                        isSubmitting 
                          ? 'bg-gray-600 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]'
                      } text-white`}
                      style={{
                        clipPath: "polygon(0px 0px, calc(100% - 20px) 0px, 100% 20px, 100% 100%, 20px 100%, 0px calc(100% - 20px))"
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        {isSubmitting && (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        )}
                        <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                      </span>
                    </button>
                  </form>
                </div>

                {/* Team Contacts */}
                <div className="space-y-6">
                  <h2 className="text-3xl font-orbitron font-bold text-white mb-6">
                    Contact Our Team
                  </h2>
                  <div className="space-y-4">
                    {teamContacts.map((member, index) => (
                      <div key={index} className="glass backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-300">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-purple-400/30 overflow-hidden">
                            {member.image ? (
                              <Image
                                src={member.image}
                                alt={`${member.name} photo`}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover rounded-xl"
                              />
                            ) : (
                              <div className="text-2xl">👤</div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-orbitron font-bold text-white">{member.name}</h3>
                            <div className="text-purple-400 font-exo2 font-medium">{member.position}</div>
                            <div className="space-y-1 mt-2 text-sm text-gray-300 font-exo2">
                              {member.email && (
                                <div className="flex items-center space-x-2">
                                  <span>📧</span>
                                  <span>{member.email}</span>
                                </div>
                              )}
                              <div className="flex items-center space-x-2">
                                <span>📞</span>
                                <span>{member.phone}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Map Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-orbitron font-bold text-white mb-4">
                  Visit Our Campus
                </h2>
                <p className="text-gray-300 font-exo2">
                  Find us at the National Institute of Technology Jamshedpur
                </p>
              </div>
              
              <div className="glass backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <div className="rounded-xl h-96 overflow-hidden relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.4842873234567!2d86.14185097531595!3d22.776940!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e31989f0e2b5%3A0xeeec8294acc15715!2sNational%20Institute%20of%20Technology%20Jamshedpur!5e1!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin&markers=color:red%7Clabel:R%7C22.776940,86.144647&style=feature:all%7Celement:geometry%7Ccolor:0x212121&style=feature:all%7Celement:labels.icon%7Cvisibility:off&style=feature:all%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:all%7Celement:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575&style=feature:landscape%7Celement:geometry%7Ccolor:0x212121&style=feature:poi%7Celement:geometry%7Ccolor:0x212121&style=feature:road%7Celement:geometry.fill%7Ccolor:0x2c2c2c&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x8a8a8a&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x373737&style=feature:road.highway%7Celement:geometry%7Ccolor:0x3c3c3c&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0x4e4e4e&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:water%7Celement:geometry%7Ccolor:0x000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                    title="NIT Jamshedpur Location with RoboAut Marker - Satellite View"
                  />
                  
                  {/* Compact Overlay with location details - Top Right */}
                  <div className="absolute top-3 right-3 w-80 max-w-[calc(100%-1.5rem)] glass backdrop-blur-xl rounded-lg p-3 border border-white/30 bg-black/50">
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-orbitron font-bold text-white text-sm">NIT Jamshedpur</h4>
                        <p className="text-gray-300 font-exo2 text-xs">Adityapur, Jamshedpur</p>
                        <p className="text-red-400 font-exo2 text-xs">📍 22.776940, 86.144647</p>
                      </div>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=22.776940,86.144647`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full px-3 py-2 bg-gradient-to-r from-red-600/80 to-purple-600/80 backdrop-blur-sm text-white font-exo2 font-medium text-xs rounded-md transition-all duration-300 hover:from-red-500 hover:to-purple-500 hover:scale-105 flex items-center justify-center space-x-1"
                      >
                        <span>🧭</span>
                        <span>Get Directions</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Access Links */}
          <section className="pb-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto relative z-10">
              <h3 className="text-2xl font-orbitron font-bold text-center text-white mb-8">
                Quick Navigation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a
                  href={`https://www.google.com/maps/place/22.776940,86.144647/@22.776940,86.144647,17z/data=!3m1!4b1!4m6!3m5!1s0x0:0x0!7e1!8m2!3d22.776940!4d86.144647`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover:scale-105 text-center"
                >
                  <div className="text-2xl mb-2">🛰️</div>
                  <h4 className="font-orbitron font-bold text-white text-sm">Satellite View</h4>
                  <p className="text-gray-400 font-exo2 text-xs">High resolution imagery</p>
                </a>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=22.776940,86.144647`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-purple-400/30 transition-all duration-300 hover:scale-105 text-center"
                >
                  <div className="text-2xl mb-2">🧭</div>
                  <h4 className="font-orbitron font-bold text-white text-sm">Get Directions</h4>
                  <p className="text-gray-400 font-exo2 text-xs">Navigate to campus</p>
                </a>

                <a
                  href={`https://maps.apple.com/?q=22.776940,86.144647`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-green-400/30 transition-all duration-300 hover:scale-105 text-center"
                >
                  <div className="text-2xl mb-2">🍎</div>
                  <h4 className="font-orbitron font-bold text-white text-sm">Apple Maps</h4>
                  <p className="text-gray-400 font-exo2 text-xs">iOS navigation</p>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
