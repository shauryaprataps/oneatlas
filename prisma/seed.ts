import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const templates = [
  {
    id: "tpl_crm",
    slug: "crm-workspace",
    name: "CRM Workspace",
    category: "Sales Ops",
    complexity: "Moderate",
    schemaDefaults: {},
  },
  {
    id: "tpl_hr",
    slug: "hr-dashboard",
    name: "HR Dashboard",
    category: "People Ops",
    complexity: "Simple",
    schemaDefaults: {},
  },
  {
    id: "tpl_admin",
    slug: "admin-panel",
    name: "Admin Panel",
    category: "Internal Ops",
    complexity: "Advanced",
    schemaDefaults: {},
  },
  {
    id: "tpl_analytics",
    slug: "analytics-dashboard",
    name: "Analytics Dashboard",
    category: "Revenue Ops",
    complexity: "Advanced",
    schemaDefaults: {},
  },
  {
    id: "tpl_inventory",
    slug: "inventory-system",
    name: "Inventory System",
    category: "Supply Ops",
    complexity: "Moderate",
    schemaDefaults: {},
  },
  {
    id: "tpl_support",
    slug: "support-workspace",
    name: "Support Workspace",
    category: "Customer Ops",
    complexity: "Simple",
    schemaDefaults: {},
  },
];

async function main() {
  // eslint-disable-next-line no-console
  console.log("Seeding templates...");

  for (const tpl of templates) {
    await prisma.template.upsert({
      where: { id: tpl.id },
      update: {
        slug: tpl.slug,
        name: tpl.name,
        category: tpl.category,
        complexity: tpl.complexity,
        schemaDefaults: tpl.schemaDefaults,
      },
      create: tpl,
    });
    // eslint-disable-next-line no-console
    console.log(`  ✓ ${tpl.id} - ${tpl.name}`);
  }

  // eslint-disable-next-line no-console
  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });