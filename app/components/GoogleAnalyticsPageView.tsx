"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function GoogleAnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      // Construct the full URL including search parameters
      const url = searchParams.size > 0 
        ? `${pathname}?${searchParams.toString()}`
        : pathname;
        
      // Send pageview event to Google Analytics
      // This works with both gtag.js and Google Tag Manager
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          page_path: url,
          page_title: document.title,
          page_location: window.location.href,
        });
      }
    }
  }, [pathname, searchParams]);

  return null; // This component doesn't render anything
}
