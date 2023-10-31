-- DropForeignKey
ALTER TABLE "rating" DROP CONSTRAINT "rating_authorId_fkey";

-- DropForeignKey
ALTER TABLE "rating" DROP CONSTRAINT "rating_eventId_fkey";

-- DropForeignKey
ALTER TABLE "rating" DROP CONSTRAINT "rating_userId_fkey";

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
