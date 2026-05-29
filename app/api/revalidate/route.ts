import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Called by a Sanity webhook whenever content is published/changed, so the
 * live site reflects edits within seconds (no manual rebuild).
 *
 * Configure the webhook in Sanity → API → Webhooks:
 *   URL:        https://<your-site>/api/revalidate
 *   Trigger on: Create, Update, Delete
 *   Secret:     same value as SANITY_REVALIDATE_SECRET
 *   Projection: {"_type": _type}
 *
 * This is a small content site, so we revalidate the whole app (every route
 * under the root layout) on any change. As a safety net, pages also use a
 * 60s ISR window (see sanityFetch), so content stays fresh even if the
 * webhook is ever missed.
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      type: body?._type ?? null,
      now: Date.now(),
    });
  } catch (err) {
    console.error("Revalidation error:", err);
    return new NextResponse("Error revalidating", { status: 500 });
  }
}
