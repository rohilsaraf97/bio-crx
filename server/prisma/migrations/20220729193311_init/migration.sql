-- CreateTable
CREATE TABLE "Url" (
    "url_id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "bioBody" TEXT NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("url_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_url_key" ON "Url"("url");
