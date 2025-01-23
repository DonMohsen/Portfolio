-- DropForeignKey
ALTER TABLE "ProjectsOnTechnologies" DROP CONSTRAINT "ProjectsOnTechnologies_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectsOnTechnologies" DROP CONSTRAINT "ProjectsOnTechnologies_technologyId_fkey";

-- AddForeignKey
ALTER TABLE "ProjectsOnTechnologies" ADD CONSTRAINT "ProjectsOnTechnologies_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectsOnTechnologies" ADD CONSTRAINT "ProjectsOnTechnologies_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "Technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;
