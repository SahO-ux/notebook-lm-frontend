import { Document, Page, pdfjs } from "react-pdf";
import { useState, useEffect, useRef } from "react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import workerSrc from "pdfjs-dist/legacy/build/pdf.worker.min.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PDFViewer({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [pdfURL, setPdfURL] = useState(null);
  const [scale, setScale] = useState(1.0);
  const [fitToWidth, setFitToWidth] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPdfURL(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  // Auto-fit width
  useEffect(() => {
    if (!fitToWidth || !containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        // PDF default width is ~600, adjust scale accordingly
        const newScale = width / 600;
        setScale(newScale);
      }
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [fitToWidth]);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 bg-white border-b">
        {!fitToWidth && (
          <>
            <button
              onClick={() => setScale((s) => Math.max(s - 0.2, 0.4))}
              className="px-2 py-1 border rounded"
            >
              ➖ Zoom Out
            </button>
            <button
              onClick={() => setScale((s) => Math.min(s + 0.2, 3))}
              className="px-2 py-1 border rounded"
            >
              ➕ Zoom In
            </button>
          </>
        )}

        <button
          onClick={() => setFitToWidth((v) => !v)}
          className="px-2 py-1 border rounded ml-2"
        >
          {fitToWidth ? "🔓 Manual Zoom" : "📐 Fit to Width"}
        </button>

        <span className="ml-2 text-sm text-gray-600">
          Zoom: {(scale * 100).toFixed(0)}%
        </span>
      </div>

      {/* PDF Preview */}
      <div ref={containerRef} className="flex-1 overflow-auto p-4">
        {pdfURL && (
          <Document
            file={pdfURL}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={(err) => console.error("Failed to load PDF:", err)}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Page key={index + 1} pageNumber={index + 1} scale={scale} />
            ))}
          </Document>
        )}
      </div>
    </div>
  );
}
