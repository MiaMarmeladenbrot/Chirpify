import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    isFollowerOf: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    profileImg: { type: String, default: "placeholder.jpg", trim: true },
    description: {
      type: String,
      default: "Hi, I'm using Chirpify",
      trim: true,
    },
    website: { type: String, trim: true },
    passwordHash: { type: String, required: true, trim: true },
    passwordSalt: { type: String, required: true, trim: true },
    isEmailVerified: { type: Boolean, default: false },
    sixDigitCode: { type: String, required: true },
  },
  { collection: "users", timestamps: true }
);

export const User = mongoose.model("User", userSchema);
