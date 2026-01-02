'use client';

import dynamic from 'next/dynamic';

const PdfViewer = dynamic(() => import('@/components/ui/pdf-viewer'), {
  ssr: false,
  loading: () => <p className="text-muted-foreground">Loading PDF Viewer...</p>,
});

export default function CVDemoPage() {
  const cvUrl = '/document/CV_Wildan_Ibnu_Jamil.pdf'; // Update with actual CV path

  return (
    <div className="container py-24 px-4 md:px-6 max-w-4xl mx-auto flex flex-col items-center">
      <div className="text-center mb-10 space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Curriculum Vitae</h1>
        <div className="inline-block px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm">
          Swipe or use controls to navigate
        </div>
      </div>

      <div className="w-full">
        <PdfViewer url={cvUrl} />
      </div>
    </div>
  );
}
