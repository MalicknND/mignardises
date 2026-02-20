import { PrismaClient } from "@/lib/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
  prismaPool: Pool;
};

const pool =
  globalForPrisma.prismaPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

const adapter = new PrismaPg(pool);
const accelerateUrl = process.env.PRISMA_ACCELERATE_URL;

const prisma =
  globalForPrisma.prisma ??
  (accelerateUrl
    ? new PrismaClient({ accelerateUrl })
    : new PrismaClient({ adapter }));

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaPool = pool;
}

export default prisma;
