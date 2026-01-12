'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Eye, Play, ArrowUpRight } from 'lucide-react';

import { projects } from '@/lib/projects';

export default function PortfolioSection() {

    return (
        <section id="portfolio" className="w-full py-24">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-start mb-12 space-y-4">
                    <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                        Portfolio
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Selected Works
                    </h2>
                    <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
                        A curated selection of projects demonstrating expertise in mechanical design,
                        FEA analysis, and technical engineering.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 pb-12">
                    {projects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/demo/${project.id}`}
                            className="group flex flex-col h-full overflow-hidden rounded-2xl border border-border/50 bg-card hover:border-primary/50 hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Image Container */}
                            <div className="relative w-full aspect-[4/3] md:aspect-video overflow-hidden bg-muted">
                                <Image
                                    src={project.thumbnailSrc}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <div className="h-10 w-10 bg-background/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-border/50">
                                        <ArrowUpRight className="h-5 w-5 text-foreground" />
                                    </div>
                                </div>
                            </div>

                            {/* Content Container */}
                            <div className="flex flex-col flex-grow p-6 space-y-4 bg-card z-10">
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <h3 className="font-bold text-xl text-card-foreground group-hover:text-primary transition-colors leading-tight">
                                        {project.title}
                                    </h3>
                                    {project.tag && (
                                        <span
                                            className={`flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${project.isIndustryProject
                                                ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/40 shadow-sm shadow-amber-500/20'
                                                : 'bg-primary/10 text-primary border-primary/20'
                                                }`}
                                        >
                                            {project.isIndustryProject && (
                                                <svg
                                                    className="w-3 h-3 mr-1"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            )}
                                            {project.tag}
                                        </span>
                                    )}
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                                    {project.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
