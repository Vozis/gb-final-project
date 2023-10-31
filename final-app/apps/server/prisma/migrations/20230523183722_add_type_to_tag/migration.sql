/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `tags` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tags" ADD COLUMN     "type" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tags_type_key" ON "tags"("type");
