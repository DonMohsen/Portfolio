-- CreateTable
CREATE TABLE "ToolLead" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "toolSlug" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "email" TEXT,
    "inputsJson" JSONB NOT NULL,
    "resultJson" JSONB,
    "source" TEXT NOT NULL,

    CONSTRAINT "ToolLead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ToolLead_createdAt_idx" ON "ToolLead"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "ToolLead_toolSlug_idx" ON "ToolLead"("toolSlug");
