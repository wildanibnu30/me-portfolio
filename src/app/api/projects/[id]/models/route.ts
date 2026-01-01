import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { getProjectById } from '@/lib/projects';

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const idNumber = Number(id);
  const project = getProjectById(idNumber);

  if (!project?.modelDir) {
    return NextResponse.json({ models: [] });
  }

  const baseDir = path.join(process.cwd(), 'public', '3d', project.modelDir);

  try {
    const entries = await fs.readdir(baseDir, { withFileTypes: true });
    const models = entries
      .filter((e) => e.isFile() && e.name.toLowerCase().endsWith('.glb'))
      .map((e) => `/3d/${project.modelDir}/${e.name}`)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    return NextResponse.json({ models });
  } catch {
    return NextResponse.json({ models: [] });
  }
}
