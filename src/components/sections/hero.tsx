'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />

      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Open to Work
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              Mechanical Engineering <br />
              <span className="text-primary">Portfolio.</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-[600px] leading-relaxed">
              Hi, I'm <span className="font-semibold text-foreground">Wildan Ibnu Jamil</span>.
              A Mechanical Engineering Graduate from SMKN 1 Kertosono. I specialize in 2D Drafting and 3D Modeling using Solidworks, Autodesk Inventor, and AutoCAD.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="rounded-full h-12 px-8 text-base" asChild>
                <Link href="#portfolio">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base hover:bg-secondary/50" asChild>
                <Link href="#contact">Contact Me</Link>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto lg:ml-auto w-full max-w-[500px] aspect-square">
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-border/50 bg-secondary/30 backdrop-blur-sm p-2">
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-muted">
                <Image
                  src="/images/hero_img.webp"
                  alt="Wildan Ibnu Jamil"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-card border border-border p-4 rounded-xl shadow-xl animate-bounce duration-[3000ms]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Experience</p>
                  <p className="text-sm font-bold">1+ Year</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:flex">
        <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">
          <ChevronDown className="h-6 w-6" />
        </Link>
      </div>
    </section>
  );
}
