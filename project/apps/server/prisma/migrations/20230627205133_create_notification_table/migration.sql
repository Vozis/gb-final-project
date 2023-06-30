-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('COMMENT_REPLY', 'COMMENT_CREATE', 'EVENT_CREATE', 'EVENT_UPDATE', 'EVENT_COMPLETE', 'FRIEND_ADD');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('SENT', 'DELIVERED', 'ERROR');

-- AlterTable
ALTER TABLE "events" ALTER COLUMN "event_time" SET DEFAULT NOW() + interval '2 days';

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "type" "NotificationType" NOT NULL,
    "source_id" INTEGER NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT 'SENT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);
