import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// The CLI (migrate, generate) connects through DIRECT_URL, the session pooler.
// The running app uses DATABASE_URL through the pg adapter (see PrismaService).
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DIRECT_URL"),
  },
});
