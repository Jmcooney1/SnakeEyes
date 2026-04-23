const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// ── GET /api/users ── List all registered users (already complete)
app.get("/api/users", async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, username: true, password: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(users);
});

// -- GET/api/posts -- List all registered post
app.get("api/posts", async(req,res) => {
  const posts = await prisma.post.findMany({
    select: { id:true, title:true, publishDate: true, creatorUsername: true},
    orderBy: { createdAt: "desc"}
  });
  res.json(posts);
})

// -- GET/api/setting -- List all registered post
app.get("api/setting", async(req,res) => {
  const settings = await prisma.setting.findMany({
    select: { id:true, user:true, post:true},
    orderBy: { createdAt: "desc"}
  });
  res.json(settings);
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
