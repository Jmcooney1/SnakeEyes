//This will remove all existing data from the database. Use with caution.
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.recentFile.deleteMany();
  await prisma.file.deleteMany();
  await prisma.userSetting.deleteMany();
  await prisma.fileSetting.deleteMany();
  await prisma.user.deleteMany();
  console.log("Cleared existing data.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());