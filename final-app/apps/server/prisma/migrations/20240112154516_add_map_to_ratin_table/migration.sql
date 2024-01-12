/*
  Warnings:

  - You are about to drop the column `authorId` on the `rating` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `rating` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `rating` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[event_id,user_id]` on the table `rating` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `author_id` to the `rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_id` to the `rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `rating` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "rating" DROP CONSTRAINT "rating_authorId_fkey";

-- DropForeignKey
ALTER TABLE "rating" DROP CONSTRAINT "rating_eventId_fkey";

-- DropForeignKey
ALTER TABLE "rating" DROP CONSTRAINT "rating_userId_fkey";

-- DropIndex
DROP INDEX "rating_eventId_userId_key";

-- AlterTable
ALTER TABLE "rating" DROP COLUMN "authorId",
DROP COLUMN "eventId",
DROP COLUMN "userId",
ADD COLUMN     "author_id" INTEGER NOT NULL,
ADD COLUMN     "event_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "rating_author_id_idx" ON "rating"("author_id");

-- CreateIndex
CREATE UNIQUE INDEX "rating_event_id_user_id_key" ON "rating"("event_id", "user_id");

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
