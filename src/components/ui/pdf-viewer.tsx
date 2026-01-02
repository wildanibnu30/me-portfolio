'use client';

import { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2 } from 'lucide-react';
import { useResizeObserver } from 'usehooks-ts';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


// Set up the worker for PDF.js using CDN for stability
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
    url: string;
}

export default function PdfViewer({ url }: PdfViewerProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState<number>(1.0);
    const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);

    // Handle Resize to make it responsive
    useEffect(() => {
        if (!containerRef) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setContainerWidth(entry.contentRect.width);
            }
        });

        resizeObserver.observe(containerRef);
        return () => resizeObserver.disconnect();
    }, [containerRef]);

    // Adjust scale based on container width for mobile optimization
    useEffect(() => {
        if (containerWidth) {
            // On mobile, we might want to start at full width defined by the container
            // But we also want to respect the user's manual zoom if they change it.
            // For initial load, we can try to fit width.
            // However, react-pdf Page component has a 'width' prop that auto-scales if scale is not set.
        }
    }, [containerWidth]);


    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset: number) {
        setPageNumber((prevPageNumber) => Math.min(Math.max(prevPageNumber + offset, 1), numPages));
    }

    function zoomIn() {
        setScale((prevScale) => Math.min(prevScale + 0.2, 3.0));
    }

    function zoomOut() {
        setScale((prevScale) => Math.max(prevScale - 0.2, 0.5));
    }

    return (
        <div className="flex flex-col items-center w-full space-y-4">
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-secondary/50 rounded-lg backdrop-blur-sm sticky top-20 z-10 w-full max-w-md shadow-sm border border-border/50">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => changePage(-1)}
                    disabled={pageNumber <= 1}
                    aria-label="Previous Page"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <span className="text-sm font-medium min-w-[3rem] text-center">
                    {pageNumber} / {numPages || '--'}
                </span>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => changePage(1)}
                    disabled={pageNumber >= numPages}
                    aria-label="Next Page"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>

                <div className="w-px h-4 bg-border mx-2" />

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={zoomOut}
                    disabled={scale <= 0.5}
                    aria-label="Zoom Out"
                >
                    <ZoomOut className="h-4 w-4" />
                </Button>

                <span className="text-sm font-medium w-12 text-center">
                    {Math.round(scale * 100)}%
                </span>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={zoomIn}
                    disabled={scale >= 3.0}
                    aria-label="Zoom In"
                >
                    <ZoomIn className="h-4 w-4" />
                </Button>
            </div>

            {/* PDF View */}
            <div
                className="w-full relative min-h-[500px] flex justify-center bg-muted/20 border border-border/40 rounded-xl overflow-hidden shadow-inner"
                ref={setContainerRef}
            >
                <Document
                    file={url}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={
                        <div className="absolute inset-0 flex items-center justify-center gap-2 text-muted-foreground">
                            <Loader2 className="h-6 w-6 animate-spin" />
                            <span>Loading PDF...</span>
                        </div>
                    }
                    error={
                        <div className="absolute inset-0 flex items-center justify-center text-destructive">
                            <span>Failed to load PDF.</span>
                        </div>
                    }
                    className="max-w-full"
                >
                    {containerWidth > 0 && (
                        <Page
                            pageNumber={pageNumber}
                            width={containerWidth}
                            scale={scale}
                            renderTextLayer={true}
                            renderAnnotationLayer={true}
                            className="shadow-lg bg-white"
                        />
                    )}
                </Document>
            </div>
        </div>
    );
}
