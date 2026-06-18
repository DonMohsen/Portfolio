-- CreateEnum
CREATE TYPE "BlogCategory" AS ENUM ('tech', 'personal');

-- CreateEnum
CREATE TYPE "BlogStatus" AS ENUM ('draft', 'published');

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "status" "BlogStatus" NOT NULL DEFAULT 'draft',
    "category" "BlogCategory" NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleFa" TEXT NOT NULL,
    "excerptEn" TEXT NOT NULL,
    "excerptFa" TEXT NOT NULL,
    "contentHtmlEn" TEXT NOT NULL,
    "contentHtmlFa" TEXT NOT NULL,
    "conclusionHtmlEn" TEXT,
    "conclusionHtmlFa" TEXT,
    "heroImage" TEXT,
    "readTimeMinutes" INTEGER,
    "views" INTEGER NOT NULL DEFAULT 0,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "faq" JSONB,
    "headings" JSONB,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");

-- CreateIndex
CREATE INDEX "BlogPost_status_publishedAt_idx" ON "BlogPost"("status", "publishedAt" DESC);

-- CreateIndex
CREATE INDEX "BlogPost_category_idx" ON "BlogPost"("category");
