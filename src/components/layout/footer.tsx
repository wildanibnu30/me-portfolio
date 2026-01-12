import { Linkedin, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Wildan Ibnu Jamil. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://linkedin.com/in/wildan-ibnu-1b8a2a32a"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="https://wa.me/6287812333374"
            aria-label="WhatsApp"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <MessageSquare className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
