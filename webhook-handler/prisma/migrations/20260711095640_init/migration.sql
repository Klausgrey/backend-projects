-- CreateTable
CREATE TABLE "Webhook" (
    "id" SERIAL NOT NULL,
    "event" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "source" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Webhook_pkey" PRIMARY KEY ("id")
);
