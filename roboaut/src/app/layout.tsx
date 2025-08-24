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
  title: "RoboAut - Robotics & Automation Club of NIT Jamshedpur",
  description: "Leading the future of robotics and automation technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${exo2.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
