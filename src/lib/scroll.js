'use client';

export function scrollToHash(href, offset = 88) {
  if (typeof window === 'undefined') return;

  if (!href || href === '/' || href === '#') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const id = href.startsWith('#') ? href.slice(1) : href;
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}
