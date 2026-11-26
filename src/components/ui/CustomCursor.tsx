import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => {
      cursor.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      if (!isVisible) setIsVisible(true);
    };

    const onEnter = () => setIsHovered(true);
    const onLeave = () => setIsHovered(false);

    window.addEventListener('mousemove', onMove, { passive: true });

    const attachListeners = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    attachListeners();
    // Re-attach if DOM changes
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        setIsVisible(false);
      }
    };
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseout', onMouseOut);
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <div
      ref={cursorRef}
      className={`simple-cursor ${isHovered ? 'cursor-hover' : ''} ${isVisible ? 'cursor-visible' : ''}`}
      aria-hidden="true"
    />
  );
};

export default CustomCursor;
