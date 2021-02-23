/*
  Warnings:

  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Leave` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Userlogin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_depId_fkey";

-- DropForeignKey
ALTER TABLE "Leave" DROP CONSTRAINT "Leave_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Userlogin" DROP CONSTRAINT "Userlogin_empId_fkey";

-- CreateTable
CREATE TABLE "userlogin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "ERole" NOT NULL DEFAULT E'EMPLOYEE',
    "empid" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "roledescription" TEXT NOT NULL,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "depid" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "manager" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leave" (
    "id" SERIAL NOT NULL,
    "employeeid" INTEGER NOT NULL,
    "leavetype" "LeaveType" NOT NULL DEFAULT E'OTHERS',
    "startdate" TIMESTAMP(3) NOT NULL,
    "enddate" TIMESTAMP(3) NOT NULL,
    "leavedescription" TEXT NOT NULL,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "leavetimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leavestatus" "Status" NOT NULL DEFAULT E'PENDING',
    "statustimestamp" TIMESTAMP(3) NOT NULL,
    "totalleavesleft" INTEGER NOT NULL DEFAULT 20,

    PRIMARY KEY ("id")
);

-- DropTable
DROP TABLE "Department";

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "Leave";

-- DropTable
DROP TABLE "Userlogin";

-- CreateIndex
CREATE UNIQUE INDEX "userlogin.username_unique" ON "userlogin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "employee.email_unique" ON "employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "department.name_unique" ON "department"("name");

-- AddForeignKey
ALTER TABLE "userlogin" ADD FOREIGN KEY ("empid") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD FOREIGN KEY ("depid") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leave" ADD FOREIGN KEY ("employeeid") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
