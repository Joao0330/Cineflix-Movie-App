/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `MovieList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `MovieList_userId_title_key` ON `MovieList`(`userId`, `title`);
