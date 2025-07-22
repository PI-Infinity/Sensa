import { connectDB } from "../../db";
import { Feedback } from "@/app/models/feedbackModel";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { User } = await import("@/app/models/userModel");
    const user: any = await User.findOne({ clerkId: userId }).lean();

    const unreadCount = await Feedback.countDocuments({
      userId: user._id.toString(),
      status: "unread",
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ ...user, unreadFeedbacksCount: unreadCount });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();

    // გადავაკვანძოთ საჭირო ველები
    const mapped = {
      businessTitle: body.businessTitle,
      businessSlogan: body.businessSlogan,
      feedbackTypes: body.feedbackTypes,
      colors: body.colors,
      logo: body.logo,
    };
    const { User } = await import("@/app/models/userModel");
    await User.updateOne({ clerkId: userId }, mapped);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ PATCH error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
