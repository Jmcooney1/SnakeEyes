const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// -- GET API ENDPOINTS --

// GET /api/users — List all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, email: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/users/username/:username — Find user by username
app.get("/api/users/username/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true, username: true, email: true, createdAt: true },
    });
    if (!user) return res.status(404).json({ error: "User not found." });
    res.json(user);
  } catch (error) {
    console.error("Error fetching user by username:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/files — List all files
app.get("/api/files", async (req, res) => {
  try {
    const files = await prisma.file.findMany({
      select: { id: true, title: true, createdAt: true, isPublic: true, creatorID: true, views: true, textContent: true, fileDescription: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/user-settings — List all user settings
app.get("/api/user-settings", async (req, res) => {
  try {
    const userSettings = await prisma.userSetting.findMany({
      select: { id: true, ownerID: true, font: true, size: true, speed: true, textColor: true, highlighter: true, language: true },
      orderBy: { id: "desc" },
    });
    res.json(userSettings);
  } catch (error) {
    console.error("Error fetching user settings:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/file-settings — List all file settings
app.get("/api/file-settings", async (req, res) => {
  try {
    const fileSettings = await prisma.fileSetting.findMany({
      select: { id: true, fileID: true, font: true, size: true, speed: true, textColor: true, highlighter: true, isDarkMode: true },
      orderBy: { id: "desc" },
    });
    res.json(fileSettings);
  } catch (error) {
    console.error("Error fetching file settings:", error);
    res.status(500).json({ error: error.message });
  }
});

// -- POST API ENDPOINTS --

// POST /api/users — Create a new user
app.post("/api/users", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const newUser = await prisma.user.create({
      data: { username, password, email, createdAt: new Date() },
    });
    console.log("New user created:", newUser);
    res.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/files — Create a new file
app.post("/api/files", async (req, res) => {
  try {
    const { title, fileDescription, author, publishDate, textContent, creatorID } = req.body;
    console.log("Received body:", req.body);

    let parsedDate = null;
    if (publishDate) {
      const d = new Date(publishDate);
      parsedDate = isNaN(d.getTime()) ? null : d;
    }

    const newFile = await prisma.file.create({
      data: {
        title,
        fileDescription,
        author,
        publishDate: parsedDate,
        textContent,
        creatorID: parseInt(creatorID),  // ✅ ensure Int
        createdAt: new Date(),
      },
    });
    console.log("New file created:", newFile);
    res.json(newFile);
  } catch (error) {
    console.error("Error creating file:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/files/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const file = await prisma.file.findUnique({
      where: { id: parseInt(id) },
      select: { id: true, title: true, fileDescription: true, publishDate: true, textContent: true, author: true, creatorID: true },
    });
    if (!file) return res.status(404).json({ error: "File not found." });
    res.json(file);
  } 
  catch (error) {
    console.error("Error fetching file:", error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/file-settings — Create a new file setting
app.post("/api/file-settings", async (req, res) => {
  try {
    const { fileID, font, size, speed, textColor, highlighter, isDarkMode } = req.body;
    const newFileSetting = await prisma.fileSetting.create({
      data: {
        fileID: parseInt(fileID),  // ✅ ensure Int
        font,
        size: parseInt(size),      // ✅ ensure Int
        speed,
        textColor,
        highlighter,
        isDarkMode,
      },
    });
    console.log("New file setting created:", newFileSetting);
    res.json(newFileSetting);
  } catch (error) {
    console.error("Error creating file setting:", error);
    res.status(500).json({ error: error.message });
  }
});
// ── GET /api/users ── List all registered users (already complete)
app.get("/api/users/", async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, username: true, password: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(users);
});

app.get("/api/tryLogin", async (req, res) => {
  const user = req.query.u;
  const pass = req.query.p;
  console.log(user);
  console.log(pass);

  const attemptedUser = await prisma.user.findUnique({
    where: {username: user},
    select: {password: true}
  })
  if(!attemptedUser){
    return res.json({ 
      username: user, validUser: false,
      password: pass, validPass: false,
    });
  }
  else{
    const vp = attemptedUser.password===pass;
    console.log(vp);
    res.json({ 
      username: user, validUser: true,
      password: pass, validPass: vp,
    });
  }
});

app.get("/api/users/:username", async (req, res) => {
  const username = req.params.username;
  const user = await prisma.user.findUnique({
    where: { username: username },
    select: { id: true, username: true, password: true, createdAt: true, recentFiles: true, createdFiles: true },
  });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

// -- GET/api/files/preview/:fileID -- Get a specific file's data necessary to display on preview
app.get("/api/files/preview/:fileID", async(req,res) => {
  const fileID = parseInt(req.params.fileID);
  const file = await prisma.file.findUnique({
    where: { id: fileID },
    select: { id: true, title: true, author: true, publishDate: true, creator: true, isPublic: true }
  });
  if (!file) {
    return res.status(404).json({ error: "File not found" });
  }
  res.json(file);
})

app.get("/api/files/view/:fileID", async(req,res) => {
  const fileID = parseInt(req.params.fileID);
  const file = await prisma.file.findUnique({
    where: { id: fileID },
    include: { creator: true }
  });
  if (!file) {
    return res.status(404).json({ error: "File not found" });
  }
  res.json(file);
})

app.get("/api/search/:entry", async(req,res) => {
  const entry = req.params.entry;
  const files = await prisma.file.findMany({
    where: { title: { contains: entry } },
    select: { id: true, title: true },
  });
  res.json(files);
});

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