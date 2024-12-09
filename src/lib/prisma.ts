import { PrismaClient as MongodbPrismaClient } from "../../prisma/generated/mongodb";
import { PrismaClient as MysqlPrismaClient } from "../../prisma/generated/mysql";

const globalForPrisma = globalThis as unknown as {
  mysqlPrisma?: MysqlPrismaClient;
  mongodbPrisma?: MongodbPrismaClient;
};

export const mysqlPrisma =
  globalForPrisma.mysqlPrisma || new MysqlPrismaClient({});

export const mongodbPrisma =
  globalForPrisma.mongodbPrisma || new MongodbPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.mysqlPrisma = mysqlPrisma;
  globalForPrisma.mongodbPrisma = mongodbPrisma;
}
