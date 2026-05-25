import { parseMutation, applyMutation } from "./schemaMutator";
import type { RuntimeSchema } from "@/types/builder";

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

// Create a test schema
function createTestSchema(): RuntimeSchema {
  return {
    id: "test-runtime",
    templateId: "tpl_test",
    appName: "Test App",
    version: 1,
    lastModified: "now",
    connection: "connected",
    metadata: {
      runtimeId: "test-runtime",
      templateName: "Test",
      complexity: "Simple",
      lastMutation: "Initial",
      created: "now",
      lastEdited: "now",
      environment: "Production",
      mutationCount: 0,
      previewCount: 0,
      status: "connected",
    },
    history: [],
    recentInstructions: [],
    previews: [],
    diff: [],
    components: [
      {
        id: "page-main",
        name: "Main Page",
        type: "page",
        props: {},
        children: [
          {
            id: "table-contacts",
            name: "Contacts Table",
            type: "table",
            props: { rows: 100 },
            fields: [
              { id: "name", label: "Name", type: "text" },
              { id: "email", label: "Email", type: "text" },
              { id: "status", label: "Status", type: "status" },
            ],
          },
          {
            id: "metric-total",
            name: "Total Contacts",
            type: "metric",
            props: { value: "100" },
          },
        ],
      },
    ],
  };
}

function run() {
  // ==========================================
  // Pattern 1: Add field tests
  // ==========================================
  {
    const res = parseMutation("Add priority field");
    assert(res.success === true, "Add priority field should parse");
    if (res.parsed) {
      assertEq(res.parsed.type, "add_field", "Add field type");
      assertEq(res.parsed.params.fieldName, "priority", "Field name");
      assertEq(res.parsed.summary, "Added priority field", "Summary");
    }
  }

  {
    const res = parseMutation("Add status column");
    assert(res.success === true, "Add status column should parse");
    if (res.parsed) {
      assertEq(res.parsed.params.fieldName, "status", "Field name");
    }
  }

  {
    const res = parseMutation("Add priority field to contacts");
    assert(res.success === true, "Add field to component should parse");
    if (res.parsed) {
      assertEq(res.parsed.params.targetComponent, "contacts", "Target component");
    }
  }

  // ==========================================
  // Pattern 2: Rename field tests
  // ==========================================
  {
    const res = parseMutation("Rename contact to client");
    assert(res.success === true, "Rename contact to client should parse");
    if (res.parsed) {
      assertEq(res.parsed.type, "rename_field", "Rename field type");
      assertEq(res.parsed.params.oldName, "contact", "Old name");
      assertEq(res.parsed.params.newName, "client", "New name");
    }
  }

  {
    const res = parseMutation("Rename owner as assigned");
    assert(res.success === true, "Rename owner as assigned should parse");
    if (res.parsed) {
      assertEq(res.parsed.params.oldName, "owner", "Old name");
      assertEq(res.parsed.params.newName, "assigned", "New name");
    }
  }

  // ==========================================
  // Pattern 3: Remove field tests
  // ==========================================
  {
    const res = parseMutation("Remove notes");
    assert(res.success === true, "Remove notes should parse");
    if (res.parsed) {
      assertEq(res.parsed.type, "remove_field", "Remove field type");
      assertEq(res.parsed.params.name, "notes", "Field name");
    }
  }

  {
    const res = parseMutation("Delete priority column");
    assert(res.success === true, "Delete priority column should parse");
    if (res.parsed) {
      assertEq(res.parsed.params.name, "priority", "Field name");
    }
  }

  // ==========================================
  // Pattern 4: Move section tests
  // ==========================================
  {
    const res = parseMutation("Move analytics to top");
    assert(res.success === true, "Move analytics to top should parse");
    if (res.parsed) {
      assertEq(res.parsed.type, "move_section", "Move section type");
      assertEq(res.parsed.params.section, "analytics", "Section name");
      assertEq(res.parsed.params.direction, "to", "Direction");
      assertEq(res.parsed.params.target, "top", "Target");
    }
  }

  {
    const res = parseMutation("Move table below chart");
    assert(res.success === true, "Move table below chart should parse");
    if (res.parsed) {
      assertEq(res.parsed.params.section, "table", "Section name");
      assertEq(res.parsed.params.direction, "below", "Direction");
    }
  }

  // ==========================================
  // Pattern 5: Add component tests
  // ==========================================
  {
    const res = parseMutation("Add activity feed");
    assert(res.success === true, "Add activity feed should parse");
    if (res.parsed) {
      assertEq(res.parsed.type, "add_component", "Add component type");
      assertEq(res.parsed.params.componentType, "activity", "Component type");
      assertEq(res.parsed.params.componentName, "feed", "Component name");
    }
  }

  {
    const res = parseMutation("Add metric pipeline health");
    assert(res.success === true, "Add metric should parse");
    if (res.parsed) {
      assertEq(res.parsed.params.componentType, "metric", "Component type");
    }
  }

  // ==========================================
  // Unknown instruction tests
  // ==========================================
  {
    const res = parseMutation("Make it pretty");
    assert(res.success === false, "Unknown instruction should not parse");
    assert(res.error !== undefined, "Should have error message");
    assert(String(res.error).includes("Unknown instruction"), "Error should mention unknown instruction");
  }

  {
    const res = parseMutation("");
    assert(res.success === false, "Empty instruction should not parse");
  }

  // ==========================================
  // applyMutation tests
  // ==========================================

  // Test: add_field adds a field to table
  {
    const schema = createTestSchema();
    const mutation = {
      type: "add_field" as const,
      instruction: "Add priority field",
      summary: "Added priority field",
      params: { fieldName: "priority", targetType: "field" },
    };

    const result = applyMutation(schema, mutation);

    const tableComponent = result.components[0].children?.find(
      (c) => c.type === "table"
    );
    assert(tableComponent?.fields?.length === 4, "Should have 4 fields after adding");
    assert(
      tableComponent?.fields?.some((f) => f.label === "Priority"),
      "Should have Priority field"
    );
  }

  // Test: add_field does not add duplicate
  {
    const schema = createTestSchema();
    const mutation = {
      type: "add_field" as const,
      instruction: "Add name field",
      summary: "Added name field",
      params: { fieldName: "name", targetType: "field" },
    };

    const result = applyMutation(schema, mutation);

    const tableComponent = result.components[0].children?.find(
      (c) => c.type === "table"
    );
    assert(tableComponent?.fields?.length === 3, "Should still have 3 fields (no duplicate)");
  }

  // Test: add_field infers correct type for priority (status)
  {
    const schema = createTestSchema();
    const mutation = {
      type: "add_field" as const,
      instruction: "Add priority field",
      summary: "Added priority field",
      params: { fieldName: "priority", targetType: "field" },
    };

    const result = applyMutation(schema, mutation);

    const tableComponent = result.components[0].children?.find(
      (c) => c.type === "table"
    );
    const priorityField = tableComponent?.fields?.find((f) => f.label === "Priority");
    assertEq(priorityField?.type, "status", "Priority field should be status type");
  }

  // Test: add_field infers correct type for amount (number)
  {
    const schema = createTestSchema();
    const mutation = {
      type: "add_field" as const,
      instruction: "Add amount field",
      summary: "Added amount field",
      params: { fieldName: "amount", targetType: "field" },
    };

    const result = applyMutation(schema, mutation);

    const tableComponent = result.components[0].children?.find(
      (c) => c.type === "table"
    );
    const amountField = tableComponent?.fields?.find((f) => f.label === "Amount");
    assertEq(amountField?.type, "number", "Amount field should be number type");
  }

  // Test: rename_field renames a field
  {
    const schema = createTestSchema();
    const mutation = {
      type: "rename_field" as const,
      instruction: "Rename name to title",
      summary: "Renamed name to title",
      params: { oldName: "name", newName: "title" },
    };

    const result = applyMutation(schema, mutation);

    // Find the renamed field in children components
    let found = false;
    for (const component of result.components) {
      if (component.children) {
        for (const child of component.children) {
          if (child.fields) {
            if (child.fields.some((f) => f.label === "Title")) {
              found = true;
            }
          }
        }
      }
    }
    assert(found, "Should have renamed field 'Title'");
  }

  // Test: remove_field removes a field
  {
    const schema = createTestSchema();
    const mutation = {
      type: "remove_field" as const,
      instruction: "Remove status",
      summary: "Removed status",
      params: { name: "status" },
    };

    const result = applyMutation(schema, mutation);

    const tableComponent = result.components[0].children?.find(
      (c) => c.type === "table"
    );
    assert(tableComponent?.fields?.length === 2, "Should have 2 fields after removing");
    assert(
      !tableComponent?.fields?.some((f) => f.label === "Status"),
      "Should not have Status field"
    );
  }

  // Test: move_section moves a section to top
  {
    const schema = createTestSchema();
    schema.components.push({
      id: "page-analytics",
      name: "Analytics Section",
      type: "page",
      props: {},
    });

    const mutation = {
      type: "move_section" as const,
      instruction: "Move analytics to top",
      summary: "Moved analytics to top",
      params: { section: "analytics", direction: "to", target: "top" },
    };

    const result = applyMutation(schema, mutation);

    assert(result.components[0].name === "Analytics Section", "Analytics should be first");
  }

  // Test: add_component adds a component to the page
  {
    const schema = createTestSchema();
    const mutation = {
      type: "add_component" as const,
      instruction: "Add activity feed",
      summary: "Added activity: feed",
      params: { componentType: "activity", componentName: "feed" },
    };

    const result = applyMutation(schema, mutation);

    const pageComponent = result.components.find((c) => c.type === "page");
    assert(pageComponent?.children?.length === 3, "Should have 3 children (metric, table, activity)");
  }

  // Test: metadata updates - version increment
  {
    const schema = createTestSchema();
    assertEq(schema.version, 1, "Initial version");

    const mutation = {
      type: "add_field" as const,
      instruction: "Add priority field",
      summary: "Added priority field",
      params: { fieldName: "priority", targetType: "field" },
    };

    const result = applyMutation(schema, mutation);
    assertEq(result.version, 2, "Version should increment");
  }

  // Test: metadata updates - mutationCount increment
  {
    const schema = createTestSchema();
    assertEq(schema.metadata.mutationCount, 0, "Initial mutationCount");

    const mutation = {
      type: "add_field" as const,
      instruction: "Add priority field",
      summary: "Added priority field",
      params: { fieldName: "priority", targetType: "field" },
    };

    const result = applyMutation(schema, mutation);
    assertEq(result.metadata.mutationCount, 1, "mutationCount should increment");
  }

  // Test: metadata updates - lastMutation
  {
    const schema = createTestSchema();
    const mutation = {
      type: "add_field" as const,
      instruction: "Add priority field",
      summary: "Added priority field",
      params: { fieldName: "priority", targetType: "field" },
    };

    const result = applyMutation(schema, mutation);
    assertEq(result.metadata.lastMutation, "Added priority field", "lastMutation should update");
  }

  // Test: metadata updates - diff
  {
    const schema = createTestSchema();
    const mutation = {
      type: "add_field" as const,
      instruction: "Add priority field",
      summary: "Added priority field",
      params: { fieldName: "priority", targetType: "field" },
    };

    const result = applyMutation(schema, mutation);
    assert(result.diff.includes("+ Added priority field"), "diff should include the change");
  }

  // Test: metadata updates - history
  {
    const schema = createTestSchema();
    const mutation = {
      type: "add_field" as const,
      instruction: "Add priority field",
      summary: "Added priority field",
      params: { fieldName: "priority", targetType: "field" },
    };

    const result = applyMutation(schema, mutation);
    assert(result.history.length === 1, "history should have 1 entry");
    assertEq(result.history[0].title, "Added priority field", "history title");
  }

  // eslint-disable-next-line no-console
  console.log("schemaMutator runner: PASS");
}

run();