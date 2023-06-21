/*
  Warnings:

  - You are about to drop the `_CommentReplies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CommentReplies" DROP CONSTRAINT "_CommentReplies_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommentReplies" DROP CONSTRAINT "_CommentReplies_B_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_eventId_fkey";

-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "parent_id" INTEGER;

-- AlterTable
ALTER TABLE "events" ALTER COLUMN "event_time" SET DEFAULT NOW() + interval '2 days';

-- DropTable
DROP TABLE "_CommentReplies";

-- CreateTable
CREATE TABLE "_userBlocked" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_userBlocked_AB_unique" ON "_userBlocked"("A", "B");

-- CreateIndex
CREATE INDEX "_userBlocked_B_index" ON "_userBlocked"("B");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userBlocked" ADD CONSTRAINT "_userBlocked_A_fkey" FOREIGN KEY ("A") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userBlocked" ADD CONSTRAINT "_userBlocked_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
