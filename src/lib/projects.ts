export type Project = {
  id: number;
  title: string;
  description: string;
  thumbnailSrc: string;
  pdfUrl?: string;
  videoUrl?: string;
  modelDir?: string;
  defaultModelUrl?: string;
  tag?: string;
  isIndustryProject?: boolean;
};

const rawProjects: ReadonlyArray<Project> = [
  {
    id: 1,
    title: 'Mechanical Parts 3D',
    description: 'Created 3D models of mechanical parts using CAD software, focusing on accurate dimensions and standard features.',
    thumbnailSrc: '/images/projects/mechanical_parts.webp',
    pdfUrl: '/document/mechanical_parts.pdf',
    modelDir: 'mechanical_parts',
    defaultModelUrl: '/3d/mechanical_parts/MP_01.glb',
    tag: 'Learning Project',
    isIndustryProject: false,
  },
  {
    id: 2,
    title: 'Mechanical Assembly',
    description: 'Assembled multiple mechanical components in a 3D environment to verify fit and function.',
    thumbnailSrc: '/images/projects/mechanical_assembly.webp',
    pdfUrl: '/document/mechanical_assembly.pdf',
    modelDir: 'mechanical_assembly',
    defaultModelUrl: '/3d/mechanical_assembly/MA_01.glb',
    tag: 'Learning Project',
    isIndustryProject: false,
  },
  {
    id: 3,
    title: 'Technical Drawing',
    description: 'Drafted 2D technical drawings for manufacturing, including necessary views, dimensions, and annotations.',
    thumbnailSrc: '/images/projects/technical_drawing.webp',
    pdfUrl: '/document/technical_drawing.pdf',
    modelDir: 'technical_drawing',
    defaultModelUrl: '/3d/technical_drawing/TD_01.glb',
    tag: 'Learning Project',
    isIndustryProject: false,
  },
  {
    id: 4,
    title: 'Machine Simulation',
    description: 'Performed basic motion study and simulation to demonstrate the working mechanism of the design.',
    thumbnailSrc: '/images/projects/machine_simulation.webp',
    videoUrl: '/video/machine_simulation.mp4',
    modelDir: 'machine_simulation',
    defaultModelUrl: '/3d/machine_simulation/MS_01.glb',
    tag: 'Learning Project',
    isIndustryProject: false,
  },
  {
    id: 5,
    title: 'Liquid Packaging Machine',
    description: 'Contributed to the design of a liquid packaging machine system, including part modeling and assembly.',
    thumbnailSrc: '/images/projects/liquid_packaging_machine.webp',
    pdfUrl: '/document/liquid_packaging_machine.pdf',
    modelDir: 'liquid_packaging_machine',
    defaultModelUrl: '/3d/liquid_packaging_machine/liquid_packaging_machine.glb',
    tag: 'Industry Experience',
    isIndustryProject: true,
  },
];

export const projects: ReadonlyArray<Project> = rawProjects.slice().sort((a, b) => a.id - b.id);

export function getProjectById(id: number): Project | null {
  return projects.find((p) => p.id === id) ?? null;
}
