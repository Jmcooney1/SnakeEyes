/*
  Warnings:

  - You are about to drop the column `postID` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "settingID" INTEGER,
    CONSTRAINT "User_settingID_fkey" FOREIGN KEY ("settingID") REFERENCES "Setting" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "id", "password", "settingID", "username") SELECT "createdAt", "id", "password", "settingID", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_settingID_key" ON "User"("settingID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
