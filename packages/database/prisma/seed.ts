import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const passwordHash = await bcrypt.hash("demo123", 12);

  const user = await prisma.user.upsert({
    where: { email: "demo@intelliwave.com" },
    update: {},
    create: {
      email: "demo@intelliwave.com",
      username: "demo",
      passwordHash,
      firstName: "Demo",
      lastName: "User",
      role: "USER",
      status: "ACTIVE",
      emailVerified: true,
    },
  });

  console.log("Created demo user:", user.email);
  console.log("Password: demo123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });