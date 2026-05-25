-- DropForeignKey
ALTER TABLE "App" DROP CONSTRAINT "App_organizationId_fkey";

-- AlterTable
ALTER TABLE "App" ALTER COLUMN "organizationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "App" ADD CONSTRAINT "App_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
