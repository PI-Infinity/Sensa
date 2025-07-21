// scripts/test-db.js
import "dotenv/config";
import { connectDB } from "../src/app/db";

(async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connection test passed");
    process.exit(0);
  } catch (err) {
    console.error("❌ MongoDB connection test failed:");
    process.exit(1);
  }
})();
