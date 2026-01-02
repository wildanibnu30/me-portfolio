import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const softwareSkills = [
  { name: 'SolidWorks', imageSrc: '/images/Tools/solidworks.png' },
  { name: 'Inventor', imageSrc: '/images/Tools/inventor.png' },
  { name: 'AutoCAD', imageSrc: '/images/Tools/autocad.png' },
  { name: 'Excel', imageSrc: '/images/Tools/excel.png' },
];

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-24 bg-secondary/5">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
              About Me
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Mechanical Engineering <br />
              <span className="text-primary">Background.</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                I am a Mechanical Engineering graduate from <span className="text-foreground font-semibold">SMKN 1 Kertosono</span>.
                During my studies, I achieved the position of 4th Runner-up (Juara Harapan 1) at the <span className="text-foreground font-semibold">LKS East Java Skills Competition</span>, demonstrating my technical proficiency under pressure.
              </p>
              <p>
                My professional experience includes a 6-month internship at <span className="text-foreground font-semibold">Balai Yasa Surabaya Gubeng</span>.
                Additionally, I spent 5 months at <span className="text-foreground font-semibold">PT Widjaya Teknik Indonesia</span> focusing on industrial design and drafting. I am dedicated to producing accurate and practical engineering solutions.
              </p>
            </div>

            <div className="pt-6 grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 p-4 bg-background rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                <span className="text-3xl font-bold text-primary">1+</span>
                <span className="text-sm text-muted-foreground">Year Experience</span>
              </div>
              <div className="flex flex-col gap-1 p-4 bg-background rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                <span className="text-3xl font-bold text-primary">Key</span>
                <span className="text-sm text-muted-foreground">Projects Completed</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-bold tracking-tight">Software Skills</h3>
            <p className="text-muted-foreground">
              I am proficient in the following industry-standard software tools:
            </p>
            <div className="grid grid-cols-2 gap-4">
              {softwareSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="group bg-background p-6 rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 flex items-center gap-4"
                >
                  <div className="relative h-12 w-12 flex-shrink-0 transition-transform group-hover:scale-110 duration-300">
                    <Image
                      src={skill.imageSrc}
                      alt={`${skill.name} Logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-semibold text-lg">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
