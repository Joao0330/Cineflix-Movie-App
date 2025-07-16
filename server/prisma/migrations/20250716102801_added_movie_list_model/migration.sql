-- CreateTable
CREATE TABLE `MovieList` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `external_id` VARCHAR(191) NOT NULL,
    `status` ENUM('WATCHING', 'COMPLETED', 'ON_HOLD', 'DROPPED', 'PLANNED') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `MovieList_external_id_key`(`external_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MovieList` ADD CONSTRAINT `MovieList_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
