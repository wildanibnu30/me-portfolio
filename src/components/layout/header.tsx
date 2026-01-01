'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-lg font-semibold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent sm:inline-block">
            WildSketch
          </span>
        </Link>
        <nav className="hidden items-center gap-4 text-sm md:flex lg:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button size="sm" variant="secondary" asChild>
            <Link href="/demo/cv" target="_blank" rel="noreferrer">
              <Eye className="mr-2 h-4 w-4" />
              View CV
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
