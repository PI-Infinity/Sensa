import mongoose, { Schema, Document } from "mongoose";

const userSchema = new Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, default: "" },
    businessTitle: { type: String, default: "" },
    businessSlogan: { type: String, default: "" },
    feedbackTypes: {
      type: [String],
      default: ["emojy", "stars", "comment"],
    },
    colors: {
      background: { type: String, default: "#ffffff" },
      primary: { type: String, default: "#000000" },
      text: { type: String, default: "#000000" },
    },
    logo: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
