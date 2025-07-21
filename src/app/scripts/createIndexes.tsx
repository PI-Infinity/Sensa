const { Feedback } = require("../models/feedbackModel");

export const createIndexes = async () => {
  try {
    await Feedback.collection.createIndex({ userId: 1 }, { background: true });
    await Feedback.collection.createIndex(
      { userId: 1, status: 1 },
      { background: true }
    );
    await Feedback.collection.createIndex(
      { userId: 1, createdAt: -1 },
      { background: true }
    );
    await Feedback.collection.createIndex(
      { userId: 1, emojy: 1 },
      { background: true }
    );
    await Feedback.collection.createIndex(
      { userId: 1, comment: 1 },
      { background: true }
    );
    await Feedback.collection.createIndex(
      { userId: 1, stars: 1 },
      { background: true }
    );

    console.log("✅ Feedback indexes created successfully.");
  } catch (error: any) {
    console.error("❌ Error creating Feedback indexes:", error.message);
  }
};
