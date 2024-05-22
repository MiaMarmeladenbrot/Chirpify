import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export function connectToDatabase() {
  return mongoose.connect(process.env.MONGO_URL, { dbName: "Chirpify" });
}
