'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CvDemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tighter mb-2">View CV</h1>
          <p className="text-muted-foreground">Curriculum Vitae — PDF viewer.</p>
        </div>

        <Card className="border-border/40 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl">CV</CardTitle>
            <CardDescription>Preview dokumen PDF.</CardDescription>
          </CardHeader>
          <div className="px-6 pb-6">
            <div className="w-full overflow-hidden rounded-lg border border-border/40 bg-background">
              <div className="relative aspect-[4/5] w-full">
                <iframe
                  src="/document/CV_Wildan_Ibnu_Jamil.pdf"
                  title="Wildan Ibnu Jamil CV"
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
