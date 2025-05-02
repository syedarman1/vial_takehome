-- CreateEnum
CREATE TYPE "QueryStatus" AS ENUM ('OPEN', 'RESOLVED');

-- AlterTable
ALTER TABLE "form_data" ADD CONSTRAINT "form_data_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "query" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "QueryStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "formDataId" UUID NOT NULL,

    CONSTRAINT "query_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "query" ADD CONSTRAINT "query_formDataId_fkey" FOREIGN KEY ("formDataId") REFERENCES "form_data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
