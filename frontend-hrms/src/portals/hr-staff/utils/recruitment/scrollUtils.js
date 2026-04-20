export const easeInOutCubic = (progress) => (progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2);

export function animateVerticalScroll(targetY, duration = 950) {
  if (typeof window === 'undefined') return;
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) return window.scrollTo({ top: targetY });
  const startTime = window.performance.now();
  const step = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    window.scrollTo({ top: startY + distance * easeInOutCubic(progress) });
    if (progress < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
}