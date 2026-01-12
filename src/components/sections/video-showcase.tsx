'use client';

import { Play } from 'lucide-react';

export default function VideoShowcase() {
    return (
        <section id="video-showcase" className="w-full py-24 bg-secondary/5 overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
                <div className="absolute top-0 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="container px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center text-center space-y-4 mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary font-medium border border-primary/20">
                        <Play className="h-3.5 w-3.5 fill-primary" />
                        <span>Showcase Video</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Engineering & Design <span className="text-primary italic">In Motion</span>
                    </h2>
                    <p className="max-w-[700px] text-lg text-muted-foreground leading-relaxed">
                        Experience my technical workflow and completed projects through this comprehensive video showcase.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto group">
                    {/* Glassmorphism Wrapper */}
                    <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
                        <iframe
                            src="https://www.youtube.com/embed/rK48k7-VlpM?autoplay=0&rel=0"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
