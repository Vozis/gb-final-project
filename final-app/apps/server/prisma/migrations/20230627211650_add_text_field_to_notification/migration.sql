-- AlterTable
ALTER TABLE "events" ALTER COLUMN "event_time" SET DEFAULT NOW() + interval '2 days';

-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "text" VARCHAR(1000);
