import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cors());

// DB CONNECT
mongoose
  .connect("mongodb://mongo:27017/postsdb")
  .then(() => console.log("Post DB connected"))
  .catch(console.error);

// POST MODEL
const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  userId: String
});
const Post = mongoose.model("Post", postSchema);

// AUTH MIDDLEWARE
function auth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, "secret123");
    req.userId = data.id;
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
}

// CREATE POST
app.post("/", auth, async (req, res) => {
  const post = await Post.create({
    ...req.body,
    userId: req.userId
  });
  res.json(post);
});

// GET ALL POSTS
app.get("/", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.listen(5000, () => console.log("Post service running on 5000"));
