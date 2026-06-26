import nodemailer from "nodemailer";

const port = Number(process.env.SMTP_PORT);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  // 465 = implicit TLS; 587/25 = STARTTLS (secure must be false).
  secure: port === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // Fail fast on serverless instead of hanging until the function times out.
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 15_000,
});

export async function sendMail({
  to,
  subject,
  html,
  attachments,
}: {
  to: string;
  subject: string;
  html: string;
  attachments?: { filename: string; content: Buffer; contentType: string }[];
}) {
  return transporter.sendMail({
    from: `"Big Hope Sports" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    attachments,
  });
}
