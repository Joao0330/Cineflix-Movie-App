/*
  Warnings:

  - A unique constraint covering the columns `[userId,external_id]` on the table `Favorites` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Favorites_userId_external_id_key` ON `Favorites`(`userId`, `external_id`);
