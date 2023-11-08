-- AlterTable
ALTER TABLE "events" ALTER COLUMN "coordinate_x" SET DEFAULT '0',
ALTER COLUMN "coordinate_y" SET DEFAULT '0',
ALTER COLUMN "event_time" SET DEFAULT NOW() + interval '2 days';
