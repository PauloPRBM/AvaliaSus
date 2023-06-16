/*
  Warnings:

  - You are about to drop the column `user_id` on the `SessionToken` table. All the data in the column will be lost.
  - You are about to drop the column `State` on the `Address` table. All the data in the column will be lost.
  - Added the required column `userId` to the `SessionToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SessionToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "SessionToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SessionToken" ("id", "isValid", "token") SELECT "id", "isValid", "token" FROM "SessionToken";
DROP TABLE "SessionToken";
ALTER TABLE "new_SessionToken" RENAME TO "SessionToken";
CREATE TABLE "new_Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL
);
INSERT INTO "new_Address" ("city", "id", "neighborhood", "street") SELECT "city", "id", "neighborhood", "street" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
