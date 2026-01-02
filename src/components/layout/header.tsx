'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Menu } from 'lucide-react';
import { useScroll } from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#portfolio', label: 'Work' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const isScrolled = useScroll(50);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 h-12 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg group-hover:scale-105 transition-transform">
            W
          </div>
          <span className="font-bold text-lg tracking-tight group-hover:text-primary transition-colors">
            Wildan Ibnu
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 bg-secondary/50 px-6 py-2 rounded-full backdrop-blur-sm border border-white/5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hover:scale-105 transform duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="default" size="sm" className="hidden sm:flex rounded-full px-6 font-medium" asChild>
            <Link href="/demo/cv">
              <FileText className="mr-2 h-4 w-4" />
              View CV
            </Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-10">
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors block py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/demo/cv"
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors block py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    View CV
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
