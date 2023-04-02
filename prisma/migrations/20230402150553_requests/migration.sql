/*
  Warnings:

  - You are about to drop the column `played` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `requested` on the `Song` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Song" DROP COLUMN "played",
DROP COLUMN "requested";

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "songId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "played" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Request_songId_key" ON "Request"("songId");

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
