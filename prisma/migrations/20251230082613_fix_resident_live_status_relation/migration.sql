/*
  Warnings:

  - You are about to drop the column `bedId` on the `Resident` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `ResidentLiveStatus` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[residentId]` on the table `Bed` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roomId,bedNo]` on the table `Bed` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isInside` to the `ResidentLiveStatus` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Resident" DROP CONSTRAINT "Resident_bedId_fkey";

-- DropIndex
DROP INDEX "Resident_bedId_key";

-- AlterTable
ALTER TABLE "Bed" ADD COLUMN     "residentId" TEXT;

-- AlterTable
ALTER TABLE "Resident" DROP COLUMN "bedId";

-- AlterTable
ALTER TABLE "ResidentLiveStatus" DROP COLUMN "status",
ADD COLUMN     "isInside" BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bed_residentId_key" ON "Bed"("residentId");

-- CreateIndex
CREATE UNIQUE INDEX "Bed_roomId_bedNo_key" ON "Bed"("roomId", "bedNo");

-- AddForeignKey
ALTER TABLE "Bed" ADD CONSTRAINT "Bed_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE SET NULL ON UPDATE CASCADE;
