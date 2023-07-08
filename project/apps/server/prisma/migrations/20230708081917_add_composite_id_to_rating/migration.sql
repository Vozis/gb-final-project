/*
  Warnings:

  - A unique constraint covering the columns `[eventId,userId]` on the table `rating` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "rating_eventId_userId_key" ON "rating"("eventId", "userId");
