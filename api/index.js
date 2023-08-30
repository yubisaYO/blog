import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.listen(9900, () => {
  console.log("Server berjalan di port 9900");
});

app.get("/test", (req, res) => {
  res.json("masuk db");
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
