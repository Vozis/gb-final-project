/*
  Warnings:

  - Added the required column `authorId` to the `rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rating" ADD COLUMN     "authorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
