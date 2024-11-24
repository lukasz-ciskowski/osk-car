/*
  Warnings:

  - You are about to drop the `ClassRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TheorericalLesson` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TheorericalLesson" DROP CONSTRAINT "TheorericalLesson_classRoomId_fkey";

-- DropForeignKey
ALTER TABLE "TheorericalLesson" DROP CONSTRAINT "TheorericalLesson_groupId_fkey";

-- DropTable
DROP TABLE "ClassRoom";

-- DropTable
DROP TABLE "TheorericalLesson";

-- CreateTable
CREATE TABLE "Classroom" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TheoreticalLesson" (
    "_id" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "classRoomId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "TheoreticalLesson_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "TheoreticalLesson" ADD CONSTRAINT "TheoreticalLesson_classRoomId_fkey" FOREIGN KEY ("classRoomId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TheoreticalLesson" ADD CONSTRAINT "TheoreticalLesson_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
