import { useEffect, useRef } from 'react';

import { buildSamplePdf } from './pdf';

export function useInternManagementInternPdfCache(intern) {
  const pdfUrlCacheRef = useRef(new Map());

  useEffect(() => () => { pdfUrlCacheRef.current.forEach((url) => URL.revokeObjectURL(url)); pdfUrlCacheRef.current.clear(); }, []);

  const handleOpenDocument = (document, download = false) => {
    if (!intern) return;
    let pdfUrl = pdfUrlCacheRef.current.get(document.id);
    if (!pdfUrl) { pdfUrl = URL.createObjectURL(buildSamplePdf(intern, document.name)); pdfUrlCacheRef.current.set(document.id, pdfUrl); }
    if (download) { const link = document.createElement('a'); link.href = pdfUrl; link.download = document.name; link.click(); return; }
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return { handleOpenDocument };
}