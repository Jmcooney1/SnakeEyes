const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());


// --GET API ENDPOINTS--
// ── GET /api/users ── List all registered users (already complete)
app.get("/api/users", async (req, res) => {
  try{
    const users = await prisma.user.findMany({
      select: { id: true, username: true, password: true,email: true, createdAt: true, isModerator: false },
      orderBy: { createdAt: "desc" },
    });
    res.json(users);
  }
  catch(error){
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
});

// -- GET/api/files -- List all registered post
app.get("/api/get/files", async(req,res) => {
  try{
    const files = await prisma.file.findMany({
      select: { id:true, title:true, createdAt:true, isPublic:false, creatorID:true,views:true,textContent:true, fileDescription:true},
      orderBy: { createdAt: "desc"}
    });
    res.json(files);
  } 
  catch(error){
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "An error occurred while fetching files." });
  }
});


// -- GET/api/userSetting -- List all registered user settings
app.get("/api/get/userSetting", async(req,res) => {
  try{
  const userSettings = await prisma.userSetting.findMany({
    select: { id:true, ownerID:true, font:true, size:true, speed:true,textColor:true, highlighter:true,language:true},
    orderBy: { createdAt: "desc"}
  });
  res.json(userSettings);
  } 
  catch(error){
    console.error("Error fetching user settings:", error);
    res.status(500).json({ error: "An error occurred while fetching user settings." });
  }
});
//-- GET/api/fileSetting -- List all registered file settings
app.get("/api/get/fileSetting", async(req,res) => {
  try{
    const fileSettings = await prisma.fileSetting.findMany({
      select: { id:true, fileID:true},
      orderBy: { createdAt: "desc"}
    });
    res.json(fileSettings);
  }
  catch(error){
    console.error("Error fetching file settings:", error);
    res.status(500).json({ error: "An error occurred while fetching file settings." });
  }
});

// -- POST API ENDPOINTS--
// -- POST/api/users -- Create a new user (already complete)
app.post("/api/users", async (req, res) => {
  try{
    const { username, password, email } = req.body;
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        email,
        createdAt: new Date(),
      },
    });
    console.log("New user created:", newUser);
    res.json(newUser);
  }
  catch(error){
    console.error("Error creating user:", error);
    res.status(500).json({ error: "An error occurred while creating the user." });
  }
});
// app.post("/api/users", async (req, res) => {
//   const { username, password, email } = req.body;
// });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
