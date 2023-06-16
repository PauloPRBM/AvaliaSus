-- CreateTable
CREATE TABLE "SessionToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "SessionToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
