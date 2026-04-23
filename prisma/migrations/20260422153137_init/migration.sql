-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
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
    "title" TEXT NOT NULL,
    "fileDescription" TEXT,
    "publishDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorID" INT NOT NULL,
    "settingID" INTEGER,
    CONSTRAINT "Post_creatorID_fkey" FOREIGN KEY ("creatorID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Post_settingID_fkey" FOREIGN KEY ("settingID") REFERENCES "Setting" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "font" TEXT,
    "size" INTEGER,
    "speed" TEXT,
    "textColor" TEXT,
    "highlighter" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_postID_key" ON "User"("postID");

-- CreateIndex
CREATE UNIQUE INDEX "User_settingID_key" ON "User"("settingID");

-- CreateIndex
CREATE UNIQUE INDEX "Post_settingID_key" ON "Post"("settingID");
