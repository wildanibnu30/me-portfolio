import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import PortfolioSection from '@/components/sections/portfolio';
import ContactSection from '@/components/sections/contact';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="container mx-auto max-w-screen-xl px-4">
      <HeroSection />
      <Separator className="my-12 md:my-24 bg-border/20" />
      <AboutSection />
      <Separator className="my-12 md:my-24 bg-border/20" />
      <PortfolioSection />
      <Separator className="my-12 md:my-24 bg-border/20" />
      <ContactSection />
    </div>
  );
}
