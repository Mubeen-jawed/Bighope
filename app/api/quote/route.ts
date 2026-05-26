import { NextResponse } from "next/server";
import { sendMail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const fd = await req.formData();

    const name = fd.get("name") as string;
    const email = fd.get("email") as string;
    const phone = fd.get("phone") as string;
    const role = fd.get("role") as string;
    const categories: string[] = JSON.parse(fd.get("categories") as string || "[]");
    const orderQuantity = fd.get("orderQuantity") as string;
    const teamName = fd.get("teamName") as string;
    const turnaround = fd.get("turnaround") as string;
    const primaryColor = fd.get("primaryColor") as string;
    const secondaryColor = fd.get("secondaryColor") as string;
    const customColors = fd.get("customColors") === "true";
    const playerNames = fd.get("playerNames") === "true";
    const playerNumbers = fd.get("playerNumbers") === "true";
    const query = fd.get("query") as string;
    const image = fd.get("image") as File | null;

    if (!name || !email || !categories?.length) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    const colorInfo = customColors
      ? "Custom colors (see message)"
      : [primaryColor, secondaryColor].filter(Boolean).join(" / ") || "Not specified";

    const extras = [
      playerNames && "Player Names",
      playerNumbers && "Player Numbers",
    ]
      .filter(Boolean)
      .join(", ") || "None";

    let attachments: { filename: string; content: Buffer; contentType: string }[] = [];
    let imageNote = "";

    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      attachments = [
        {
          filename: image.name,
          content: Buffer.from(bytes),
          contentType: image.type,
        },
      ];
      imageNote = `<tr><td style="padding:8px 0;color:#6b7280">Attachment</td><td style="padding:8px 0">${image.name} (${(image.size / 1024).toFixed(1)} KB)</td></tr>`;
    }

    // Email to the business
    await sendMail({
      to: process.env.RECEIVER_EMAIL!,
      subject: `New Quote Request — ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#1e3056;padding:24px 32px;border-radius:12px 12px 0 0">
            <h1 style="color:#fff;margin:0;font-size:22px">New Quote Request</h1>
          </div>
          <div style="background:#fff;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#6b7280;width:140px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#f97316">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#6b7280">Phone</td><td style="padding:8px 0">${phone || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280">Role</td><td style="padding:8px 0">${role || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280">Categories</td><td style="padding:8px 0">${categories.join(", ")}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280">Order Quantity</td><td style="padding:8px 0">${orderQuantity || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280">Team Name</td><td style="padding:8px 0">${teamName || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280">Turnaround Time</td><td style="padding:8px 0">${turnaround || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280">Colors</td><td style="padding:8px 0">${colorInfo}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280">Extras</td><td style="padding:8px 0">${extras}</td></tr>
              ${imageNote}
            </table>
            ${
              query
                ? `<hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />
                   <p style="color:#6b7280;margin:0 0 8px">Message:</p>
                   <p style="margin:0;white-space:pre-wrap">${query}</p>`
                : ""
            }
          </div>
        </div>
      `,
      attachments,
    });

    // Confirmation email to the user (no attachment)
    await sendMail({
      to: email,
      subject: "Your quote request is confirmed — Big Hope Sports",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#f97316;padding:24px 32px;border-radius:12px 12px 0 0">
            <h1 style="color:#fff;margin:0;font-size:22px">Thank You, ${name.split(" ")[0]}!</h1>
          </div>
          <div style="background:#fff;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
            <p style="color:#374151;line-height:1.7;margin:0 0 16px">
              We've received your quote request and our team will prepare a custom quote for you
              within <strong>one business day</strong>.
            </p>
            <p style="color:#374151;line-height:1.7;margin:0 0 16px">
              Here's what we received:
            </p>
            <div style="background:#f9fafb;border-radius:8px;padding:16px;margin-bottom:16px">
              <p style="margin:0 0 4px;color:#6b7280"><strong>Role:</strong> ${role || "Not specified"}</p>
              <p style="margin:0 0 4px;color:#6b7280"><strong>Categories:</strong> ${categories.join(", ")}</p>
              <p style="margin:0 0 4px;color:#6b7280"><strong>Quantity:</strong> ${orderQuantity || "Not specified"}</p>
              <p style="margin:0 0 4px;color:#6b7280"><strong>Team:</strong> ${teamName || "Not specified"}</p>
              <p style="margin:0 0 4px;color:#6b7280"><strong>Turnaround:</strong> ${turnaround || "Not specified"}</p>
              <p style="margin:0;color:#6b7280"><strong>Colors:</strong> ${colorInfo}</p>
            </div>
            <p style="color:#374151;line-height:1.7;margin:0 0 24px">
              If you have any urgent questions, feel free to call us at
              <a href="tel:+17473547351" style="color:#f97316;text-decoration:none">+1 (747) 354-7351</a>.
            </p>
            <p style="color:#9ca3af;font-size:13px;margin:0">
              — The Big Hope Sports Team
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quote form error:", error);
    return NextResponse.json(
      { error: "Failed to send request. Please try again." },
      { status: 500 },
    );
  }
}
