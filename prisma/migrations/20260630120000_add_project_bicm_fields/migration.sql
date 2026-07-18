-- CreateEnum
CREATE TYPE "ProjectIndustry" AS ENUM (
  'Healthcare',
  'Fintech',
  'Ecommerce',
  'AI',
  'Automation',
  'Education',
  'Marketplace',
  'Enterprise',
  'SaaS',
  'Other'
);

-- AlterTable: add BICM + case study fields (slug nullable until backfill)
ALTER TABLE "Projects" ADD COLUMN "slug" TEXT;
ALTER TABLE "Projects" ADD COLUMN "industry" "ProjectIndustry";
ALTER TABLE "Projects" ADD COLUMN "outcomeMetric" TEXT;
ALTER TABLE "Projects" ADD COLUMN "featured" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Projects" ADD COLUMN "role" TEXT;
ALTER TABLE "Projects" ADD COLUMN "year" INTEGER;
ALTER TABLE "Projects" ADD COLUMN "problemHtml" TEXT;
ALTER TABLE "Projects" ADD COLUMN "insightHtml" TEXT;
ALTER TABLE "Projects" ADD COLUMN "changeHtml" TEXT;
ALTER TABLE "Projects" ADD COLUMN "measurementHtml" TEXT;
ALTER TABLE "Projects" ADD COLUMN "failureHtml" TEXT;
ALTER TABLE "Projects" ADD COLUMN "clientQuote" TEXT;
ALTER TABLE "Projects" ADD COLUMN "clientName" TEXT;
ALTER TABLE "Projects" ADD COLUMN "metricsJson" JSONB;

-- Backfill slug from name (matches lib/projects/slugify.ts for ASCII names)
WITH base AS (
  SELECT
    id,
    NULLIF(
      trim(
        both '-'
        FROM regexp_replace(
          regexp_replace(lower(trim(name)), '[^a-z0-9\s_-]', '', 'gi'),
          '[\s_]+',
          '-',
          'g'
        )
      ),
      ''
    ) AS base_slug
  FROM "Projects"
),
numbered AS (
  SELECT
    id,
    COALESCE(base_slug, 'project-' || id::text) AS base_slug,
    ROW_NUMBER() OVER (
      PARTITION BY COALESCE(base_slug, 'project-' || id::text)
      ORDER BY id
    ) AS rn
  FROM base
)
UPDATE "Projects" AS p
SET slug = CASE
  WHEN n.rn = 1 THEN n.base_slug
  ELSE n.base_slug || '-' || n.id::text
END
FROM numbered AS n
WHERE p.id = n.id;

ALTER TABLE "Projects" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Projects_slug_key" ON "Projects"("slug");
CREATE INDEX "Projects_featured_idx" ON "Projects"("featured");
CREATE INDEX "Projects_industry_idx" ON "Projects"("industry");
