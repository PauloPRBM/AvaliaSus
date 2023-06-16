/*
  Warnings:

  - Made the column `id` on table `Evaluation` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Evaluation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rate" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Evaluation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Evaluation_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Evaluation" ("comment", "date", "hospitalId", "id", "rate", "userId") SELECT "comment", "date", "hospitalId", "id", "rate", "userId" FROM "Evaluation";
DROP TABLE "Evaluation";
ALTER TABLE "new_Evaluation" RENAME TO "Evaluation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
