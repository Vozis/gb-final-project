-- DropIndex
DROP INDEX "events_creatorId_key";

-- AlterTable
ALTER TABLE "events" ALTER COLUMN "image_url" SET DEFAULT '/assets/default-event.png';
