import React, { useEffect, useRef } from 'react';
import './book.css';

/**
 * SCHEDULING_URL
 * Replace with your own Calendly (or Cal.com) scheduling link.
 * e.g. "https://calendly.com/your-name/30min" or "https://cal.com/your-name/30min"
 */
const SCHEDULING_URL = 'https://calendly.com/YOUR_USERNAME/30min';

/** Minimal type for the Calendly global injected by their widget script */
interface CalendlyGlobal {
  initInlineWidget: (options: {
    url: string;
    parentElement: HTMLElement;
    prefill?: Record<string, unknown>;
    utm?: Record<string, unknown>;
  }) => void;
}

/** Safely access the Calendly global — returns undefined before the script loads */
const getCalendly = (): CalendlyGlobal | undefined =>
  (window as unknown as { Calendly?: CalendlyGlobal }).Calendly;

interface CalendlyWidgetProps {
  url: string;
}

/**
 * CalendlyWidget
 * Loads the Calendly inline-embed script on mount and renders the
 * scheduling widget inside the page.
 */
const CalendlyWidget: React.FC<CalendlyWidgetProps> = ({ url }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initWidget = () => {
      const calendly = getCalendly();
      if (containerRef.current && calendly) {
        calendly.initInlineWidget({
          url,
          parentElement: containerRef.current,
          prefill: {},
          utm: {},
        });
      }
    };

    // Inject Calendly stylesheet
    const linkId = 'calendly-css';
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(link);
    }

    // Inject Calendly script
    const scriptId = 'calendly-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = initWidget;
      document.head.appendChild(script);
    } else {
      // Script already loaded — init widget directly
      initWidget();
    }
  }, [url]);

  return <div ref={containerRef} className="calendly-inline-container" />;
};

/**
 * BookCallSection
 * Can be used as a standalone section in any page or as a full page via /book.
 */
export const BookCallSection: React.FC = () => {
  const isPlaceholder = SCHEDULING_URL.includes('YOUR_USERNAME');

  return (
    <section className="book-call-section" id="book" aria-labelledby="book-title">
      <div className="container">
        <header className="book-header">
          <h2 id="book-title" className="section-title">Book a Call</h2>
          <p className="book-subtitle">
            Have a project in mind, want to collaborate, or just want to chat?
            Pick a time that works for you — I&apos;d love to connect.
          </p>
        </header>

        <div className="book-content">
          <div className="book-info">
            <ul className="book-features">
              <li>
                <span className="feature-icon" aria-hidden="true">⏱️</span>
                <div>
                  <strong>30-minute intro call</strong>
                  <p>Learn about your project goals and how I can help.</p>
                </div>
              </li>
              <li>
                <span className="feature-icon" aria-hidden="true">💻</span>
                <div>
                  <strong>Video or audio</strong>
                  <p>We can meet via Google Meet, Zoom, or your preferred platform.</p>
                </div>
              </li>
              <li>
                <span className="feature-icon" aria-hidden="true">📅</span>
                <div>
                  <strong>Flexible scheduling</strong>
                  <p>Choose a slot that fits your timezone from the calendar.</p>
                </div>
              </li>
            </ul>

            {isPlaceholder && (
              <div className="book-placeholder-notice" role="note">
                <strong>👋 Setup needed:</strong> Replace{' '}
                <code>SCHEDULING_URL</code> in{' '}
                <code>src/features/book/BookPage.tsx</code> with your own
                Calendly (or Cal.com) scheduling link.
              </div>
            )}
          </div>

          <div className="book-calendar">
            {isPlaceholder ? (
              <div className="calendar-placeholder">
                <div className="calendar-placeholder-inner">
                  <span className="calendar-placeholder-icon" aria-hidden="true">📅</span>
                  <h3>Calendar goes here</h3>
                  <p>
                    Connect your{' '}
                    <a
                      href="https://calendly.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Calendly
                    </a>{' '}
                    or{' '}
                    <a
                      href="https://cal.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Cal.com
                    </a>{' '}
                    account and update the URL in{' '}
                    <code>BookPage.tsx</code>.
                  </p>
                  <a
                    href="https://calendly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Create a Calendly account →
                  </a>
                </div>
              </div>
            ) : (
              <CalendlyWidget url={SCHEDULING_URL} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * BookPage — full standalone page at /book
 */
export const BookPage: React.FC = () => (
  <main className="book-page">
    <BookCallSection />
  </main>
);
