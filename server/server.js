import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import users from "./models/Users.js";

dotenv.config();

if (!process.env.MONGO_URI || !process.env.PORT) {
  throw new Error("MONGO_URI and PORT environment variables are required");
}

const app = express();
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.use(express.json({ limit: "5mb" }));
// app.use((_, __, next) => {
//   console.log(`Request received: ${_.method} ${_.url}`);
//   next();
// });

app.get("/api/health", (_, res) => {
  res.status(200).json({ success: true, message: "Server is healthy" });
});

app.post("/api/user", async (req, res) => {
  try {
    const user = new users(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
