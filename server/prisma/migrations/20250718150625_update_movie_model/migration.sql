/*
  Warnings:

  - A unique constraint covering the columns `[movieListId,external_id]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `movie` MODIFY `movieListId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Movie_movieListId_external_id_key` ON `Movie`(`movieListId`, `external_id`);
