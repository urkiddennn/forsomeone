import mongoose from "mongoose"; // Fixed typo: 'mongose' -> 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Makes 'name' field required
    },
    post: {
      type: String,
      required: true, // Makes 'post' field required
    },
    avatar: {
      type: String,
      required: true, // Makes 'avatar' field required
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export default mongoose.model("User", userSchema);
