const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.recentFile.deleteMany();
  await prisma.userSetting.deleteMany();
  await prisma.fileSetting.deleteMany();
  await prisma.file.deleteMany();
  await prisma.user.deleteMany();
  console.log("Cleared existing data.");

  const alice = await prisma.user.create({
    data: {
      username: "AJ29",
      password: "Alice123!",
      email:    "aj@example.com",
      createdAt: new Date(),
      isModerator: false,
      createdFiles: {
        create: [],
      },
      },
    },
  );
  console.log(`Seeded user: ${alice.username}`);

  const bob = await prisma.user.create({
    data: {
      username: "BobTheBuilder",
      password: "Bob123!",
      email:    "bob@example.com",
      createdAt: new Date(),
      isModerator: true,
      createdFiles: {
        create: [],
      },
    },
  });
  console.log(`Seeded user: ${bob.username}`);

  const aliceFiles = await prisma.file.create({
    data: 
      {
        title: "Alice's First File",
        fileDescription: "This is Alice's first file.",
        creatorID: alice.id,
        textContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      }
  });
  console.log(`Seeded file: ${aliceFiles.title}`);
  console.log(aliceFiles);
  
  const aliceRecentFile = await prisma.recentFile.create({
    data: {
      userID: alice.id,
      fileID: aliceFiles.id,
    },
  });
  console.log(`Seeded recent file for Alice.`);

  const aliceSetting = await prisma.userSetting.create({
    data: {
      ownerID: alice.id,
      font: "Arial",
      size: 14,
      speed: "normal",
      textColor: "#000000",
      highlighter: "yellow",
      isDarkMode: false,
      language: "en",
    },
  });
  console.log(`Seeded setting for Alice.`);

  const aliceFileSetting = await prisma.fileSetting.create({
    data: {
      fileID: aliceFiles.id, // Assuming the first file has ID 1
      font: "Courier New",
      size: 12,
      speed: "fast",
      textColor: "#333333",
      highlighter: "lightblue",
      isDarkMode: true,
    },
  });
  console.log(`Seeded file setting for Alice's first file.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });