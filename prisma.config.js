// prisma.config.js
require("dotenv").config();           // Load environment variables
const { defineConfig, env } = require("prisma/config");  // CommonJS require

module.exports = defineConfig({
  schema: "prisma/schema.prisma",       // Path to your Prisma schema
  migrations: {
    path: "prisma/migrations",          // Path to migrations folder
  },
  datasource: {
    url: env("DATABASE_URL"),           // Database URL from .env
  },
});
