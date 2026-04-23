-- CreateTable
CREATE TABLE "FileSetting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fileID" INTEGER NOT NULL,
    "font" TEXT,
    "size" INTEGER,
    "speed" TEXT,
    "textColor" TEXT,
    "highlighter" TEXT,
    "isDarkMode" BOOLEAN DEFAULT false,
    CONSTRAINT "FileSetting_fileID_fkey" FOREIGN KEY ("fileID") REFERENCES "File" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "FileSetting_fileID_key" ON "FileSetting"("fileID");
