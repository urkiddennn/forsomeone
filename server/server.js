import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Users from "./models/Users.js";

dotenv.config();

if (!process.env.MONGO_URI || !process.env.PORT) {
  throw new Error("MONGO_URI and PORT environment variables are required");
}

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.get("/api/health", (_, res) => {
  res.status(200).json({ success: true, message: "Server is healthy" });
});
app.post("/api/post", async (req, res) => {
    try {
      const { name, message } = req.body;
      const randomSeed = Math.random().toString(36).substring(2, 15);
      const avatarUrl = `https://api.dicebear.com/8.x/avataaars/svg?seed=${randomSeed}`;
      const post = new Users({
        name,
        post: message,
        avatar: avatarUrl,
      });
      await post.save();
      res.status(201).json(post);
    } catch (err) {
      res.status(400).json({ error: err.message }); // Will include validation errors
    }
  });

app.get("/api/user", async (req, res) => {
  try {
    const allUsers = await Users.find();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//delete dont have any data
app.delete("/api/delete-empty", async (req, res) => {
    try {
      // Find and delete documents where name and post are empty or null
      const result = await Users.deleteMany({
        $or: [
          { name: { $in: ["", null] }, post: { $in: ["", null] } },
        ],
      });

      if (result.deletedCount === 0) {
        return res.status(200).json({ message: "No empty messages found to delete" });
      }

      res.status(200).json({
        message: `Successfully deleted ${result.deletedCount} empty message(s)`,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
