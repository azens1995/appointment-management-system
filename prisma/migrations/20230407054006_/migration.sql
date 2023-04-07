/*
  Warnings:

  - You are about to drop the column `appointmentByUser` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `appointmentForUser` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "appointmentByUser",
DROP COLUMN "appointmentForUser";
