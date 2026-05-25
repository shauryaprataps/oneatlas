import { matchTemplate } from "./templateMatcher";

type Template = {
  id: string;
  name: string;
  tags: string[];
};

const templates: Template[] = [
  {
    id: "tpl_crm",
    name: "CRM Workspace",
    tags: ["crm", "sales", "accounts", "pipeline"],
  },
  {
    id: "tpl_inventory",
    name: "Inventory System",
    tags: ["inventory", "supply", "warehouse", "vendors"],
  },
];

function assert(cond: unknown, message: string): void {
  if (!cond) {
    // eslint-disable-next-line no-console
    console.error("Assertion failed:", message);
    process.exit(1);
  }
}

function assertEq(actual: unknown, expected: unknown, message: string): void {
  assert(actual === expected, `${message}. expected=${String(expected)} actual=${String(actual)}`);
}

function run() {
  {
    const res = matchTemplate({
      prompt: "Build CRM dashboard",
      templates,
      // Threshold=2 so a single deterministic exact+partial mapping is sufficient.
      threshold: 2,
    });
    assert(res.matched === true, "CRM prompt should match");
    if (res.matched) assertEq(res.template.id, "tpl_crm", "CRM template id");
  }

  {
    const res = matchTemplate({
      prompt: "Inventory tracker",
      templates,
      // Threshold=2 so a single deterministic exact+partial mapping is sufficient.
      threshold: 2,
    });
    assert(res.matched === true, "Inventory prompt should match");
    if (res.matched) assertEq(res.template.id, "tpl_inventory", "Inventory template id");
  }

  {
    const res = matchTemplate({
      prompt: "Completely unrelated prompt",
      templates,
      threshold: 2,
    });
    assert(res.matched === false, "Unknown prompt should not match");
    if (!res.matched) assert(res.suggestion.includes("CRM"), "Unknown prompt should suggest CRM");
  }

  // eslint-disable-next-line no-console
  console.log("templateMatcher runner: PASS");
}

run();

