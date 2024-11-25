/*
  Warnings:

  - You are about to drop the column `classRoomId` on the `TheoreticalLesson` table. All the data in the column will be lost.
  - Added the required column `classroomId` to the `TheoreticalLesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructorId` to the `TheoreticalLesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TheoreticalLesson" DROP CONSTRAINT "TheoreticalLesson_classRoomId_fkey";

-- AlterTable
ALTER TABLE "TheoreticalLesson" DROP COLUMN "classRoomId",
ADD COLUMN     "classroomId" INTEGER NOT NULL,
ADD COLUMN     "instructorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserGroupAssociation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "UserGroupAssociation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserGroupAssociation" ADD CONSTRAINT "UserGroupAssociation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroupAssociation" ADD CONSTRAINT "UserGroupAssociation_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TheoreticalLesson" ADD CONSTRAINT "TheoreticalLesson_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TheoreticalLesson" ADD CONSTRAINT "TheoreticalLesson_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
