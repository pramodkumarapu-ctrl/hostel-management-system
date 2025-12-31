/*
  Warnings:

  - Changed the type of `type` on the `Room` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sharing` on the `Room` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Room_floorId_roomNo_key";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL,
DROP COLUMN "sharing",
ADD COLUMN     "sharing" INTEGER NOT NULL;
