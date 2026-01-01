'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ThreeScene from '@/components/three-scene';
import { getProjectById, projects } from '@/lib/projects';

export default function DemoPage() {
  const params = useParams();
  const id = (params as { id?: string }).id;
  const idNumber = id ? Number(id) : Number.NaN;
  const [project, setProject] = useState(() => getProjectById(idNumber));
  const [models, setModels] = useState<string[]>([]);
  const [activeModelUrl, setActiveModelUrl] = useState<string | null>(() => null);
  const [isModelsLoading, setIsModelsLoading] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);

  useEffect(() => {
    setProject(getProjectById(idNumber));
  }, [idNumber]);

  useEffect(() => {
    setIsPdfLoading(Boolean(project?.pdfUrl));
  }, [project?.pdfUrl]);

  useEffect(() => {
    if (!project?.modelDir) {
      setModels([]);
      setActiveModelUrl(null);
      return;
    }

    const abortController = new AbortController();
    const load = async () => {
      try {
        setIsModelsLoading(true);
        const res = await fetch(`/api/projects/${project.id}/models`, { signal: abortController.signal });
        if (!res.ok) throw new Error('Failed to load models');
        const data = (await res.json()) as { models: string[] };
        const list = data.models ?? [];
        setModels(list);

        if (list.length === 0) {
          setActiveModelUrl(null);
          return;
        }

        const preferred = project.defaultModelUrl && list.includes(project.defaultModelUrl) ? project.defaultModelUrl : list[0];
        setActiveModelUrl(preferred);
      } catch (e) {
        if (!abortController.signal.aborted) {
          setModels([]);
          setActiveModelUrl(project.defaultModelUrl ?? null);
        }
      } finally {
        if (!abortController.signal.aborted) setIsModelsLoading(false);
      }
    };

    load();

    return () => abortController.abort();
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground">The requested project demo could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tighter mb-2">{project.title}</h1>
          <p className="text-muted-foreground">{project.description}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border/40 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl">Dokumentasi</CardTitle>
              <CardDescription>Technical drawings and specifications.</CardDescription>
            </CardHeader>
            <div className="px-6 pb-6 space-y-4">
              {project.pdfUrl && (
                <div className="w-full overflow-hidden rounded-lg border border-border/40 bg-background">
                  <div className="relative aspect-[4/5] w-full">
                    {isPdfLoading && (
                      <div className="absolute inset-0 animate-pulse bg-muted" />
                    )}
                    <iframe
                      src={project.pdfUrl}
                      title={`${project.title} PDF`}
                      className="absolute inset-0 h-full w-full"
                      loading="lazy"
                      onLoad={() => setIsPdfLoading(false)}
                    />
                  </div>
                </div>
              )}

              {project.videoUrl && (
                <div className="w-full overflow-hidden rounded-lg border border-border/40 bg-black">
                  <div className="relative aspect-video w-full">
                    <video className="absolute inset-0 h-full w-full" controls preload="metadata" src={project.videoUrl} />
                  </div>
                </div>
              )}

              {!project.pdfUrl && !project.videoUrl && (
                <div className="text-sm text-muted-foreground">Preview not available.</div>
              )}
            </div>
          </Card>

          <Card className="border-border/40 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl">3D Gallery</CardTitle>
              <CardDescription>Select a model and inspect it.</CardDescription>
            </CardHeader>
            <div className="px-6 pb-6 space-y-4">
              <div className="flex items-center gap-3">
                <label className="text-sm text-muted-foreground" htmlFor="model">
                  Model
                </label>
                <select
                  id="model"
                  className="h-10 flex-1 rounded-md border border-input bg-background px-3 text-sm"
                  value={activeModelUrl ?? ''}
                  onChange={(e) => setActiveModelUrl(e.target.value)}
                  disabled={isModelsLoading || models.length === 0}
                >
                  {models.length === 0 && <option value="">No models</option>}
                  {models.map((m) => (
                    <option key={m} value={m}>
                      {m.split('/').pop()}
                    </option>
                  ))}
                </select>
              </div>

              {isModelsLoading && (
                <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-border/40 bg-card/30 animate-pulse" />
              )}

              {!isModelsLoading && activeModelUrl && (
                <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-border/40 bg-card/30 transition-transform duration-300 will-change-transform hover:scale-[1.01] hover:shadow-[0_16px_60px_-32px_hsl(var(--primary)/0.55)]">
                  <ThreeScene modelUrl={activeModelUrl} className="absolute inset-0" autoRotate={true} />
                </div>
              )}

              {!isModelsLoading && !activeModelUrl && (
                <div className="text-sm text-muted-foreground">3D model not available.</div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
