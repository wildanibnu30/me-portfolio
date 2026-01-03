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
import { Linkedin, Send, Mail, MapPin, Loader2 } from 'lucide-react';

const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters.'),
    email: z.string().email('Please enter a valid email address.'),
    message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export default function ContactSection() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
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
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            toast({
                title: "Message Sent!",
                description: "Thank you for reaching out. I'll get back to you soon.",
            });
            form.reset();
        } catch (error: any) {
            console.error('Error sending message:', error);
            toast({
                title: "Error",
                description: error.message || "Failed to send message. Please try again or email me directly.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section id="contact" className="w-full py-24 bg-secondary/5">
            <div className="container px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <div>
                            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium mb-4">
                                Contact
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                                Let's Work Together
                            </h2>
                            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                                Have a project in mind looking for a partner? I'm currently available for freelance projects and full-time opportunities.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <a href="mailto:wildanibnujamil30@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border/50 hover:border-primary/50 transition-colors group">
                                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email Me</p>
                                    <p className="font-semibold text-foreground">wildanibnujamil30@gmail.com</p>
                                </div>
                            </a>

                            <a href="https://www.linkedin.com/in/wildan-ibnu-jamil/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border/50 hover:border-primary/50 transition-colors group">
                                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <Linkedin className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">LinkedIn</p>
                                    <p className="font-semibold text-foreground">Wildan Ibnu Jamil</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border/50">
                                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Location</p>
                                    <p className="font-semibold text-foreground">Nganjuk, East Java, Indonesia</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-background rounded-2xl border border-border/50 p-6 md:p-8 shadow-sm">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="space-y-4">
                                    <FormField control={form.control} name="name" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl><Input placeholder="John Doe" {...field} className="h-12 bg-secondary/10 border-input/50" /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl><Input placeholder="john@example.com" {...field} className="h-12 bg-secondary/10 border-input/50" /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="message" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Message</FormLabel>
                                            <FormControl><Textarea placeholder="Tell me about your project..." className="min-h-[160px] resize-none bg-secondary/10 border-input/50" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                                <Button 
                                    type="submit" 
                                    className="w-full h-12 text-base font-medium"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
}
