// app/api/webhooks/clerk/route.ts

import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextResponse } from "next/server";
import { User } from "@/app/models/userModel";

export async function POST(req: any) {
  try {
    const evt = await verifyWebhook(req);

    if (evt.type === "user.created") {
      const { id, email_addresses, image_url, first_name, last_name } =
        evt.data;

      await User.create({
        clerkId: id,
        email: email_addresses?.[0]?.email_address,
        name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
        imageUrl: image_url,
      });

      console.log("✅ User created in MongoDB");
    } else if (evt.type === "user.updated") {
      const { id, email_addresses, image_url, first_name, last_name } =
        evt.data;

      await User.updateOne(
        { clerkId: id },
        {
          email: email_addresses?.[0]?.email_address,
          name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
          imageUrl: image_url,
        }
      );

      console.log("🔄 User updated in MongoDB");
    } else if (evt.type === "user.deleted") {
      const { id } = evt.data;

      await User.findOneAndDelete({ clerkId: id });

      console.log("❌ User deleted from MongoDB");
    } else {
      console.log("🔁 Ignored event type:", evt.type);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("🔴 Webhook verification failed:", err);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
