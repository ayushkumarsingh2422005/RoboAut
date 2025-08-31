import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Orbitron, Exo_2 } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RoboAut - Robotics & Automation Club of NIT Jamshedpur",
    template: "%s | RoboAut - NIT Jamshedpur"
  },
  description: "RoboAut is the premier Robotics & Automation Club of NIT Jamshedpur. Join our community of 100+ active members working on cutting-edge robotics projects, AI research, and automation technologies. Participate in workshops, competitions, and innovation programs.",
  keywords: [
    "robotics", "automation", "NIT Jamshedpur", "RoboAut", "artificial intelligence", 
    "machine learning", "robotics club", "engineering", "technology", "innovation",
    "competitions", "workshops", "research", "projects", "students", "NITJSR"
  ],
  authors: [{ name: "Team RoboAut", url: "https://www.roboaut.in" }],
  creator: "Team RoboAut - NIT Jamshedpur",
  publisher: "RoboAut Club",
  applicationName: "RoboAut",
  category: "Education & Technology",
  classification: "Robotics & Automation Club",
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.roboaut.in",
    siteName: "RoboAut - Robotics & Automation Club",
    title: "RoboAut - Robotics & Automation Club of NIT Jamshedpur",
    description: "Join our community of 100+ active members working on cutting-edge robotics projects, AI research, and automation technologies at NIT Jamshedpur.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "RoboAut - Robotics & Automation Club Logo",
        type: "image/png"
      }
    ]
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@roboaut_nitjsr",
    creator: "@roboaut_nitjsr",
    title: "RoboAut - Robotics & Automation Club of NIT Jamshedpur",
    description: "Join our community of 100+ active members working on cutting-edge robotics projects, AI research, and automation technologies.",
    images: ["/logo.png"]
  },
  
  // Icons and Favicon
  icons: {
    icon: [
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "16x16", type: "image/png" }
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" }
    ],
    shortcut: "/logo.png"
  },
  
  // App specific
  manifest: "/manifest.json",
  
  // SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  
  // Verification
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
  
  // Additional meta
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "RoboAut",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#1e40af",
    "msapplication-TileImage": "/logo.png",
    "theme-color": "#1e40af"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "RoboAut - Robotics & Automation Club",
              "alternateName": "RoboAut NIT Jamshedpur",
              "url": "https://www.roboaut.in",
              "logo": "https://www.roboaut.in/logo.png",
              "description": "Robotics & Automation Club of NIT Jamshedpur with 100+ active members working on cutting-edge robotics projects and AI research.",
              "foundingDate": "2020",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "NIT Jamshedpur Campus",
                "addressLocality": "Jamshedpur",
                "addressRegion": "Jharkhand",
                "postalCode": "831014",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-97119-44706",
                "contactType": "General Inquiry",
                "email": "teamroboaut@nitjsr.ac.in"
              },
              "sameAs": [
                "https://www.instagram.com/teamroboaut/",
                "https://www.linkedin.com/in/team-roboaut-124064320/",
                "https://twitter.com/roboaut_nitjsr"
              ],
              "parentOrganization": {
                "@type": "EducationalOrganization",
                "name": "National Institute of Technology Jamshedpur",
                "url": "https://www.nitjsr.ac.in"
              }
            })
          }}
        />
        
        {/* Structured Data for Educational Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "RoboAut Club",
              "description": "Student robotics and automation club fostering innovation in technology",
              "url": "https://www.roboaut.in",
              "telephone": "+91-97119-44706",
              "email": "teamroboaut@nitjsr.ac.in",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Jamshedpur",
                "addressRegion": "Jharkhand",
                "addressCountry": "IN"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${exo2.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
