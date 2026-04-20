import { useEffect, useRef, useState } from 'react';

import { createInitialColumnWidths } from './columns';

export function useColumnResize() {
  const [columnWidths, setColumnWidths] = useState(createInitialColumnWidths);
  const resizeStateRef = useRef(null);

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!resizeStateRef.current) return;
      const { tabKey, columnKey, startX, startWidth, minWidth } = resizeStateRef.current;
      const nextWidth = Math.max(minWidth, startWidth + (event.clientX - startX));
      setColumnWidths((current) => current[tabKey][columnKey] === nextWidth ? current : { ...current, [tabKey]: { ...current[tabKey], [columnKey]: nextWidth } });
    };
    const stopResizing = () => {
      if (!resizeStateRef.current) return;
      resizeStateRef.current = null;
      document.body.style.cursor = '';
      document.body.classList.remove('document-vault-is-resizing');
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', stopResizing);
      document.body.style.cursor = '';
      document.body.classList.remove('document-vault-is-resizing');
    };
  }, []);

  const handleResizeStart = (event, tabKey, columnKey, minWidth) => {
    event.preventDefault();
    event.stopPropagation();
    resizeStateRef.current = { tabKey, columnKey, startX: event.clientX, startWidth: columnWidths[tabKey][columnKey], minWidth };
    document.body.style.cursor = 'col-resize';
    document.body.classList.add('document-vault-is-resizing');
  };

  return { columnWidths, handleResizeStart };
}