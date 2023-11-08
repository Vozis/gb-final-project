/*
  Warnings:

  - You are about to drop the `_TagToTypeTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TagToTypeTag" DROP CONSTRAINT "_TagToTypeTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_TagToTypeTag" DROP CONSTRAINT "_TagToTypeTag_B_fkey";

-- AlterTable
ALTER TABLE "tags" ADD COLUMN     "type_id" INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "_TagToTypeTag";

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "type_tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
