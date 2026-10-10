
import { useEffect, useRef, useState } from 'react';

export default function Reveal({
  children,
  className = '',
  delay = 0,
  stagger = false,
  once = true,
}) {
  const elementRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    // Show content immediately if IntersectionObserver is unavailable.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);

          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setVisible(false);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -35px 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once]);

  const classes = [
    'bc-reveal',
    visible ? 'bc-reveal-visible' : '',
    stagger ? 'bc-stagger' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={elementRef}
      className={classes}
      style={{ '--bc-reveal-delay': `${delay}ms` }}
    >
      {children}
    </div>
  );
}
