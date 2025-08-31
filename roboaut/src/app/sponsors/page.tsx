'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const SponsorsSection = () => {

  const [sponsors, setSponsors] = useState<any[]>([]);
  // const sponsors = [
  //   {
  //     id: 1,
  //     name: "TechCorp Industries",
  //     logo: "/sponsors/techcorp.png",
  //     tier: "Title Sponsor",
  //     description: "Leading provider of industrial automation solutions",
  //     website: "techcorp.com",
  //     partnership: "Gold Partnership since 2022"
  //   },
  //   {
  //     id: 2,
  //     name: "RoboTech Solutions",
  //     logo: "/sponsors/robotech.png",
  //     tier: "Title Sponsor",
  //     description: "Cutting-edge robotics research and development",
  //     website: "robotech.com",
  //     partnership: "Platinum Partnership since 2021"
  //   }
  // ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/sponsors?populate[CompanyLogo][fields]=url`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setSponsors(data.data || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
        // setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        // setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

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
      tier: "Platinum",
      price: "₹1,00,000",
      benefits: [
        "All Gold benefits",
        "Title sponsorship rights",
        "Speaking opportunity at events",
        "Immersive brand experiences",
        "Custom promotion options"
      ],
      gradient: "from-gray-300 to-gray-500"
    },
    {
      tier: "Gold",
      price: "₹50,000",
      benefits: [
        "All Silver benefits",
        "Premium logo placement",
        "Dedicated social media post",
        "Merchandise collaboration",
        "Brand promotion in newsletters"
      ],
      gradient: "from-yellow-400 to-yellow-600"
    },
    {
      tier: "Silver",
      price: "₹25,000",
      benefits: [
        "Website listing",
        "Event program mention",
        "Social media mentions",
        "Brand visibility at events",
        "Brand promotion in newsletters"
      ],
      gradient: "from-gray-400 to-gray-600"
    }
  ];

  return (
    <>
      <Navbar />
      <section id="sponsors" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden pt-40">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-orange-900/10 to-red-900/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(251,191,36,0.1),transparent_50%)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-orbitron font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Our Sponsors
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

          <div className="mb-16">
            <h3 className="text-2xl font-orbitron font-bold text-center text-yellow-400 mb-8">Our Sponsors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sponsors && sponsors.map((sponsor) => (
                <div key={sponsor.id} className="glass backdrop-blur-lg rounded-2xl p-8 border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-500 hover:scale-105">
                  <div className="text-center">
                    {/* Logo Placeholder */}
                    <div className="w-64 h-64 mx-auto mb-6 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl flex items-center justify-center border border-yellow-400/30 overflow-hidden">
                      <Image src={sponsor.CompanyLogo.url} alt={sponsor.CompanyName} width={256} height={256} />
                    </div>

                    <h4 className="text-2xl font-orbitron font-bold text-white mb-2">{sponsor.CompanyName}</h4>
                    <div className={`text-lg font-exo2 font-semibold mb-4 bg-gradient-to-r ${getTierColor(sponsor.tier)} bg-clip-text text-transparent`}>
                      {sponsor.tier}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sponsorship Packages */}
          <div className="mb-16">
            <h3 className="text-3xl font-orbitron font-bold text-center text-white mb-12">Sponsorship Packages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <Footer />
    </>
  );
};

export default SponsorsSection;
