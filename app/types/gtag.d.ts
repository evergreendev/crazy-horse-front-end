// Type definitions for Google Analytics gtag.js
interface Window {
  gtag?: (
    command: 'event',
    action: string,
    params: {
      page_path?: string;
      page_title?: string;
      page_location?: string;
      [key: string]: any;
    }
  ) => void;
}
