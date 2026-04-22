const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  console.log("Cleared existing data.");

  const alice = await prisma.user.create({
    data: {
      Username: "AJ29",
      password: "Alice123!",
      createdAt: new Date(),
      Posts: {
        create: [
          {
            Title: "Hello World",
            FileDescription: "This is my first post!",
          },
          {
            Title: "Prisma is Great",
            FileDescription: "I love using Prisma for my projects.",
          },
        ],
      }
    },
  });
  console.log(`Seeded user: ${alice.Username} (${alice.password})`);

  const count = await prisma.user.count();
  console.log(`Database seeded with ${count} user(s).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
