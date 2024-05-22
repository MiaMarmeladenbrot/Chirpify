import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./models/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes

try {
  await connectToDatabase();
  const PORT = process.env.PORT || 4004;
  app.listen(PORT, () => console.log("Server ready at Port", PORT));
} catch (err) {
  console.log(err);
  process.exit(1);
}
