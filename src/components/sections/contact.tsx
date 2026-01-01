'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { Linkedin, Send, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export default function ContactSection() {
    const { toast } = useToast();
  
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            message: '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: "Message Sent!",
            description: "Thank you for reaching out. I'll get back to you soon.",
        });
        form.reset();
    }
  
    return (
        <section id="contact" className="w-full py-12 md:py-24">
            <div className="flex flex-col items-center text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
                <p className="mt-4 max-w-2xl text-muted-foreground md:text-xl/relaxed">Have a project in mind or just want to connect? Feel free to reach out.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="border-border/40">
                    <CardHeader>
                        <CardTitle>Send a Message</CardTitle>
                        <CardDescription>I&apos;m available for freelance projects and collaborations.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl><Input placeholder="your.email@example.com" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="message" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl><Textarea placeholder="Your message..." className="min-h-[120px]" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <Button type="submit" className="w-full">
                                    <Send className="mr-2 h-4 w-4"/>
                                    Send Message
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
                <div className="flex flex-col space-y-4 justify-center">
                   <a href="https://www.linkedin.com/public-profile/settings?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact-info%3Bm4uJE1SeS8iUaElkikKdkQ%3D%3D" target="_blank" rel="noopener noreferrer">
                        <Card className="hover:bg-accent/50 transition-colors border-border/40">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Linkedin className="h-8 w-8 text-primary"/>
                                <div>
                                    <CardTitle>LinkedIn</CardTitle>
                                    <CardDescription>Connect with me professionally.</CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                   </a>
                   <a href="https://wa.me/6287812333374" target="_blank" rel="noopener noreferrer">
                        <Card className="hover:bg-accent/50 transition-colors border-border/40">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <MessageSquare className="h-8 w-8 text-primary"/>
                                <div>
                                    <CardTitle>WhatsApp</CardTitle>
                                    <CardDescription>For business inquiries.</CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                   </a>
                </div>
            </div>
        </section>
    );
}
