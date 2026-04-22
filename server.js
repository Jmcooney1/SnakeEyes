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
    select: { id: true, Username: true, password: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(users);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
