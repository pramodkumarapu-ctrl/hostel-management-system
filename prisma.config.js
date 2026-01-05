
require("dotenv").config();
const { defineConfig, env } = require("prisma/config");

module.exports = defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Use DIRECT_URL for Prisma CLI
    url: env("DIRECT_URL"),
  },
});
