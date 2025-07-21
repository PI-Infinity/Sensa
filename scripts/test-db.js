// scripts/test-db.js
const { connectDB } = require("../lib/mongodb");

(async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connection test passed");
    process.exit(0);
  } catch (err) {
    console.error("❌ MongoDB connection test failed:", err.message);
    process.exit(1);
  }
})();
