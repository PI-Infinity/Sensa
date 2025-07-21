import mongoose, { Schema, Document } from "mongoose";

const FeedbackSchema = new Schema(
  {
    userId: { type: String },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, enum: ["read", "unread"], default: "unread" },
    stars: { type: Number },
    emojy: { type: String },
    comment: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Feedback =
  mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);
