'use client';



const SponsorsSection = () => {


  const sponsors = {
    title: [
      {
        id: 1,
        name: "TechCorp Industries",
        logo: "/sponsors/techcorp.png",
        tier: "Title Sponsor",
        description: "Leading provider of industrial automation solutions",
        website: "techcorp.com",
        partnership: "Gold Partnership since 2022"
      },
      {
        id: 2,
        name: "RoboTech Solutions",
        logo: "/sponsors/robotech.png", 
        tier: "Title Sponsor",
        description: "Cutting-edge robotics research and development",
        website: "robotech.com",
        partnership: "Platinum Partnership since 2021"
      }
    ],
    platinum: [
      {
        id: 3,
        name: "AI Dynamics",
        logo: "/sponsors/aidynamics.png",
        tier: "Platinum",
        contribution: "₹5,00,000"
      },
      {
        id: 4,
        name: "Servo Systems",
        logo: "/sponsors/servo.png",
        tier: "Platinum", 
        contribution: "₹4,50,000"
      },
      {
        id: 5,
        name: "Circuit Labs",
        logo: "/sponsors/circuit.png",
        tier: "Platinum",
        contribution: "₹4,00,000"
      }
    ],
    gold: [
      {
        id: 6,
        name: "MicroChip Tech",
        logo: "/sponsors/microchip.png",
        tier: "Gold"
      },
      {
        id: 7,
        name: "Sensor Solutions",
        logo: "/sponsors/sensor.png",
        tier: "Gold"
      },
      {
        id: 8,
        name: "Motor Dynamics",
        logo: "/sponsors/motor.png",
        tier: "Gold"
      },
      {
        id: 9,
        name: "PCB Masters",
        logo: "/sponsors/pcb.png",
        tier: "Gold"
      }
    ],
    silver: [
      {
        id: 10,
        name: "Tech Startup A",
        logo: "/sponsors/startup1.png",
        tier: "Silver"
      },
      {
        id: 11,
        name: "Innovation Hub",
        logo: "/sponsors/innovation.png",
        tier: "Silver"
      },
      {
        id: 12,
        name: "Future Labs",
        logo: "/sponsors/future.png",
        tier: "Silver"
      },
      {
        id: 13,
        name: "Smart Systems",
        logo: "/sponsors/smart.png",
        tier: "Silver"
      },
      {
        id: 14,
        name: "Nano Tech",
        logo: "/sponsors/nano.png",
        tier: "Silver"
      },
      {
        id: 15,
        name: "Digital Solutions",
        logo: "/sponsors/digital.png",
        tier: "Silver"
      }
    ]
  };





  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Title Sponsor': return 'from-yellow-400 to-orange-500';
      case 'Platinum': return 'from-gray-300 to-gray-500';
      case 'Gold': return 'from-yellow-400 to-yellow-600';
      case 'Silver': return 'from-gray-400 to-gray-600';
      default: return 'from-blue-400 to-purple-500';
    }
  };

  const sponsorshipBenefits = [
    {
      tier: "Title Sponsor",
      price: "₹10,00,000+",
      benefits: [
        "Logo on all event materials",
        "Dedicated booth space",
        "Speaking opportunity",
        "Social media promotion",
        "Newsletter mentions",
        "Website homepage placement"
      ],
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      tier: "Platinum",
      price: "₹5,00,000",
      benefits: [
        "Premium logo placement",
        "Exhibition booth",
        "Workshop sponsorship",
        "Social media mentions",
        "Website placement"
      ],
      gradient: "from-gray-300 to-gray-500"
    },
    {
      tier: "Gold",
      price: "₹2,50,000",
      benefits: [
        "Logo on event materials",
        "Website listing",
        "Social media mentions",
        "Networking opportunities"
      ],
      gradient: "from-yellow-400 to-yellow-600"
    },
    {
      tier: "Silver",
      price: "₹1,00,000",
      benefits: [
        "Website listing",
        "Event program mention",
        "Basic promotional benefits"
      ],
      gradient: "from-gray-400 to-gray-600"
    }
  ];

  return (
    <section id="sponsors" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-orange-900/10 to-red-900/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(251,191,36,0.1),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-orbitron font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Our Sponsors & Partners
            </span>
          </h2>
          <p className="text-xl text-gray-300 font-exo2 max-w-3xl mx-auto leading-relaxed">
            We&apos;re grateful to our amazing sponsors and partners who support our mission 
            of advancing robotics education and innovation at NIT Jamshedpur.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full" />
          </div>
        </div>

        {/* Title Sponsors */}
        <div className="mb-16">
          <h3 className="text-2xl font-orbitron font-bold text-center text-yellow-400 mb-8">Title Sponsors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sponsors.title.map((sponsor) => (
              <div key={sponsor.id} className="glass backdrop-blur-lg rounded-2xl p-8 border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-500 hover:scale-105">
                <div className="text-center">
                  {/* Logo Placeholder */}
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl flex items-center justify-center border border-yellow-400/30">
                    <div className="text-4xl opacity-70">🏢</div>
                  </div>
                  
                  <h4 className="text-2xl font-orbitron font-bold text-white mb-2">{sponsor.name}</h4>
                  <div className={`text-lg font-exo2 font-semibold mb-4 bg-gradient-to-r ${getTierColor(sponsor.tier)} bg-clip-text text-transparent`}>
                    {sponsor.tier}
                  </div>
                  
                  <p className="text-gray-300 font-exo2 mb-4 leading-relaxed">{sponsor.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-400 font-exo2">
                    <div>🌐 {sponsor.website}</div>
                    <div>🤝 {sponsor.partnership}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsor Tiers */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Platinum Sponsors */}
            <div>
              <h3 className="text-xl font-orbitron font-bold text-center text-gray-300 mb-6">Platinum Sponsors</h3>
              <div className="space-y-4">
                {sponsors.platinum.map((sponsor) => (
                  <div key={sponsor.id} className="glass backdrop-blur-lg rounded-xl p-4 border border-gray-400/20 hover:border-gray-300/40 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-300/20 to-gray-500/20 rounded-lg flex items-center justify-center border border-gray-400/30">
                        <div className="text-2xl opacity-70">🏢</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-orbitron font-bold text-white text-lg">{sponsor.name}</h4>
                        {sponsor.contribution && (
                          <div className="text-gray-300 font-exo2 text-sm">{sponsor.contribution}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gold Sponsors */}
            <div>
              <h3 className="text-xl font-orbitron font-bold text-center text-yellow-400 mb-6">Gold Sponsors</h3>
              <div className="grid grid-cols-2 gap-4">
                {sponsors.gold.map((sponsor) => (
                  <div key={sponsor.id} className="glass backdrop-blur-lg rounded-xl p-4 border border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300 hover:scale-105">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-lg flex items-center justify-center border border-yellow-400/30">
                        <div className="text-xl opacity-70">🏢</div>
                      </div>
                      <h4 className="font-orbitron font-bold text-white text-sm">{sponsor.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Silver Sponsors */}
            <div>
              <h3 className="text-xl font-orbitron font-bold text-center text-gray-400 mb-6">Silver Sponsors</h3>
              <div className="grid grid-cols-2 gap-3">
                {sponsors.silver.map((sponsor) => (
                  <div key={sponsor.id} className="glass backdrop-blur-lg rounded-lg p-3 border border-gray-500/20 hover:border-gray-400/40 transition-all duration-300 hover:scale-105">
                    <div className="text-center">
                      <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-gray-400/20 to-gray-600/20 rounded-lg flex items-center justify-center border border-gray-400/30">
                        <div className="text-lg opacity-70">🏢</div>
                      </div>
                      <h4 className="font-orbitron font-bold text-white text-xs">{sponsor.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sponsorship Packages */}
        <div className="mb-16">
          <h3 className="text-3xl font-orbitron font-bold text-center text-white mb-12">Sponsorship Packages</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorshipBenefits.map((package_) => (
              <div key={package_.tier} className="glass backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 hover:scale-105">
                <div className={`h-2 bg-gradient-to-r ${package_.gradient}`} />
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-orbitron font-bold text-white mb-2">{package_.tier}</h4>
                    <div className={`text-3xl font-orbitron font-bold bg-gradient-to-r ${package_.gradient} bg-clip-text text-transparent`}>
                      {package_.price}
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {package_.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-2 text-gray-300 font-exo2 text-sm">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-orange-600/80 to-red-600/80 text-white font-exo2 font-semibold rounded-lg transition-all duration-300 hover:from-orange-500 hover:to-red-500 hover:scale-105">
                    Become Sponsor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership CTA */}
        <div className="text-center">
          <div className="glass backdrop-blur-lg rounded-2xl p-8 border border-orange-500/20 max-w-3xl mx-auto">
            <h3 className="text-2xl font-orbitron font-bold text-white mb-4">
              Partner With RoboAut
            </h3>
            <p className="text-gray-300 font-exo2 mb-6 leading-relaxed">
              Join us in shaping the future of robotics education. Partner with RoboAut to support 
              innovative projects, talented students, and cutting-edge research that drives technological advancement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="relative px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-exo2 font-semibold text-lg transition-all duration-300 hover:from-orange-500 hover:to-red-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(251,146,60,0.5)]"
                style={{
                  clipPath: "polygon(0px 0px, 90% 0px, 100% 25%, 100% 100%, 10% 100%, 0px 75%)"
                }}
              >
                <span className="relative z-10">Become a Sponsor</span>
              </button>
              <button className="px-8 py-4 border-2 border-orange-400 text-orange-400 font-exo2 font-semibold text-lg transition-all duration-300 hover:bg-orange-400 hover:text-black hover:scale-105">
                Download Proposal
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
