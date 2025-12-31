/*
  Warnings:

  - You are about to drop the column `bedId` on the `Resident` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[residentId]` on the table `Bed` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Resident" DROP CONSTRAINT "Resident_bedId_fkey";

-- DropIndex
DROP INDEX "Resident_bedId_key";

-- AlterTable
ALTER TABLE "Bed" ADD COLUMN     "residentId" TEXT;

-- AlterTable
ALTER TABLE "Resident" DROP COLUMN "bedId";

-- CreateIndex
CREATE UNIQUE INDEX "Bed_residentId_key" ON "Bed"("residentId");

-- AddForeignKey
ALTER TABLE "Bed" ADD CONSTRAINT "Bed_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE SET NULL ON UPDATE CASCADE;
