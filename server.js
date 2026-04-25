const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// ── GET /api/users ── List all registered users (already complete)
app.get("/api/users/", async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, username: true, password: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(users);
});

app.get("/api/users/:username", async (req, res) => {
  const { username } = req.params;
  const user = await prisma.user.findUnique({
    where: { username: username },
    select: { id: true, username: true, password: true, createdAt: true, recentFiles: true },
  });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

// -- GET/api/files/preview/:fileID -- Get a specific file's data necessary to display on preview
app.get("/api/files/preview/:fileID", async(req,res) => {
  const fileID = parseInt(req.params.fileID);
  console.log(fileID);
  const file = await prisma.file.findUnique({
    where: { id: fileID },
    select: { title: true }
  });
  if (!file) {
    return res.status(404).json({ error: "File not found" });
  }
  res.json(file);
})

// -- GET/api/setting -- List all registered post
app.get("/api/setting", async(req,res) => {
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