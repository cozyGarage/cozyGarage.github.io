/**
 * Analytics Configuration
 * Google Analytics 4 (GA4) tracking setup
 */

// GA4 Measurement ID - Replace with your actual GA4 measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 ID

// Analytics configuration
export const analyticsConfig = {
  measurementId: GA_MEASUREMENT_ID,
  enabled: process.env.NODE_ENV === 'production',
};

/**
 * Initialize Google Analytics
 * Call this function in your app entry point
 */
export const initAnalytics = () => {
  if (!analyticsConfig.enabled || typeof window === 'undefined') {
    return;
  }

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', analyticsConfig.measurementId, {
    // Additional configuration options
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_features: false,
  });
};

/**
 * Track page views
 * Call this when route changes
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (!analyticsConfig.enabled || !window.gtag) {
    return;
  }

  window.gtag('config', analyticsConfig.measurementId, {
    page_path: pagePath,
    page_title: pageTitle,
  });
};

/**
 * Track custom events
 */
export const trackEvent = (
  eventName: string,
  parameters: Record<string, any> = {}
) => {
  if (!analyticsConfig.enabled || !window.gtag) {
    return;
  }

  window.gtag('event', eventName, {
    ...parameters,
    // Add custom parameters here
    custom_parameter_1: 'value',
  });
};

/**
 * Track user interactions
 */
export const trackInteraction = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  trackEvent('interaction', {
    event_category: category,
    event_action: action,
    event_label: label,
    value: value,
  });
};

/**
 * Track form submissions
 */
export const trackFormSubmission = (formName: string, success: boolean = true) => {
  trackEvent('form_submission', {
    form_name: formName,
    success: success,
  });
};

/**
 * Track theme changes
 */
export const trackThemeChange = (theme: 'light' | 'dark') => {
  trackEvent('theme_change', {
    theme: theme,
  });
};

/**
 * Track game interactions (for Othello game)
 */
export const trackGameAction = (action: string, details?: Record<string, any>) => {
  trackEvent('game_action', {
    action: action,
    ...details,
  });
};

// Type declarations for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}