import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import VideoShowcase from '@/components/sections/video-showcase';
import ServicesSection from '@/components/sections/services';
import PortfolioSection from '@/components/sections/portfolio';
import ContactSection from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <AboutSection />
      <VideoShowcase />
      <ServicesSection />
      <PortfolioSection />
      <ContactSection />
    </div>
  );
}
