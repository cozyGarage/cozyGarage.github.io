import React, { useState } from 'react';
import './NewsletterForm.css';

interface NewsletterState {
  email: string;
  status: 'idle' | 'submitting' | 'success' | 'error';
  errorMessage: string;
}

/**
 * NewsletterForm
 * Collects email subscriptions. Wire up `handleSubscribe` to your
 * preferred email-marketing provider (Mailchimp, ConvertKit, Buttondown, etc.).
 */
export const NewsletterForm: React.FC = () => {
  const [state, setState] = useState<NewsletterState>({
    email: '',
    status: 'idle',
    errorMessage: '',
  });

  const validateEmail = (email: string): string => {
    if (!email.trim()) return 'Email address is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return 'Please enter a valid email address.';
    return '';
  };

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const validationError = validateEmail(state.email);
      if (validationError) {
        setState(prev => ({ ...prev, errorMessage: validationError }));
        return;
      }

      setState(prev => ({ ...prev, status: 'submitting', errorMessage: '' }));

      try {
        /*
         * ── Connect your newsletter provider here ──────────────────────────
         * Mailchimp example (via serverless function):
         *   await fetch('/api/subscribe', {
         *     method: 'POST',
         *     headers: { 'Content-Type': 'application/json' },
         *     body: JSON.stringify({ email: state.email }),
         *   });
         *
         * Buttondown example:
         *   await fetch('https://api.buttondown.email/v1/subscribers', {
         *     method: 'POST',
         *     headers: {
         *       Authorization: `Token YOUR_BUTTONDOWN_API_KEY`,
         *       'Content-Type': 'application/json',
         *     },
         *     body: JSON.stringify({ email_address: state.email }),
         *   });
         * ───────────────────────────────────────────────────────────────────
         */

        // Simulate API call until a real provider is connected
        await new Promise(resolve => setTimeout(resolve, 1200));

        setState({ email: '', status: 'success', errorMessage: '' });
      } catch {
        setState(prev => ({
          ...prev,
          status: 'error',
          errorMessage: 'Something went wrong. Please try again.',
        }));
      }
    },
    [state.email]
  );

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setState(prev => ({ ...prev, email: e.target.value, errorMessage: '' }));
    },
    []
  );

  return (
    <div className="newsletter-wrapper">
      <div className="newsletter-card">
        <div className="newsletter-icon" aria-hidden="true">✉️</div>
        <h3 className="newsletter-title">Stay in the loop</h3>
        <p className="newsletter-subtitle">
          Get notified about new blog posts, projects, and the occasional useful tip — no spam, ever.
        </p>

        {state.status === 'success' ? (
          <div className="newsletter-success" role="status">
            <span className="success-icon" aria-hidden="true">🎉</span>
            <strong>You&apos;re subscribed!</strong>
            <p>Thanks for joining — I&apos;ll be in touch soon.</p>
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
            <div className="newsletter-input-row">
              <input
                type="email"
                className={`newsletter-input ${state.errorMessage ? 'error' : ''}`}
                placeholder="you@example.com"
                value={state.email}
                onChange={handleChange}
                disabled={state.status === 'submitting'}
                aria-label="Email address for newsletter"
                aria-describedby={state.errorMessage ? 'newsletter-error' : undefined}
              />
              <button
                type="submit"
                className="newsletter-btn"
                disabled={state.status === 'submitting'}
              >
                {state.status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
              </button>
            </div>

            {state.errorMessage && (
              <p id="newsletter-error" className="newsletter-error" role="alert">
                {state.errorMessage}
              </p>
            )}

            {state.status === 'error' && !state.errorMessage && (
              <p className="newsletter-error" role="alert">
                Something went wrong. Please try again later.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
