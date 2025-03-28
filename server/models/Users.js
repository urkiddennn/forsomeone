import mongose from "mongoose";

const userSchema = new mongose.Schema(
  {
    name: String,
    post: String,
    avatar: String
  },
  {
    timestamps: true,
  },
);

export default mongose.model("User", userSchema);
