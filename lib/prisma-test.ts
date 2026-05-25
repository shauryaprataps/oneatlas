import { prisma } from "@/lib/prisma";

async function main() {
  const count = await prisma.app.count();
  console.log("App row count:", count);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

