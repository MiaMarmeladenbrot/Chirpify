import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./models/index.js";
import { UserRouter } from "./routers/UserRouter.js";
import { TweetRouter } from "./routers/TweetRouter.js";
import { CommentRouter } from "./routers/CommentRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/tweets", TweetRouter);
app.use("/api/v1/comments", CommentRouter);

try {
  await connectToDatabase();
  const PORT = process.env.PORT || 4004;
  app.listen(PORT, () => console.log("Server ready at Port", PORT));
} catch (err) {
  console.log(err);
  process.exit(1);
}
