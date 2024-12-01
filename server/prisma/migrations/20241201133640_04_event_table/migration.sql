/*
  Warnings:

  - You are about to drop the `TheoreticalLesson` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TheoreticalLesson" DROP CONSTRAINT "TheoreticalLesson_classroomId_fkey";

-- DropForeignKey
ALTER TABLE "TheoreticalLesson" DROP CONSTRAINT "TheoreticalLesson_groupId_fkey";

-- DropForeignKey
ALTER TABLE "TheoreticalLesson" DROP CONSTRAINT "TheoreticalLesson_instructorId_fkey";

-- DropTable
DROP TABLE "TheoreticalLesson";

-- CreateTable
CREATE TABLE "TheoreticalEvent" (
    "_id" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "classroomId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "instructorId" INTEGER NOT NULL,

    CONSTRAINT "TheoreticalEvent_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "TheoreticalEvent" ADD CONSTRAINT "TheoreticalEvent_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TheoreticalEvent" ADD CONSTRAINT "TheoreticalEvent_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TheoreticalEvent" ADD CONSTRAINT "TheoreticalEvent_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
