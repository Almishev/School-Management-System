/*
  Warnings:

  - A unique constraint covering the columns `[studentId,lessonId,date]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_parentId_fkey";

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "parentId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_studentId_lessonId_date_key" ON "Attendance"("studentId", "lessonId", "date");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
