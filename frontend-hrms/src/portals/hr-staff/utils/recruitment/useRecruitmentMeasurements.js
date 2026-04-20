import { useLayoutEffect, useRef, useState } from 'react';

export function useRecruitmentMeasurements(activeTab, currentItems) {
  const measureLayerRef = useRef(null);
  const [measuredCardHeights, setMeasuredCardHeights] = useState({ applications: 0, 'for-admin-approval': 0, 'partner-university': 0 });

  useLayoutEffect(() => {
    if (!measureLayerRef.current || currentItems.length === 0) return;
    const frameId = window.requestAnimationFrame(() => {
      const nextHeight = Array.from(measureLayerRef.current.querySelectorAll('.recruitment-measure-card')).reduce((maxHeight, element) => Math.max(maxHeight, Math.ceil(element.getBoundingClientRect().height)), 0);
      if (nextHeight === 0) return;
      setMeasuredCardHeights((current) => current[activeTab] === nextHeight ? current : { ...current, [activeTab]: nextHeight });
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [activeTab, currentItems]);

  return { measureLayerRef, currentFixedCardHeight: measuredCardHeights[activeTab] || undefined };
}