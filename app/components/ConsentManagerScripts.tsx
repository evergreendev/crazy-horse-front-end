import Script from "next/script";

const GA_MEASUREMENT_ID = "G-YDSBS7V3D3";
const GTM_ID = "GTM-58SJF86R";
const ADSRVR_ADVERTISER_ID = "j59v8fs";
const ADSRVR_PIXEL_IDS = ["3ywytgo"];

export default function ConsentManagerScripts() {
  return (
    <>
      <Script id="google-consent-default" strategy="beforeInteractive">
        {`
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
window.gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
        `}
      </Script>
      <Script src="/silktide-consent-manager.js" strategy="afterInteractive" />
      <Script id="silktide-consent-init" strategy="afterInteractive">
        {`
(function initializeSilktideConsent() {
  if (!window.silktideConsentManager) {
    window.setTimeout(initializeSilktideConsent, 50);
    return;
  }
  
  console.log('Silktide consent manager initialized');

  var gaMeasurementId = '${GA_MEASUREMENT_ID}';
  var gtmId = '${GTM_ID}';
  var adsrvrAdvertiserId = '${ADSRVR_ADVERTISER_ID}';
  var adsrvrPixelIds = ${JSON.stringify(ADSRVR_PIXEL_IDS)};
  var gpcEnabled = navigator.globalPrivacyControl === true;

  function honorGlobalPrivacyControl() {
    if (!gpcEnabled) return;

    try {
      window.localStorage.setItem('stcm.crazy-horse.hasConsented', 'true');
      window.localStorage.setItem('stcm.crazy-horse.consent.essential', 'true');
      window.localStorage.setItem('stcm.crazy-horse.consent.analytics', 'false');
      window.localStorage.setItem('stcm.crazy-horse.consent.marketing', 'false');
    } catch (error) {
      console.warn('Unable to persist Global Privacy Control consent choices.', error);
    }

    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
  }

  honorGlobalPrivacyControl();

  function loadScriptOnce(id, src, onload) {
    if (document.getElementById(id)) {
      if (typeof onload === 'function') onload();
      return;
    }

    var script = document.createElement('script');
    script.id = id;
    script.async = true;
    script.src = src;
    if (typeof onload === 'function') script.onload = onload;
    document.head.appendChild(script);
  }

  function loadGoogleTracking() {
    if (gpcEnabled) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };

    loadScriptOnce('google-tag-manager', 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(gtmId));
    loadScriptOnce('google-analytics-gtag', 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gaMeasurementId), function() {
      window.gtag('js', new Date());
      window.gtag('config', gaMeasurementId, { send_page_view: false });
      window.gtag('event', 'page_view', {
        page_path: window.location.pathname + window.location.search,
        page_title: document.title,
        page_location: window.location.href
      });
    });
  }

  function loadAdsRvrTracking() {
    if (gpcEnabled) return;

    loadScriptOnce('adsrvr-up-loader', 'https://js.adsrvr.org/up_loader.1.1.0.js', function() {
      if (typeof window.ttd_dom_ready !== 'function') return;

      window.ttd_dom_ready(function() {
        if (typeof window.TTDUniversalPixelApi !== 'function') return;

        var universalPixelApi = new window.TTDUniversalPixelApi();
        universalPixelApi.init(adsrvrAdvertiserId, adsrvrPixelIds, 'https://insight.adsrvr.org/track/up');
      });
    });
  }

  window.silktideConsentManager.init({
    namespace: 'crazy-horse',
    eventName: 'stcm_consent_update',
    prompt: {
      position: 'bottomRight'
    },
    icon: {
      position: 'bottomLeft'
    },
    backdrop: {
      show: false
    },
    text: {
      prompt: {
        description: '<p>We use cookies and similar technologies to understand site usage and support advertising. You can accept all, reject non-essential cookies, or manage your preferences.</p>',
        acceptAllButtonText: 'Accept all',
        acceptAllButtonAccessibleLabel: 'Accept analytics and marketing cookies',
        rejectNonEssentialButtonText: 'Reject non-essential',
        rejectNonEssentialButtonAccessibleLabel: 'Reject analytics and marketing cookies',
        preferencesButtonText: 'Preferences',
        preferencesButtonAccessibleLabel: 'Manage cookie preferences'
      },
      preferences: {
        title: 'Cookie preferences',
        description: '<p>Choose which optional cookies and tracking technologies Crazy Horse Memorial may use.</p>',
        saveButtonText: 'Save preferences',
        saveButtonAccessibleLabel: 'Save cookie preferences',
        creditLinkText: 'Get this consent manager for free',
        creditLinkAccessibleLabel: 'Visit Silktide Consent Manager'
      }
    },
    consentTypes: [
      {
        id: 'essential',
        label: 'Essential',
        description: 'Required for the website to function. These cannot be switched off.',
        required: true
      },
      {
        id: 'analytics',
        label: 'Analytics',
        description: gpcEnabled ? 'Global Privacy Control is enabled in your browser, so analytics tracking is disabled.' : 'Google Analytics and Google Tag Manager help us understand how visitors use the website.',
        defaultValue: false,
        gtag: 'analytics_storage',
        onAccept: loadGoogleTracking
      },
      {
        id: 'marketing',
        label: 'Marketing',
        description: gpcEnabled ? 'Global Privacy Control is enabled in your browser, so marketing tracking and data sharing are disabled.' : 'The Trade Desk AdsRvr pixel supports advertising measurement and audience-related marketing.',
        defaultValue: false,
        gtag: ['ad_storage', 'ad_user_data', 'ad_personalization'],
        onAccept: loadAdsRvrTracking
      }
    ]
  });
})();
        `}
      </Script>
    </>
  );
}
