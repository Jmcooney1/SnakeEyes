-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postID" INTEGER,
    "settingID" INTEGER,
    CONSTRAINT "User_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_settingID_fkey" FOREIGN KEY ("settingID") REFERENCES "Setting" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Title" TEXT NOT NULL,
    "FileDescription" TEXT,
    "PublishDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorUsername" TEXT NOT NULL,
    "settingID" INTEGER,
    CONSTRAINT "Post_creatorUsername_fkey" FOREIGN KEY ("creatorUsername") REFERENCES "User" ("Username") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Post_settingID_fkey" FOREIGN KEY ("settingID") REFERENCES "Setting" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Font" TEXT,
    "Size" INTEGER,
    "Speed" TEXT,
    "TextColor" TEXT,
    "Highlighter" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Username_key" ON "User"("Username");

-- CreateIndex
CREATE UNIQUE INDEX "User_postID_key" ON "User"("postID");

-- CreateIndex
CREATE UNIQUE INDEX "User_settingID_key" ON "User"("settingID");

-- CreateIndex
CREATE UNIQUE INDEX "Post_settingID_key" ON "Post"("settingID");
