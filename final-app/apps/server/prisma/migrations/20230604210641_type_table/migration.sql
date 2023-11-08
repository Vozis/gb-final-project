/*
  Warnings:

  - You are about to drop the column `type` on the `tags` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tags" DROP COLUMN "type";

-- CreateTable
CREATE TABLE "type_tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "type_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_userFriends" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_TagToTypeTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_userFriends_AB_unique" ON "_userFriends"("A", "B");

-- CreateIndex
CREATE INDEX "_userFriends_B_index" ON "_userFriends"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TagToTypeTag_AB_unique" ON "_TagToTypeTag"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToTypeTag_B_index" ON "_TagToTypeTag"("B");

-- AddForeignKey
ALTER TABLE "_userFriends" ADD CONSTRAINT "_userFriends_A_fkey" FOREIGN KEY ("A") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userFriends" ADD CONSTRAINT "_userFriends_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToTypeTag" ADD CONSTRAINT "_TagToTypeTag_A_fkey" FOREIGN KEY ("A") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToTypeTag" ADD CONSTRAINT "_TagToTypeTag_B_fkey" FOREIGN KEY ("B") REFERENCES "type_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
