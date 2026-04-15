import { PrismaClient, TaskStatus } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  await prisma.task.deleteMany();

  await prisma.task.createMany({
    data: [
      {
        title: "Belajar TypeScript",
        description: "Belajar typing, interface, dan generics",
        status: TaskStatus.PENDING,
      },
      {
        title: "Setup PostgreSQL",
        description: "Buat database untuk project task API",
        status: TaskStatus.IN_PROGRESS,
      },
      {
        title: "Buat unit testing",
        description: "Minimal 3 unit test untuk endpoint kritis",
        status: TaskStatus.DONE,
      },
    ],
  });

  console.log("Seed data inserted.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });