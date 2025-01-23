/*
  Warnings:

  - Added the required column `imageUrl` to the `Technology` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `name` on the `Technology` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Technology" ADD COLUMN     "imageUrl" TEXT NOT NULL,
DROP COLUMN "name",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropEnum
DROP TYPE "TechnologyTypes";
