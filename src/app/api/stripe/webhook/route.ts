import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Create transaction record
    await prisma.transaction.create({
      data: {
        stripePaymentId: session.payment_intent as string,
        subtotal: session.amount_subtotal! / 100,
        tax: (session.total_details?.amount_tax || 0) / 100,
        total: session.amount_total! / 100,
        status: "COMPLETED",
        paymentMethod: "CARD",
      },
    });
  }

  return NextResponse.json({ received: true });
}
