# EmailJS Setup Guide

This guide will help you set up EmailJS to enable the contact form on your portfolio website.

## Prerequisites

- A Gmail account (or any email service)
- EmailJS account (free tier available)

## Step 1: Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended for personal use)
4. Follow the setup instructions:
   - For Gmail: Allow EmailJS to send emails on your behalf
   - Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create an Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Contact Form Message: {{subject}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}

---
Sent via Portfolio Contact Form
```

4. In the template settings:
   - **Template Name**: Contact Form
   - **Template ID**: Note this down (e.g., `template_xyz789`)
   - **To Email**: Your email ({{to_email}})
   - **From Name**: {{from_name}}
   - **Reply To**: {{from_email}}

5. Click **Save**

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `a1b2c3d4e5f6g7h8`)
3. Keep this key safe

## Step 5: Install EmailJS Package

Run this command in your project directory:

```bash
bun add @emailjs/browser
# or
npm install @emailjs/browser
```

## Step 6: Configure Contact Form

1. Open `src/shared/components/ContactForm.tsx`
2. Find the EmailJS configuration section (around line 90)
3. Replace the placeholders:

```typescript
const emailjs = await import('@emailjs/browser');
await emailjs.send(
  'YOUR_SERVICE_ID',     // Replace with your Service ID
  'YOUR_TEMPLATE_ID',    // Replace with your Template ID
  {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message,
    to_email: personalInfo.email,
  },
  'YOUR_PUBLIC_KEY'      // Replace with your Public Key
);
```

4. Remove the simulation code (the `await new Promise...` line)

## Step 7: Test Your Form

1. Run your development server: `bun run dev`
2. Navigate to your contact form
3. Fill out and submit a test message
4. Check your email inbox for the message
5. Check EmailJS dashboard for delivery logs

## Security Best Practices

### Environment Variables (Recommended)

Instead of hardcoding your keys, use environment variables:

1. Create `.env.local` file:

```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=a1b2c3d4e5f6g7h8
```

2. Update ContactForm.tsx:

```typescript
const emailjs = await import('@emailjs/browser');
await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message,
    to_email: personalInfo.email,
  },
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
);
```

3. Add `.env.local` to `.gitignore` (should already be there)

### GitHub Deployment

For GitHub Pages deployment, you'll need to add these as repository secrets:

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Add these secrets:
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`
   - `EMAILJS_PUBLIC_KEY`

4. Update your build workflow to inject these variables

## Troubleshooting

### Form Not Sending

- Check browser console for errors
- Verify all IDs and keys are correct
- Check EmailJS dashboard for error logs
- Ensure email service is connected and active

### Emails Going to Spam

- Add your EmailJS sending domain to your email whitelist
- Ask recipients to add you to contacts
- Use a verified email service (like Gmail)

### Rate Limiting

Free EmailJS accounts have limits:
- 200 emails per month
- 10 emails per hour

Consider upgrading if you need more.

## Alternative: Direct Backend Integration

If you prefer more control, consider setting up your own backend:

1. Create a serverless function (Netlify/Vercel)
2. Use Nodemailer or similar library
3. Set up proper email authentication (SPF, DKIM)

## Support

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com
- GitHub Issues: Open an issue on your repository

## Current Status

✅ Contact form UI implemented
✅ Form validation added
✅ Analytics tracking configured
⏳ EmailJS integration ready (needs configuration)

Follow the steps above to complete the email functionality!
