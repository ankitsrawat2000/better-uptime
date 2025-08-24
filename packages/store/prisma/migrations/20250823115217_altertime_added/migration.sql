/*
  Warnings:

  - You are about to drop the column `time_added` on the `website` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `website` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "website" DROP COLUMN "time_added",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;
