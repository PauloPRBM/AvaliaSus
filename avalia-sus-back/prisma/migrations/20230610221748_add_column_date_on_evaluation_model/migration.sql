-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Evaluation" (
    "rate" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Evaluation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Evaluation_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Evaluation" ("comment", "hospitalId", "rate", "userId") SELECT "comment", "hospitalId", "rate", "userId" FROM "Evaluation";
DROP TABLE "Evaluation";
ALTER TABLE "new_Evaluation" RENAME TO "Evaluation";
CREATE UNIQUE INDEX "Evaluation_userId_hospitalId_key" ON "Evaluation"("userId", "hospitalId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
