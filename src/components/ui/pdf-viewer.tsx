'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2, Maximize2, RotateCcw, Move } from 'lucide-react';

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
    const [containerHeight, setContainerHeight] = useState<number>(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [pageWidth, setPageWidth] = useState<number>(0);
    const [pageHeight, setPageHeight] = useState<number>(0);
    const [fitMode, setFitMode] = useState<'width' | 'height' | 'none'>('width');
    const pageRef = useRef<HTMLDivElement>(null);
    const isInitialLoad = useRef(true);

    // Handle Resize to make it responsive
    useEffect(() => {
        if (!containerRef) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setContainerWidth(entry.contentRect.width);
                setContainerHeight(entry.contentRect.height);
            }
        });

        resizeObserver.observe(containerRef);
        return () => resizeObserver.disconnect();
    }, [containerRef]);

    // Calculate fit to width scale
    const calculateFitToWidth = useCallback(() => {
        if (pageWidth && containerWidth) {
            return containerWidth / pageWidth;
        }
        return 1.0;
    }, [pageWidth, containerWidth]);

    // Calculate fit to height scale
    const calculateFitToHeight = useCallback(() => {
        if (pageHeight && containerHeight) {
            return containerHeight / pageHeight;
        }
        return 1.0;
    }, [pageHeight, containerHeight]);

    // Auto fit on initial load
    useEffect(() => {
        if (isInitialLoad.current && containerWidth > 0 && pageWidth > 0 && fitMode === 'width') {
            const fitScale = calculateFitToWidth();
            setScale(fitScale);
            setPosition({ x: 0, y: 0 });
            isInitialLoad.current = false;
        }
    }, [containerWidth, pageWidth, fitMode, calculateFitToWidth]);

    // Apply fit mode when changed
    useEffect(() => {
        if (fitMode === 'width' && containerWidth > 0 && pageWidth > 0) {
            const fitScale = calculateFitToWidth();
            setScale(fitScale);
            setPosition({ x: 0, y: 0 });
        } else if (fitMode === 'height' && containerHeight > 0 && pageHeight > 0) {
            const fitScale = calculateFitToHeight();
            setScale(fitScale);
            setPosition({ x: 0, y: 0 });
        }
    }, [fitMode, containerWidth, containerHeight, pageWidth, pageHeight, calculateFitToWidth, calculateFitToHeight]);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function onPageLoadSuccess(page: any) {
        if (page) {
            setPageWidth(page.width);
            setPageHeight(page.height);
        }
    }

    function changePage(offset: number) {
        setPageNumber((prevPageNumber) => {
            const newPage = Math.min(Math.max(prevPageNumber + offset, 1), numPages);
            setPosition({ x: 0, y: 0 }); // Reset position when changing page
            return newPage;
        });
    }

    function zoomIn() {
        setScale((prevScale) => {
            const newScale = Math.min(prevScale + 0.1, 3.0);
            setFitMode('none');
            return newScale;
        });
    }

    function zoomOut() {
        setScale((prevScale) => {
            const newScale = Math.max(prevScale - 0.1, 0.5);
            setFitMode('none');
            return newScale;
        });
    }

    function setZoom(value: number) {
        setScale(Math.max(0.5, Math.min(value, 3.0)));
        setFitMode('none');
    }

    function fitToWidth() {
        setFitMode('width');
    }

    function fitToHeight() {
        setFitMode('height');
    }

    function resetView() {
        setPosition({ x: 0, y: 0 });
        fitToWidth();
    }

    // Mouse wheel zoom
    const handleWheel = useCallback((e: WheelEvent) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            setScale((prevScale) => {
                const newScale = Math.max(0.5, Math.min(prevScale + delta, 3.0));
                setFitMode('none');
                return newScale;
            });
        }
    }, []);

    // Mouse drag/pan
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (e.button === 0) { // Left mouse button
            setIsDragging(true);
            setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
        }
    }, [position]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y,
            });
        }
    }, [isDragging, dragStart]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    // Touch gestures
    const touchStartRef = useRef<{ x: number; y: number; distance: number; scale: number } | null>(null);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            // Single touch - start pan
            const touch = e.touches[0];
            touchStartRef.current = {
                x: touch.clientX - position.x,
                y: touch.clientY - position.y,
                distance: 0,
                scale: scale,
            };
        } else if (e.touches.length === 2) {
            // Two touches - start pinch zoom
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            touchStartRef.current = {
                x: 0,
                y: 0,
                distance,
                scale: scale,
            };
        }
    }, [position, scale]);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        e.preventDefault();
        if (e.touches.length === 1 && touchStartRef.current) {
            // Single touch - pan
            const touch = e.touches[0];
            setPosition({
                x: touch.clientX - touchStartRef.current.x,
                y: touch.clientY - touchStartRef.current.y,
            });
        } else if (e.touches.length === 2 && touchStartRef.current) {
            // Two touches - pinch zoom
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            const scaleChange = distance / touchStartRef.current.distance;
            const newScale = Math.max(0.5, Math.min(touchStartRef.current.scale * scaleChange, 3.0));
            setScale(newScale);
            setFitMode('none');
        }
    }, []);

    const handleTouchEnd = useCallback(() => {
        touchStartRef.current = null;
    }, []);

    // Attach wheel event listener
    useEffect(() => {
        const container = containerRef;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
            return () => container.removeEventListener('wheel', handleWheel);
        }
    }, [containerRef, handleWheel]);

    // Constrain position to prevent dragging too far
    useEffect(() => {
        if (pageWidth && pageHeight && containerWidth && containerHeight) {
            const scaledWidth = pageWidth * scale;
            const scaledHeight = pageHeight * scale;
            const maxX = Math.max(0, (scaledWidth - containerWidth) / 2);
            const maxY = Math.max(0, (scaledHeight - containerHeight) / 2);
            
            setPosition(prev => ({
                x: Math.max(-maxX, Math.min(maxX, prev.x)),
                y: Math.max(-maxY, Math.min(maxY, prev.y)),
            }));
        }
    }, [scale, pageWidth, pageHeight, containerWidth, containerHeight]);

    return (
        <div className="flex flex-col items-center w-full space-y-4">
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-secondary/50 rounded-lg backdrop-blur-sm sticky top-20 z-10 w-full max-w-4xl shadow-sm border border-border/50">
                {/* Page Navigation */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => changePage(-1)}
                        disabled={pageNumber <= 1}
                        aria-label="Previous Page"
                        className="h-9 w-9"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <span className="text-sm font-medium min-w-[4rem] text-center px-2">
                        {pageNumber} / {numPages || '--'}
                    </span>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => changePage(1)}
                        disabled={pageNumber >= numPages}
                        aria-label="Next Page"
                        className="h-9 w-9"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <div className="w-px h-6 bg-border mx-1" />

                {/* Zoom Controls */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={zoomOut}
                        disabled={scale <= 0.5}
                        aria-label="Zoom Out"
                        className="h-9 w-9"
                    >
                        <ZoomOut className="h-4 w-4" />
                    </Button>

                    {/* Zoom Slider */}
                    <div className="flex items-center gap-2 min-w-[120px]">
                        <input
                            type="range"
                            min="50"
                            max="300"
                            value={Math.round(scale * 100)}
                            onChange={(e) => setZoom(parseInt(e.target.value) / 100)}
                            className="flex-1 h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                            aria-label="Zoom level"
                        />
                        <span className="text-sm font-medium w-12 text-center">
                            {Math.round(scale * 100)}%
                        </span>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={zoomIn}
                        disabled={scale >= 3.0}
                        aria-label="Zoom In"
                        className="h-9 w-9"
                    >
                        <ZoomIn className="h-4 w-4" />
                    </Button>
                </div>

                <div className="w-px h-6 bg-border mx-1" />

                {/* Fit Controls */}
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={fitToWidth}
                        aria-label="Fit to Width"
                        className="h-9 px-3 text-xs"
                        title="Fit to Width"
                    >
                        <Maximize2 className="h-3.5 w-3.5 mr-1.5" />
                        Width
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={fitToHeight}
                        aria-label="Fit to Height"
                        className="h-9 px-3 text-xs"
                        title="Fit to Height"
                    >
                        <Maximize2 className="h-3.5 w-3.5 mr-1.5 rotate-90" />
                        Height
                    </Button>
                </div>

                <div className="w-px h-6 bg-border mx-1" />

                {/* Reset View */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={resetView}
                    aria-label="Reset View"
                    className="h-9 w-9"
                    title="Reset View"
                >
                    <RotateCcw className="h-4 w-4" />
                </Button>

                {/* Pan Indicator */}
                {scale > 1 && (
                    <>
                        <div className="w-px h-6 bg-border mx-1" />
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Move className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">Drag to pan</span>
                        </div>
                    </>
                )}
            </div>

            {/* PDF View Container */}
            <div
                className="w-full relative bg-muted/20 border border-border/40 rounded-xl overflow-hidden shadow-inner"
                style={{ 
                    minHeight: '500px',
                    maxHeight: '80vh',
                    touchAction: 'none',
                    cursor: isDragging ? 'grabbing' : scale > 1 ? 'grab' : 'default',
                }}
                ref={setContainerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="relative flex justify-center items-start transition-transform duration-100"
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px)`,
                        minHeight: '500px',
                    }}
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
                            <div ref={pageRef}>
                                <Page
                                    pageNumber={pageNumber}
                                    width={fitMode === 'width' ? containerWidth : undefined}
                                    height={fitMode === 'height' ? containerHeight : undefined}
                                    scale={fitMode === 'none' ? scale : undefined}
                                    onLoadSuccess={onPageLoadSuccess}
                                    renderTextLayer={true}
                                    renderAnnotationLayer={true}
                                    className="shadow-lg bg-white"
                                />
                            </div>
                        )}
                    </Document>
                </div>
            </div>

            {/* Instructions */}
            <div className="text-xs text-muted-foreground text-center space-y-1 max-w-2xl px-4">
                <p className="hidden md:block">
                    <strong>Desktop:</strong> Use mouse wheel + Ctrl/Cmd to zoom, click and drag to pan
                </p>
                <p className="md:hidden">
                    <strong>Mobile:</strong> Pinch to zoom, drag to pan
                </p>
            </div>
        </div>
    );
}
