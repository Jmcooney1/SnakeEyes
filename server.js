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
app.get("/api/posts", async(req,res) => {
  const posts = await prisma.post.findMany({
    select: { id:true, title:true, publishDate: true, creatorUsername: true},
    orderBy: { createdAt: "desc"}
  });
  res.json(posts);
})

// -- GET/api/setting -- List all registered post
app.get("/api/user-settings/:ownerID", async (req, res) =>{
  const ownerID = Number(req.params.ownerID);
  if(!Number.isFinite(ownerID)) return res.status(400).json({error: "Invalid ownerID" });

  const settings = await prisma.userSetting.findUnique({where: { ownerID }});
  res.json(settings);
});

app.put("/api/user-settings/:ownerID", async (req, res) =>{
  const ownerID = Number(req.params.ownerID);
  if(!Number.isFinite(ownerID)) return res.status(400).json({ error: "Invalid ownerID" });

  const data = req.body ??{};
  const settings = await prisma.userSetting.upsert({
    where: { ownerID },
    create: {ownerID, ...data },
    update: {...data},

});
  res.json(settings);
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
