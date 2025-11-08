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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: any) => {
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS configuration - you'll need to set up your own service
      // For now, we'll simulate sending an email
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      // In a real implementation, you would use:
      // await emailjs.send(
      //   'YOUR_SERVICE_ID',
      //   'YOUR_TEMPLATE_ID',
      //   {
      //     from_name: formData.name,
      //     from_email: formData.email,
      //     subject: formData.subject,
      //     message: formData.message,
      //     to_email: personalInfo.email,
      //   },
      //   'YOUR_PUBLIC_KEY'
      // );

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
  };

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
            <label htmlFor="message" className="form-label">Message *</label>
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
            <div className="form-success">
              ✅ Message sent successfully! I&apos;ll get back to you soon.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="form-error">
              ❌ Failed to send message. Please try again or contact me directly at{' '}
              <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};