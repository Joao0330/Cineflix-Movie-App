/*
  Warnings:

  - You are about to drop the column `status` on the `movielist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `movie` ADD COLUMN `status` ENUM('WATCHING', 'COMPLETED', 'ON_HOLD', 'DROPPED', 'PLANNING') NOT NULL DEFAULT 'WATCHING';

-- AlterTable
ALTER TABLE `movielist` DROP COLUMN `status`;
