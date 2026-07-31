'use client';

import { useEffect } from 'react';
import { scrollToHash } from '@/lib/scroll';

export default function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const timer = window.setTimeout(() => {
      scrollToHash(hash, 88);
    }, 80);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
