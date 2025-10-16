'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function useGtagPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!window.gtag) return;  // safety check

    const queryString = searchParams?.toString();
    const fullPath = pathname + (queryString ? `?${queryString}` : '');

    window.gtag('event', 'page_view', {
      page_path: fullPath,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);
}
