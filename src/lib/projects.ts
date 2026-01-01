export type Project = {
  id: number;
  title: string;
  description: string;
  thumbnailSrc: string;
  gridSpan: string;
  pdfUrl?: string;
  videoUrl?: string;
  modelDir?: string;
  defaultModelUrl?: string;
  tag?: string;
};

const rawProjects: ReadonlyArray<Project> = [
  {
    id: 1,
    title: 'Mechanical Parts 3D',
    description: 'Part-level modeling with supporting documentation.',
    thumbnailSrc: '/images/projects/mechanical_parts.webp',
    pdfUrl: '/document/mechanical_parts.pdf',
    modelDir: 'mechanical_parts',
    defaultModelUrl: '/3d/mechanical_parts/01.glb',
    gridSpan: 'col-span-12 md:col-span-8 row-span-2',
  },
  {
    id: 2,
    title: 'Mechanical Assembly 3D',
    description: '3D assembly details and technical notes.',
    thumbnailSrc: '/images/projects/mechanical_assembly.webp',
    pdfUrl: '/document/mechanical_assembly.pdf',
    modelDir: 'mechanical_assembly',
    defaultModelUrl: '/3d/mechanical_assembly/Arbor_Press.glb',
    gridSpan: 'col-span-12 md:col-span-4',
  },
  {
    id: 3,
    title: 'Technical Drawing',
    description: 'Drafting and manufacturing-ready drawings.',
    thumbnailSrc: '/images/projects/technical_drawing.webp',
    pdfUrl: '/document/technical_drawing.pdf',
    modelDir: 'technical_drawing',
    defaultModelUrl: '/3d/technical_drawing/Axle.glb',
    gridSpan: 'col-span-12 md:col-span-4',
  },
  {
    id: 4,
    title: 'Machine Simulation',
    description: 'Motion study and system-level simulation.',
    thumbnailSrc: '/images/projects/machine_simulation.webp',
    videoUrl: '/video/machine_simulation.mp4',
    modelDir: 'machine_simulation',
    defaultModelUrl: '/3d/machine_simulation/SE_00.glb',
    gridSpan: 'col-span-12 md:col-span-6',
  },
  {
    id: 5,
    title: 'Liquid Packaging Machine',
    description: 'Mechanical design and assembly documentation.',
    thumbnailSrc: '/images/projects/liquid_packaging_machine.webp',
    pdfUrl: '/document/liquid_packaging_machine.pdf',
    modelDir: 'liquid_packaging_machine',
    defaultModelUrl: '/3d/liquid_packaging_machine/liquid_packaging_machine.glb',
    gridSpan: 'col-span-12 md:col-span-6',
    tag: 'Industry Project',
  },
];

export const projects: ReadonlyArray<Project> = rawProjects.slice().sort((a, b) => a.id - b.id);

export function getProjectById(id: number): Project | null {
  return projects.find((p) => p.id === id) ?? null;
}
