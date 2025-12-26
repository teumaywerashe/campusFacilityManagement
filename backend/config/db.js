// backend/db.js
import { PrismaClient } from "@prisma/client";

const prisma =
  //     new PrismaClient();
  // import { PrismaClient } from "@prisma/client";

  // export default
  new PrismaClient({
    // Add this for cloud/deployment to avoid connection issues
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

export default prisma;
