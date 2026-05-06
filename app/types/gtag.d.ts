// Type definitions for Google Analytics gtag.js
interface Window {
  gtag?: (
    command: 'event' | 'config' | 'consent' | 'js',
    action: string | Date,
    params?: {
      page_path?: string;
      page_title?: string;
      page_location?: string;
      [key: string]: any;
    }
  ) => void;
  dataLayer?: any[];
  TTDUniversalPixelApi?: new () => {
    init: (advertiserId: string, pixelIds: string[], endpoint: string) => void;
  };
  ttd_dom_ready?: (callback: () => void) => void;
  silktideConsentManager?: {
    getInstance?: () => {
      getConsentChoice?: (typeId: string) => boolean | null;
    } | null;
  };
}

interface Navigator {
  globalPrivacyControl?: boolean;
}
