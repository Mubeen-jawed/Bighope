import { NextResponse } from "next/server";
import { sendMail } from "@/lib/email";

// nodemailer needs the Node.js runtime (it won't run on Edge), and the two
// Gmail SMTP sends can exceed Vercel's default 10s function timeout on a cold
// start — give them room.
export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const fd = await req.formData();

    const firstName = fd.get("firstName") as string;
    const lastName = fd.get("lastName") as string;
    const email = fd.get("email") as string;
    const phone = fd.get("phone") as string;
    const role = fd.get("role") as string;
    const sport = fd.get("sport") as string;
    const quantity = fd.get("quantity") as string;
    const turnaround = fd.get("turnaround") as string;
    const message = fd.get("message") as string;
    const image = fd.get("image") as File | null;

    if (!firstName || !lastName || !email || !role || !sport || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    const fmt = (v: string) => (v && v.trim() ? v : "Not provided");

    let attachments: {
      filename: string;
      content: Buffer;
      contentType: string;
    }[] = [];
    let imageNote = "No image attached";

    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      attachments = [
        {
          filename: image.name,
          content: Buffer.from(bytes),
          contentType: image.type,
        },
      ];
      imageNote = `${image.name} (${(image.size / 1024).toFixed(1)} KB) — attached`;
    }

    // Full detail rows reused in both the business and confirmation emails so
    // every submitted field is shown to both the team and the customer.
    const detailRows = `
      <tr><td style="padding:8px 0;color:#6b7280;width:150px">Name</td><td style="padding:8px 0;font-weight:600">${firstName} ${lastName}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#f97316">${email}</a></td></tr>
      <tr><td style="padding:8px 0;color:#6b7280">Phone</td><td style="padding:8px 0">${fmt(phone)}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280">Role</td><td style="padding:8px 0">${fmt(role)}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280">Sport / Product</td><td style="padding:8px 0">${fmt(sport)}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280">Quantity</td><td style="padding:8px 0">${fmt(quantity)}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280">Turnaround Time</td><td style="padding:8px 0">${fmt(turnaround)}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280">Image</td><td style="padding:8px 0">${imageNote}</td></tr>
    `;

    const messageBlock = `
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />
      <p style="color:#6b7280;margin:0 0 8px">Message:</p>
      <p style="margin:0;white-space:pre-wrap;color:#374151">${message}</p>
    `;

    // Email to the business (the lead — must succeed)
    const businessEmail = sendMail({
      to: process.env.RECEIVER_EMAIL!,
      subject: `New Contact Request, ${firstName} ${lastName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#1e3056;padding:24px 32px;border-radius:12px 12px 0 0">
            <h1 style="color:#fff;margin:0;font-size:22px">New Contact Request</h1>
          </div>
          <div style="background:#fff;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
            <table style="width:100%;border-collapse:collapse">
              ${detailRows}
            </table>
            ${messageBlock}
          </div>
        </div>
      `,
      attachments,
    });

    // Confirmation email to the user — now shows every detail they submitted,
    // and re-attaches their uploaded image so they have a copy on record.
    const confirmationEmail = sendMail({
      to: email,
      subject: "We received your message, Big Hope Sports",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#f97316;padding:24px 32px;border-radius:12px 12px 0 0">
            <h1 style="color:#fff;margin:0;font-size:22px">Thank You, ${firstName}!</h1>
          </div>
          <div style="background:#fff;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
            <p style="color:#374151;line-height:1.7;margin:0 0 16px">
              We've received your message and our team will get back to you within
              <strong>one business day</strong>.
            </p>
            <p style="color:#374151;line-height:1.7;margin:0 0 16px">
              Here's a summary of what you sent us:
            </p>
            <div style="background:#f9fafb;border-radius:8px;padding:16px 20px;margin-bottom:16px">
              <table style="width:100%;border-collapse:collapse;font-size:14px">
                ${detailRows}
              </table>
            </div>
            ${messageBlock}
            <p style="color:#374151;line-height:1.7;margin:24px 0 0">
              If you have any urgent questions, feel free to call us at
              <a href="tel:+17473547351" style="color:#f97316;text-decoration:none">+1 (747) 354-7351</a>.
            </p>
            <p style="color:#9ca3af;font-size:13px;margin:8px 0 0">
              — The Big Hope Sports Team
            </p>
          </div>
        </div>
      `,
      attachments,
    });

    // Send both concurrently. The lead email must succeed; a failed user
    // confirmation is logged but does not fail the submission.
    const [business, confirmation] = await Promise.allSettled([
      businessEmail,
      confirmationEmail,
    ]);
    if (business.status === "rejected") throw business.reason;
    if (confirmation.status === "rejected") {
      console.error("Confirmation email failed:", confirmation.reason);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
