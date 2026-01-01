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
    <section id="about" className="w-full py-12 md:py-24">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
          <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            I am a passionate and dedicated Mechanical Design Expert with a proven track record of success, including achieving Juara Harapan 1 at LKS Jawa Timur. With hands-on experience at Balai Yasa Surabaya and PT Widjaya Teknik, I specialize in creating innovative and efficient engineering solutions. My expertise lies in 3D modeling, simulation, and bringing complex designs to life.
          </p>
        </div>
        <div className="space-y-6">
          <h3 className="text-2xl font-bold tracking-tighter">Software Proficiency</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {softwareSkills.map((skill) => {
              return (
                <Card key={skill.name} className="flex flex-col items-center justify-center p-4 bg-card/50 hover:bg-accent transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-0 flex flex-col items-center justify-center space-y-2">
                    <Image
                      src={skill.imageSrc}
                      alt={`${skill.name} Logo`}
                      width={96}
                      height={96}
                      className="h-16 w-16 object-contain"
                    />
                    <p className="font-semibold">{skill.name}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
