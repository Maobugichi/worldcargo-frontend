import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function notifyVisit(details: {
  trackingNumber: string;
  referrer: string;
  userAgent: string;
  ip: string;
}) {
  try {
    await resend.emails.send({
      from: process.env.NOTIFY_FROM_EMAIL!,
      to: process.env.NOTIFY_TO_EMAIL!,
      subject: `Tracking number submitted: ${details.trackingNumber}`,
      text: [
        `Tracking number: ${details.trackingNumber}`,
        `Referrer: ${details.referrer}`,
        `User-Agent: ${details.userAgent}`,
        `IP: ${details.ip}`,
        `Time: ${new Date().toISOString()}`,
      ].join('\n'),
    });
  } catch (err) {
    console.error('Failed to send tracking submission notification', err);
  }
}