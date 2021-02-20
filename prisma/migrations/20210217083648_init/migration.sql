/*
  Warnings:

  - You are about to drop the column `empId` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the `Token` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `depId` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_userId_fkey";

-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_empId_fkey";

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "empId";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "depId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Token";

-- AddForeignKey
ALTER TABLE "Employee" ADD FOREIGN KEY ("depId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;
