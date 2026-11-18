import { useState } from 'react';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import Alert from '../../components/ui/Alert.jsx';
import { submitContactMessage } from '../../services/contactService.js';
import { hasErrors, validateContactForm } from '../../utils/validation.js';

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };

export default function ContactPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateContactForm(form);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) {
      setStatus({ type: 'error', message: 'Please correct the highlighted fields and try again.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });
    try {
      await submitContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      setForm(EMPTY_FORM);
      setStatus({ type: 'success', message: 'Thank you. Your message has been sent and we will be in touch soon.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="bg-neutral-50 py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-700">Contact us</p>
          <h1 className="mt-3 text-4xl font-bold">We would love to hear from you</h1>
          <p className="mt-4 leading-relaxed text-neutral-600">
            Questions about creator profiles, brand registration or the platform? Send us a message and our team
            will reply as soon as possible.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-3">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <Alert tone={status.type === 'success' ? 'success' : 'error'}>
              {status.type !== 'idle' ? status.message : null}
            </Alert>

            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                id="contact-name"
                name="name"
                label="Full name"
                required
                autoComplete="name"
                value={form.name}
                onChange={updateField}
                error={errors.name}
              />
              <Input
                id="contact-email"
                name="email"
                type="email"
                label="Email address"
                required
                autoComplete="email"
                value={form.email}
                onChange={updateField}
                error={errors.email}
              />
            </div>
            <Input
              id="contact-subject"
              name="subject"
              label="Subject"
              required
              value={form.subject}
              onChange={updateField}
              error={errors.subject}
            />
            <div>
              <label htmlFor="contact-message" className="mb-2 flex items-center gap-1 text-sm font-medium text-neutral-800">
                Message <span className="text-error-600" aria-hidden="true">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                required
                value={form.message}
                onChange={updateField}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                className={`w-full rounded-lg border bg-white px-3.5 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 ${
                  errors.message ? 'border-error-500' : 'border-neutral-300 hover:border-neutral-400'
                }`}
              />
              {errors.message && (
                <p id="contact-message-error" className="mt-2 text-sm text-error-600">
                  {errors.message}
                </p>
              )}
            </div>

            <Button type="submit" size="lg" fullWidth isLoading={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send message'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
