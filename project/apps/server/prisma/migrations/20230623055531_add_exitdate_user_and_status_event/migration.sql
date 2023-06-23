-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('OPEN', 'CLOSED', 'CANCELED', 'ACTIVE');

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'OPEN',
ALTER COLUMN "event_time" SET DEFAULT NOW() + interval '2 days';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "exit_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
