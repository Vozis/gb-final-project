-- AlterTable
ALTER TABLE "events" ALTER COLUMN "event_time" SET DEFAULT NOW() + interval '2 days';
