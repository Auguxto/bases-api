/*
  Warnings:

  - You are about to drop the `PermissionsOnUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PermissionsOnUsers" DROP CONSTRAINT "PermissionsOnUsers_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "PermissionsOnUsers" DROP CONSTRAINT "PermissionsOnUsers_userId_fkey";

-- DropTable
DROP TABLE "PermissionsOnUsers";

-- DropTable
DROP TABLE "permissions";
