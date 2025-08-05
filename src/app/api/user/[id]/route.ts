import { NextRequest, NextResponse } from "next/server";
import { User } from "@/app/models/userModel";
import mongoose from "mongoose";
import { connectDB } from "@/app/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
    }
    await connectDB();
    const user = await User.findOne({ _id: userId }).lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { feedbacks, ...safeUser }: any = user;

    return NextResponse.json(safeUser);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
