'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, FileText, Database, ChevronRight } from 'lucide-react';

const services = [
    {
        title: '3D CAD Modeling',
        description: 'Creating accurate 3D models for mechanical parts and assemblies using Solidworks and Autodesk Inventor.',
        icon: Settings,
        capabilities: ['Part Modeling', 'Assembly Design', '3D Visualization', 'Design Modification']
    },
    {
        title: 'Technical Drafting',
        description: 'Producing detailed 2D technical drawings for manufacturing and fabrication purposes.',
        icon: FileText,
        capabilities: ['Shop Drawings', 'Bill of Materials (BOM)', 'Exploded Views', 'Drafting Standards']
    },
    {
        title: 'Data Management',
        description: 'Utilizing Microsoft Excel for engineering data tracking, inventory lists, and simple cost estimations.',
        icon: Database,
        capabilities: ['Data Entry', 'Inventory Tracking', 'Spreadsheet Organization', 'Basic Cost Estimation']
    }
];

export default function ServicesSection() {
    return (
        <section id="services" className="w-full py-24 bg-secondary/5">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-4 mb-16">
                    <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                        Skills & Services
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        What I Offer
                    </h2>
                    <p className="max-w-[700px] text-lg text-muted-foreground leading-relaxed">
                        I provide practical engineering support focused on design accuracy and efficient documentation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <Card key={service.title} className="group relative overflow-hidden border-border/50 bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary/0 group-hover:bg-primary transition-all duration-300" />
                            <CardHeader className="space-y-4">
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                                    <service.icon className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                                    {service.description}
                                </CardDescription>

                                <div className="pt-4 space-y-2">
                                    <h4 className="text-sm font-semibold text-foreground border-b border-border/50 pb-2 mb-2">Capabilities</h4>
                                    <ul className="space-y-2">
                                        {service.capabilities.map((capability) => (
                                            <li key={capability} className="flex items-center text-sm text-muted-foreground">
                                                <ChevronRight className="h-3 w-3 text-primary mr-2" />
                                                {capability}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
