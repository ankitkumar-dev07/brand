export function initTextAnimations() {
  const elements = document.querySelectorAll(
    'h1, h2, h3, section p, section .chip'
  );

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (reducedMotion) return () => {};

  elements.forEach((element, index) => {
    if (element.dataset.textAnimated) return;

    element.dataset.textAnimated = 'true';
    element.classList.add('text-animate');

    // Keep initial hero text visible on page load.
    if (element.closest('header') || element.closest('nav')) {
      element.classList.add('text-visible');
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('text-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -35px 0px',
    }
  );

  document
    .querySelectorAll('.text-animate:not(.text-visible)')
    .forEach((element) => observer.observe(element));

  return () => observer.disconnect();
}
