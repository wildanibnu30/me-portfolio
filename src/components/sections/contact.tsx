'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { Linkedin, Send, Mail, MapPin, Loader2, Sparkles, MessageSquare } from 'lucide-react';

const formSchema = z.object({
    name: z.string().min(2, 'Please introduce yourself or your organization.'),
    email: z.string().email('Please provide a valid professional email address.'),
    subject: z.string().min(3, 'Defining a topic helps me prepare better technical references.'),
    message: z.string().min(10, 'A brief project overview ensures our discussion is focused and productive.'),
});

export default function ContactSection() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...values,
                    recipient: 'wildanibnujamil30@gmail.com'
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'System encountered an issue.');
            }

            toast({
                title: "Inquiry Received!",
                description: "I'll review your technical requirements and respond shortly.",
            });
            form.reset();
        } catch (error: any) {
            console.error('Error sending message:', error);
            toast({
                title: "Dispatch Interrupted",
                description: error.message || "Please reach out via direct email.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section id="contact" className="w-full py-24 bg-background relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-8">
                        <div className="space-y-4 text-left">
                            <div className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium border border-primary/20">
                                <Sparkles className="h-3.5 w-3.5" />
                                <span>Engineering Collaboration</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.2]">
                                Let's Build <br />
                                <span className="text-primary italic">Mechanical Innovation</span> <br />
                                Together.
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                                I help transform your technical challenges into precise, manufacturing-ready mechanical designs.
                            </p>
                        </div>

                        <div className="grid gap-3 max-w-sm">
                            <a href="mailto:wildanibnujamil30@gmail.com" className="group flex items-center gap-4 p-4 rounded-2xl bg-secondary/20 border border-border/50 hover:border-primary/50 transition-all duration-300">
                                <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Email</p>
                                    <p className="text-sm font-semibold">wildanibnujamil30@gmail.com</p>
                                </div>
                            </a>

                            <a href="https://linkedin.com/in/wildan-ibnu-1b8a2a32a" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 rounded-2xl bg-secondary/20 border border-border/50 hover:border-primary/50 transition-all duration-300">
                                <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <Linkedin className="h-5 w-5" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">LinkedIn</p>
                                    <p className="text-sm font-semibold">Wildan Ibnu Jamil</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/10 border border-border/40">
                                <div className="h-10 w-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary/70">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Location</p>
                                    <p className="text-sm font-semibold">Nganjuk, East Java, ID</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex items-center gap-4 text-muted-foreground">
                            <div className="h-px w-8 bg-border/50" />
                            <p className="text-[9px] uppercase font-bold tracking-[0.2em] opacity-60">Precision • Utility • Excellence</p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative bg-card rounded-3xl border border-border/50 p-6 md:p-10 shadow-sm">
                            <div className="mb-8 space-y-1 text-left">
                                <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4 text-primary" />
                                    Project Inquiry
                                </h3>
                                <p className="text-sm text-muted-foreground">Detailed technical scope helps me provide accurate consultation.</p>
                            </div>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid gap-5">
                                        <FormField control={form.control} name="name" render={({ field }) => (
                                            <FormItem className="space-y-2 text-left">
                                                <FormLabel className="text-xs font-semibold uppercase text-muted-foreground">Your Name or Company</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Who should I address?" {...field} className="h-11 bg-muted/20 border-border/50 focus:border-primary/50 transition-all rounded-xl" />
                                                </FormControl>
                                                <FormMessage className="text-[11px]" />
                                            </FormItem>
                                        )} />

                                        <FormField control={form.control} name="email" render={({ field }) => (
                                            <FormItem className="space-y-2 text-left">
                                                <FormLabel className="text-xs font-semibold uppercase text-muted-foreground">Email Address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Where should I send my reply?" {...field} className="h-11 bg-muted/20 border-border/50 focus:border-primary/50 transition-all rounded-xl" />
                                                </FormControl>
                                                <FormMessage className="text-[11px]" />
                                            </FormItem>
                                        )} />

                                        <FormField control={form.control} name="subject" render={({ field }) => (
                                            <FormItem className="space-y-2 text-left">
                                                <FormLabel className="text-xs font-semibold uppercase text-muted-foreground">What are we building?</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g., Machine Design or 3D Assembly" {...field} className="h-11 bg-muted/20 border-border/50 focus:border-primary/50 transition-all rounded-xl" />
                                                </FormControl>
                                                <FormMessage className="text-[11px]" />
                                            </FormItem>
                                        )} />

                                        <FormField control={form.control} name="message" render={({ field }) => (
                                            <FormItem className="space-y-2 text-left">
                                                <FormLabel className="text-xs font-semibold uppercase text-muted-foreground">How can I help?</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Tell me about your project, goals, or design challenges..."
                                                        className="min-h-[120px] bg-muted/20 border-border/50 focus:border-primary/50 transition-all rounded-xl p-4 text-sm"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-[11px]" />
                                            </FormItem>
                                        )} />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full h-12 text-base font-bold rounded-xl bg-primary hover:bg-primary/90 transition-all group"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                Initiate Collaboration
                                                <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                            </span>
                                        )}
                                    </Button>

                                    <div className="bg-secondary/10 p-4 rounded-xl border border-border/50">
                                        <p className="text-[10px] text-center text-muted-foreground leading-relaxed">
                                            Integrated Engineering Response: Standard reply time is under 12 hours.
                                        </p>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
