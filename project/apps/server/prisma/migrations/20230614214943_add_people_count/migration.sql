/*
  Warnings:

  - You are about to drop the column `eventTime` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "eventTime",
ADD COLUMN     "event_time" TIMESTAMP(3) DEFAULT NOW() + interval '2 days',
ADD COLUMN     "people_count" INTEGER NOT NULL DEFAULT 2;
