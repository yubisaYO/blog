import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import multer from "multer";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.listen(9900, () => {
  console.log("Server berjalan di port 9900");
});

app.get("/test", (req, res) => {
  res.json("masuk db");
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
