'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Eye, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { projects } from '@/lib/projects';

export default function PortfolioSection() {
    const router = useRouter();

    return (
        <section id="portfolio" className="w-full py-12 md:py-24">
            <div className="flex flex-col items-center text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Work</h2>
                <p className="mt-4 max-w-2xl text-muted-foreground md:text-xl/relaxed">A selection of projects that demonstrate my skills in mechanical design, analysis, and engineering.</p>
            </div>
            <div className="grid grid-cols-12 gap-4 auto-rows-[24rem]">
                {projects.map((project) => (
                    <Card
                        key={project.id}
                        className={`${project.gridSpan} group relative flex cursor-pointer flex-col overflow-hidden border-border/40 transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.005] will-change-transform`}
                        onClick={() => router.push(`/demo/${project.id}`)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') router.push(`/demo/${project.id}`);
                        }}
                    >
                        <div className="absolute inset-0 z-0 bg-black/10" />
                        <div className="absolute inset-0 z-0 p-6">
                            <div className="relative h-full w-full">
                                <Image
                                    src={project.thumbnailSrc}
                                    alt={project.title}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                        <CardHeader className="relative z-20 mt-auto p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-2xl font-bold text-primary-foreground">{project.title}</CardTitle>
                                    <CardDescription className="text-primary-foreground/80 mt-2">{project.description}</CardDescription>
                                </div>
                                {project.tag && (
                                    <span className="inline-flex items-center rounded-full border border-primary/25 bg-gradient-to-r from-primary/30 to-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary-foreground backdrop-blur-sm shadow-[0_0_0_1px_hsl(var(--primary)/0.15),0_12px_32px_-20px_hsl(var(--primary)/0.45)]">
                                        {project.tag}
                                    </span>
                                )}
                            </div>
                        </CardHeader>
                        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:translate-y-0 translate-y-1">
                            <Button
                                size="icon"
                                variant="secondary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    router.push(`/demo/${project.id}`);
                                }}
                                aria-label="Open project demo"
                            >
                                {project.videoUrl ? <Play className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}
