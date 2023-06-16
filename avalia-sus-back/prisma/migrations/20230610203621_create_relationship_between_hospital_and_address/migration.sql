/*
  Warnings:

  - Added the required column `addressId` to the `Hospital` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hospital" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cnes" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    CONSTRAINT "Hospital_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Hospital" ("cnes", "id", "name") SELECT "cnes", "id", "name" FROM "Hospital";
DROP TABLE "Hospital";
ALTER TABLE "new_Hospital" RENAME TO "Hospital";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
