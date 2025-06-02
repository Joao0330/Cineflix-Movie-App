/*
  Warnings:

  - You are about to alter the column `password_hash` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(60)`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `password_hash` VARCHAR(60) NOT NULL;
