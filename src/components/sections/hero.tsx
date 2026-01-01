'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/30 to-background" />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl min-h-[calc(100vh-3.5rem)] items-center gap-10 px-4 py-14 lg:grid-cols-2">
        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
          <div className="flex flex-col items-center space-y-4 lg:items-start">
            <h1
              className="text-4xl font-bold tracking-tighter md:text-6xl animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              WildSketch
            </h1>
            <p
              className="max-w-xl text-muted-foreground md:text-xl animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              Portfolio of Wildan Ibnu Jamil, focused on mechanical design engineering, 3D modeling, and technical drafting.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Link href="#portfolio" passHref>
              <Button size="lg">
                View My Work
                <MoveRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="order-1 flex flex-col items-center lg:order-2">
          <div className="w-[min(26rem,90vw)]">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border/40 bg-card/40 shadow-lg shadow-primary/10">
              <Image
                src="/images/hero_img.webp"
                alt="Wildan Ibnu Jamil"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1024px) 90vw, 26rem"
              />
            </div>
            <div className="mt-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-background/20 px-4 py-2 text-sm font-medium tracking-tight text-foreground/90 backdrop-blur-md shadow-[0_0_0_1px_rgba(99,102,241,0.15),0_12px_40px_-16px_rgba(99,102,241,0.6)]">
                Spesialisasi Mechanical Design Engineer
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16" />
    </section>
  );
}
