/*
  Warnings:

  - You are about to drop the `habilidade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projeto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projetoandamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `habilidade` DROP FOREIGN KEY `Habilidade_freelancerId_fkey`;

-- DropForeignKey
ALTER TABLE `projeto` DROP FOREIGN KEY `Projeto_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `projetoandamento` DROP FOREIGN KEY `ProjetoAndamento_freelancerId_fkey`;

-- DropForeignKey
ALTER TABLE `projetoandamento` DROP FOREIGN KEY `ProjetoAndamento_projetoId_fkey`;

-- DropTable
DROP TABLE `habilidade`;

-- DropTable
DROP TABLE `projeto`;

-- DropTable
DROP TABLE `projetoandamento`;

-- DropTable
DROP TABLE `usuario`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `photo` LONGBLOB NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
