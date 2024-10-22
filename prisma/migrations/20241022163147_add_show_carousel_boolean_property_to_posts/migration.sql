/*
  Warnings:

  - Made the column `imageLink` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "showCarousel" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "imageLink" SET NOT NULL;
