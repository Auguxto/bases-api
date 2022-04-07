-- CreateTable
CREATE TABLE "towers" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "vpn" BOOLEAN NOT NULL DEFAULT false,
    "mikrotik" BOOLEAN NOT NULL DEFAULT false,
    "cityId" TEXT NOT NULL,

    CONSTRAINT "towers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "towers_ip_key" ON "towers"("ip");

-- CreateIndex
CREATE UNIQUE INDEX "towers_name_key" ON "towers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "cities_name_key" ON "cities"("name");

-- AddForeignKey
ALTER TABLE "towers" ADD CONSTRAINT "towers_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
