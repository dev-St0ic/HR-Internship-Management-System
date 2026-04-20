import { useEffect, useRef } from 'react';

import { buildSamplePdf } from './pdf';

export function useDocumentVaultPdfCache() {
  const pdfUrlCacheRef = useRef(new Map());

  useEffect(() => () => { pdfUrlCacheRef.current.forEach((url) => URL.revokeObjectURL(url)); pdfUrlCacheRef.current.clear(); }, []);

  const handleOpenPdf = (record, download = false) => {
    let pdfUrl = pdfUrlCacheRef.current.get(record.id);
    if (!pdfUrl) { pdfUrl = URL.createObjectURL(buildSamplePdf(record)); pdfUrlCacheRef.current.set(record.id, pdfUrl); }
    if (download) { const link = document.createElement('a'); link.href = pdfUrl; link.download = record.fileName; link.click(); return; }
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return { handleOpenPdf };
}