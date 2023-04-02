-- CreateTable
CREATE TABLE "Song" (
    "id" SERIAL NOT NULL,
    "artist" TEXT,
    "title" TEXT,
    "genre" TEXT NOT NULL DEFAULT 'geral',
    "weight" INTEGER NOT NULL DEFAULT 1,
    "path" TEXT NOT NULL,
    "played" TIMESTAMP(3),
    "requested" TIMESTAMP(3),

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Song_path_key" ON "Song"("path");
