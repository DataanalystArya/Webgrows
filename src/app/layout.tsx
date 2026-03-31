import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ParticleField from "@/components/3d/ParticleField";
import SplashCursor from "@/components/ui/SplashCursor";
import AIChatBot from "@/components/ui/AIChatBot";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WebGrows | Digital Technology Agency",
  description: "WebGrows is a digital agency focused on building modern websites, scalable web applications and AI-powered automation systems for businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-white/20 cursor-none`}
      >
        <AIChatBot />
        <SplashCursor />
        <ParticleField />
        <Navbar />
        <main className="min-h-screen relative z-[1]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
