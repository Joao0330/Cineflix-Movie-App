/*
  Warnings:

  - You are about to drop the column `external_id` on the `movielist` table. All the data in the column will be lost.
  - The values [PLANNED] on the enum `MovieList_status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `title` to the `MovieList` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `MovieList_external_id_key` ON `movielist`;

-- AlterTable
ALTER TABLE `movielist` DROP COLUMN `external_id`,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    MODIFY `status` ENUM('WATCHING', 'COMPLETED', 'ON_HOLD', 'DROPPED', 'PLANNING') NOT NULL DEFAULT 'WATCHING';

-- CreateTable
CREATE TABLE `Movie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `external_id` VARCHAR(191) NOT NULL,
    `movieListId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Movie` ADD CONSTRAINT `Movie_movieListId_fkey` FOREIGN KEY (`movieListId`) REFERENCES `MovieList`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
