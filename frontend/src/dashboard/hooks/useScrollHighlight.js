import * as React from 'react';
import { usePage } from '../context/PageContext';

/**
 * Call this hook once inside any page component whose sections have `id` attrs.
 * When Search sets `searchHighlight`, the target element is scrolled into view
 * and briefly outlined.
 */
export function useScrollHighlight() {
  const { searchHighlight, setSearchHighlight } = usePage();

  React.useEffect(() => {
    if (!searchHighlight?.scrollToId) return;

    // Small delay lets the page re-render before we try to find the element
    const t = setTimeout(() => {
      const el = document.getElementById(searchHighlight.scrollToId);
      if (!el) return;

      el.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Flash a visible highlight ring
      el.style.transition = 'outline 0.15s ease, outline-offset 0.15s ease';
      el.style.outline = '2.5px solid';
      el.style.outlineColor = 'var(--mui-palette-primary-main, #1976d2)';
      el.style.borderRadius = '12px';

      const clear = setTimeout(() => {
        el.style.outline = '';
        el.style.borderRadius = '';
        setSearchHighlight(null);
      }, 1800);

      return () => clearTimeout(clear);
    }, 200);

    return () => clearTimeout(t);
  }, [searchHighlight, setSearchHighlight]);
}
