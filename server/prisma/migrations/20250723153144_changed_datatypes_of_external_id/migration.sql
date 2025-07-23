/*
  Warnings:

  - You are about to alter the column `external_id` on the `favorites` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `external_id` on the `movie` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `favorites` MODIFY `external_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `movie` MODIFY `external_id` INTEGER NOT NULL;
