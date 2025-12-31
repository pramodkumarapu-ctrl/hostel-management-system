/*
  Warnings:

  - You are about to drop the column `residentId` on the `Bed` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hostelId,dayType,specificDay,mealType]` on the table `FoodMenu` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bedId]` on the table `Resident` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Bed" DROP CONSTRAINT "Bed_residentId_fkey";

-- DropIndex
DROP INDEX "Bed_residentId_key";

-- DropIndex
DROP INDEX "Bed_roomId_bedNo_key";

-- DropIndex
DROP INDEX "FoodMenu_hostelId_dayType_mealType_key";

-- AlterTable
ALTER TABLE "Bed" DROP COLUMN "residentId";

-- AlterTable
ALTER TABLE "FoodMenu" ADD COLUMN     "specificDay" TEXT;

-- AlterTable
ALTER TABLE "Resident" ADD COLUMN     "bedId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "FoodMenu_hostelId_dayType_specificDay_mealType_key" ON "FoodMenu"("hostelId", "dayType", "specificDay", "mealType");

-- CreateIndex
CREATE UNIQUE INDEX "Resident_bedId_key" ON "Resident"("bedId");

-- AddForeignKey
ALTER TABLE "Resident" ADD CONSTRAINT "Resident_bedId_fkey" FOREIGN KEY ("bedId") REFERENCES "Bed"("id") ON DELETE SET NULL ON UPDATE CASCADE;
