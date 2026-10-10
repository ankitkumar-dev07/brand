
import { useEffect } from 'react';

export default function TextAnimation() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const root = document.getElementById('root');
    if (!root) return;

    let observer;

    const setupAnimations = () => {
      const elements = root.querySelectorAll(
        'h1, h2, h3, h4, section p, .chip'
      );

      elements.forEach((element, index) => {
        if (element.dataset.textReveal === 'true') return;

        element.dataset.textReveal = 'true';
        element.classList.add('text-reveal');

        element.style.setProperty(
          '--text-delay',
          `${(index % 4) * 60}ms`
        );

        observer.observe(element);
      });
    };

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('text-reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    setupAnimations();

    const mutationObserver = new MutationObserver(() => {
      setupAnimations();
    });

    mutationObserver.observe(root, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
