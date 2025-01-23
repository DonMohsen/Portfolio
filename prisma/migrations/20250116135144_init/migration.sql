-- CreateEnum
CREATE TYPE "ProjectTypes" AS ENUM ('Practice', 'Copy', 'Forked', 'Real');

-- CreateEnum
CREATE TYPE "TechnologyTypes" AS ENUM ('React', 'Next_js');

-- CreateTable
CREATE TABLE "Technology" (
    "id" SERIAL NOT NULL,
    "name" "TechnologyTypes" NOT NULL,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "liveLink" TEXT,
    "image" TEXT,
    "competency" INTEGER NOT NULL,
    "projectType" "ProjectTypes" NOT NULL,
    "githubLink" TEXT NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectsOnTechnologies" (
    "projectId" INTEGER NOT NULL,
    "technologyId" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "addedBy" TEXT NOT NULL,

    CONSTRAINT "ProjectsOnTechnologies_pkey" PRIMARY KEY ("projectId","technologyId")
);

-- AddForeignKey
ALTER TABLE "ProjectsOnTechnologies" ADD CONSTRAINT "ProjectsOnTechnologies_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectsOnTechnologies" ADD CONSTRAINT "ProjectsOnTechnologies_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "Technology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
