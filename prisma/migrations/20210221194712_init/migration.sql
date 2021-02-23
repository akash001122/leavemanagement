-- CreateEnum
CREATE TYPE "ERole" AS ENUM ('HR', 'MANAGER', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "LeaveType" AS ENUM ('SICK', 'PAID', 'COMPLIMENTARY', 'LOP', 'EMERGENCY', 'OTHERS');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "Userlogin" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "ERole" NOT NULL DEFAULT E'EMPLOYEE',
    "empId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "roleDescription" TEXT NOT NULL,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "depId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "manager" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leave" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "leaveType" "LeaveType" NOT NULL DEFAULT E'OTHERS',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "leaveDescription" TEXT NOT NULL,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "leaveTimeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leaveStatus" "Status" NOT NULL DEFAULT E'PENDING',
    "statusTimeStamp" TIMESTAMP(3) NOT NULL,
    "totalLeavesLeft" INTEGER NOT NULL DEFAULT 20,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Userlogin.userName_unique" ON "Userlogin"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Employee.email_unique" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Department.name_unique" ON "Department"("name");

-- AddForeignKey
ALTER TABLE "Userlogin" ADD FOREIGN KEY ("empId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD FOREIGN KEY ("depId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leave" ADD FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
