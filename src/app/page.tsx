import HeroSection from "@/components/sections/Hero";
import AboutSection from "@/components/sections/About";
import EducationSection from "@/components/sections/Education";
import ServicesSection from "@/components/sections/Services";
import ProjectsSection from "@/components/sections/Projects";
import SkillsSection from "@/components/sections/Skills";
import TechStackSection from "@/components/sections/TechStack";
import ContactSection from "@/components/sections/Contact";
import SharedBackground from "@/components/layout/SharedBackground";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      
      <div className="relative bg-[#050505]/80">
        <SharedBackground />
        <EducationSection />
        <ServicesSection />
      </div>

      <ProjectsSection />
      <SkillsSection />
      <TechStackSection />
      <ContactSection />
    </>
  );
}
