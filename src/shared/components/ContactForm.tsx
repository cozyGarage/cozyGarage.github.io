import React, { useState } from 'react';
import { personalInfo } from '../../data';
import { trackFormSubmission } from '../utils/analytics';
import './ContactForm.css';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    } else if (formData.subject.trim().length > 200) {
      newErrors.subject = 'Subject must be less than 200 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 5000) {
      newErrors.message = 'Message must be less than 5000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = React.useCallback((e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  }, [errors]);

  const handleSubmit = React.useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS configuration
      // To enable, install @emailjs/browser: npm install @emailjs/browser
      // Then uncomment and configure below:
      
      /*
      const emailjs = await import('@emailjs/browser');
      await emailjs.send(
        'YOUR_SERVICE_ID',     // Get from EmailJS dashboard
        'YOUR_TEMPLATE_ID',    // Get from EmailJS dashboard
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: personalInfo.email,
        },
        'YOUR_PUBLIC_KEY'      // Get from EmailJS dashboard
      );
      */

      // For now, simulate sending (remove this when EmailJS is configured)
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Track successful form submission
      trackFormSubmission('contact_form');
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');

      // Track failed form submission
      trackFormSubmission('contact_form', false);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  return (
    <div className="contact-form-container">
      <div className="contact-form-card">
        <h3 className="contact-form-title">Send me a message</h3>
        <p className="contact-form-subtitle">
          I&apos;d love to hear from you. Send me a message and I&apos;ll respond as soon as possible.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="Your full name"
                disabled={isSubmitting}
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="your.email@example.com"
                disabled={isSubmitting}
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject" className="form-label">Subject *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className={`form-input ${errors.subject ? 'error' : ''}`}
              placeholder="What&apos;s this about?"
              disabled={isSubmitting}
            />
            {errors.subject && <span className="form-error">{errors.subject}</span>}
          </div>

          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="message" className="form-label">Message *</label>
              <span className="char-count">
                {formData.message.length} / 5000
              </span>
            </div>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className={`form-textarea ${errors.message ? 'error' : ''}`}
              placeholder="Tell me about your project, idea, or just say hello..."
              rows={5}
              disabled={isSubmitting}
            />
            {errors.message && <span className="form-error">{errors.message}</span>}
          </div>

          <button
            type="submit"
            className="form-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {submitStatus === 'success' && (
            <div className="form-message success">
              <span className="message-icon">✅</span>
              <div>
                <strong>Message sent successfully!</strong>
                <p>I&apos;ll get back to you as soon as possible.</p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="form-message error">
              <span className="message-icon">❌</span>
              <div>
                <strong>Failed to send message</strong>
                <p>
                  Please try again or contact me directly at{' '}
                  <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                </p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};