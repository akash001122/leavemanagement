-- CreateEnum
CREATE TYPE "EmployeeRole" AS ENUM ('HR', 'MANAGER', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "LeaveType" AS ENUM ('SICK', 'PAID', 'COMPOFF', 'LOP', 'EMERGENCY', 'OTHERS');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "userlogin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "EmployeeRole"[],

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
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "departmentid" INTEGER NOT NULL,
    "userid" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,

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
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "leavecreatedtime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leavestatus" "Status" NOT NULL DEFAULT E'PENDING',
    "leaveupdatedtime" TIMESTAMP(3),
    "totalleavesleft" INTEGER NOT NULL DEFAULT 20,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userlogin.username_unique" ON "userlogin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "employee.email_unique" ON "employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "department.name_unique" ON "department"("name");

-- AddForeignKey
ALTER TABLE "employee" ADD FOREIGN KEY ("departmentid") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD FOREIGN KEY ("userid") REFERENCES "userlogin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leave" ADD FOREIGN KEY ("employeeid") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
