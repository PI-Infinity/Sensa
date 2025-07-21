import { Feedback } from "@/app/models/feedbackModel";
import { User } from "@/app/models/userModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const filter = searchParams.get("filter") || "all";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "15");
    const skip = (page - 1) * limit;

    if (!userId) {
      return NextResponse.json(
        { error: "Invalid or missing userId" },
        { status: 400 }
      );
    }

    const now = new Date();
    const today = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    );
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const last30Days = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    // ფილტრის პირობა
    const baseMatch: any = { userId: userId };
    if (filter === "stars") baseMatch.stars = { $type: ["int", "double"] };
    else if (filter === "comment")
      baseMatch.comment = { $exists: true, $ne: "" };
    else if (filter === "emojy") baseMatch.emojy = { $exists: true, $ne: "" };
    else if (filter === "today")
      baseMatch.createdAt = { $gte: today, $lt: tomorrow };

    // ფიდბექების სიის წამოღება
    const feedbacks = await Feedback.find(baseMatch)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // სტატისტიკა ერთდროულად aggregation-ით
    const [stats] = await Feedback.aggregate([
      { $match: { userId: userId } },
      {
        $facet: {
          all: [{ $match: { userId: userId } }, { $count: "total" }],
          unread: [
            {
              $match: {
                userId: userId,
                status: "unread",
              },
            },
            { $count: "count" },
          ],
          today: [
            {
              $match: {
                userId: userId,
                createdAt: { $gte: today, $lt: tomorrow },
              },
            },
            { $count: "count" },
          ],
          lastMonth: [
            {
              $match: {
                userId: userId,
                createdAt: { $gte: last30Days },
              },
            },
            { $count: "count" },
          ],
          comment: [
            {
              $match: {
                userId: userId,
                comment: { $exists: true, $ne: "" },
              },
            },
            { $count: "count" },
          ],
          emojy: [
            {
              $match: {
                userId: userId,
                emojy: { $exists: true, $ne: "" },
              },
            },
            { $count: "count" },
          ],
          stars: [
            {
              $match: {
                userId: userId,
                stars: { $type: ["int", "double"] },
              },
            },
            {
              $group: {
                _id: null,
                avg: { $avg: "$stars" },
                count: { $sum: 1 },
              },
            },
          ],
          emojiBreakdown: [
            {
              $match: {
                userId: userId,
                emojy: { $exists: true, $ne: "" },
              },
            },
            {
              $group: {
                _id: "$emojy",
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                emojy: "$_id",
                count: 1,
                _id: 0,
              },
            },
          ],
        },
      },
    ]);
    const filteredCount = await Feedback.countDocuments(baseMatch);
    return NextResponse.json({
      status: "success",
      feedbacks,
      totalFeedbacks: stats.all[0]?.total || 0,
      filteredCount: filteredCount,
      unreadCount: stats.unread[0]?.count || 0,
      todayCount: stats.today[0]?.count || 0,
      lastMonthCount: stats.lastMonth[0]?.count || 0,
      emojiCount: stats.emojy[0]?.count || 0,
      commentCount: stats.comment[0]?.count || 0,
      starsCount: stats.stars[0]?.count || 0,
      starsAvg: stats.stars[0]?.avg || 0,
      emojiBreakdown: stats.emojiBreakdown || [],
    });
  } catch (error) {
    console.error("❌ Error fetching feedbacks:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const { userId, stars, emojy, comment, createdAt } = data;

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // ვალიდური ველები თუ გაქვს
    const feedbackData: any = {
      userId,
      status: "unread",
      createdAt: createdAt ? new Date(createdAt) : new Date(),
    };

    if (stars !== undefined) feedbackData.stars = stars;
    if (emojy !== undefined) feedbackData.emojy = emojy;
    if (comment !== undefined && comment.trim() !== "")
      feedbackData.comment = comment.trim();
    await Feedback.create(feedbackData);

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("❌ Error adding feedback:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { userId, feedbackId } = await req.json();

    if (!userId || !feedbackId) {
      return NextResponse.json(
        { error: "Missing userId or feedbackId" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(feedbackId)) {
      return NextResponse.json(
        { error: "Invalid feedbackId" },
        { status: 400 }
      );
    }

    const updated = await Feedback.findOneAndUpdate(
      {
        _id: feedbackId,
        userId: userId,
      },
      {
        $set: { status: "read" },
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Feedback not found or already read" },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("❌ Error updating feedback status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId, feedbackId } = await req.json();

    if (!userId || !feedbackId) {
      return NextResponse.json(
        { error: "Missing userId or feedbackId" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(feedbackId)) {
      return NextResponse.json(
        { error: "Invalid feedbackId" },
        { status: 400 }
      );
    }

    const deleted = await Feedback.findOneAndDelete({
      _id: feedbackId,
      userId: userId,
    });

    if (!deleted) {
      return NextResponse.json(
        { error: "Feedback not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("❌ Error deleting feedback:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
