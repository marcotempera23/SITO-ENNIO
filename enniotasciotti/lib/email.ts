import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = 'noreply@enniotasciotti.com';
const NOTIFY_ADDRESS = 'ennio.tasciotti@sanraffaele.it';

interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
  locale: string;
}

export async function sendContactEmail(data: ContactEmailData) {
  const subjectLine =
    data.locale === 'it'
      ? `[Contatto] ${data.subject} — da ${data.name}`
      : `[Contact] ${data.subject} — from ${data.name}`;

  return resend.emails.send({
    from: FROM_ADDRESS,
    to: NOTIFY_ADDRESS,
    replyTo: data.email,
    subject: subjectLine,
    text: `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\n${data.message}`,
  });
}

interface NewsletterEmailData {
  email: string;
  locale: string;
}

export async function sendNewsletterWelcome(data: NewsletterEmailData) {
  const subject =
    data.locale === 'it'
      ? 'Benvenuto — Longevity Dispatch di Ennio Tasciotti'
      : 'Welcome — Longevity Dispatch by Ennio Tasciotti';

  return resend.emails.send({
    from: FROM_ADDRESS,
    to: data.email,
    subject,
    text:
      data.locale === 'it'
        ? 'Grazie per esserti iscritto alla newsletter. Riceverai presto aggiornamenti su longevità, nanomedicina e salute di precisione.'
        : 'Thank you for subscribing. You will soon receive updates on longevity, nanomedicine and precision health.',
  });
}
