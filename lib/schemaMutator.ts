import type { RuntimeSchema } from "@/types/builder";
import type { BuilderComponentNode, BuilderField } from "@/types/builder";

/**
 * Deterministic schema mutation parser.
 * 
 * Supports 5 mutation patterns:
 * 1. Add field - "Add priority field", "Add status column"
 * 2. Rename field - "Rename contact to client", "Rename owner to assigned"
 * 3. Remove field - "Remove notes", "Delete priority column"
 * 4. Move section - "Move analytics to top", "Move table below chart"
 * 5. Add component - "Add activity feed", "Add metric"
 */

export type MutationType =
  | "add_field"
  | "rename_field"
  | "remove_field"
  | "move_section"
  | "add_component";

export interface ParsedMutation {
  type: MutationType;
  instruction: string;
  summary: string;
  params: Record<string, string>;
}

export interface MutationResult {
  success: boolean;
  parsed: ParsedMutation | null;
  error?: string;
}

/**
 * Parse a natural language instruction into a deterministic mutation command.
 */
export function parseMutation(instruction: string): MutationResult {
  const lower = instruction.toLowerCase().trim();

  // Pattern 1: Add field - "Add <name> field", "Add <name> column"
  const addFieldMatch = lower.match(/^add\s+(\w+)\s+(field|column)(?:\s+to\s+(\w+))?/i);
  if (addFieldMatch) {
    const fieldName = addFieldMatch[1];
    const targetType = addFieldMatch[2];
    const targetComponent = addFieldMatch[3];
    return {
      success: true,
      parsed: {
        type: "add_field",
        instruction,
        summary: `Added ${fieldName} ${targetType}`,
        params: { fieldName, targetType, targetComponent: targetComponent || "" },
      },
    };
  }

  // Pattern 2: Rename field - "Rename <old> to <new>", "Rename <old> as <new>"
  const renameMatch = lower.match(/^rename\s+(\w+)\s+(to|as)\s+(\w+)/i);
  if (renameMatch) {
    const oldName = renameMatch[1];
    const newName = renameMatch[3];
    return {
      success: true,
      parsed: {
        type: "rename_field",
        instruction,
        summary: `Renamed ${oldName} to ${newName}`,
        params: { oldName, newName },
      },
    };
  }

  // Pattern 3: Remove field - "Remove <name>", "Delete <name>", "Remove <name> field/column"
  const removeMatch = lower.match(/^(remove|delete)\s+(\w+)(?:\s+(field|column|section|component))?/i);
  if (removeMatch) {
    const name = removeMatch[2];
    const removeType = removeMatch[3] || "field";
    return {
      success: true,
      parsed: {
        type: "remove_field",
        instruction,
        summary: `Removed ${name}`,
        params: { name, removeType },
      },
    };
  }

  // Pattern 4: Move section - "Move <section> to <position>", "Move <section> above/below <target>"
  const moveMatch = lower.match(/^move\s+(\w[\w\s]*?)\s+(to|above|below|before|after)\s+(top|bottom|\w[\w\s]*)/i);
  if (moveMatch) {
    const section = moveMatch[1].trim();
    const direction = moveMatch[2];
    const target = moveMatch[3].trim();
    return {
      success: true,
      parsed: {
        type: "move_section",
        instruction,
        summary: `Moved ${section} ${direction} ${target}`,
        params: { section, direction, target },
      },
    };
  }

  // Pattern 5: Add component - "Add <type> <name>", "Add <name> <type>"
  const addComponentMatch = lower.match(/^add\s+(metric|chart|table|activity|feed|workflow|section)\s+(?:a\s+)?(\w[\w\s]*)/i);
  if (addComponentMatch) {
    const componentType = addComponentMatch[1];
    const componentName = addComponentMatch[2].trim();
    return {
      success: true,
      parsed: {
        type: "add_component",
        instruction,
        summary: `Added ${componentType}: ${componentName}`,
        params: { componentType, componentName },
      },
    };
  }

  // Alternative pattern 5b: "Add <name> <type>"
  const addComponentMatch2 = lower.match(/^add\s+(a\s+)?(\w[\w\s]*)\s+(metric|chart|table|activity|feed|workflow|section)/i);
  if (addComponentMatch2) {
    const componentName = addComponentMatch2[2].trim();
    const componentType = addComponentMatch2[3];
    return {
      success: true,
      parsed: {
        type: "add_component",
        instruction,
        summary: `Added ${componentType}: ${componentName}`,
        params: { componentType, componentName },
      },
    };
  }

  return {
    success: false,
    parsed: null,
    error: `Unknown instruction: "${instruction}". Supported patterns: Add field, Rename field, Remove field, Move section, Add component.`,
  };
}

/**
 * Apply a parsed mutation to a RuntimeSchema, returning the updated schema.
 * This performs incremental mutations only - does not replace the full schema.
 */
export function applyMutation(schema: RuntimeSchema, mutation: ParsedMutation): RuntimeSchema {
  const updatedSchema = deepClone(schema);

  switch (mutation.type) {
    case "add_field": {
      const { fieldName, targetComponent } = mutation.params;
      const newField: BuilderField = {
        id: `${fieldName.toLowerCase()}-${Date.now()}`,
        label: capitalizeFirst(fieldName),
        type: inferFieldType(fieldName),
      };

      // Find target component (first table-like component if not specified)
      const target = findTargetComponent(updatedSchema, targetComponent);
      if (target && target.type === "table") {
        if (!target.fields) target.fields = [];
        // Check if field already exists
        const exists = target.fields.some((f) => f.label.toLowerCase() === fieldName.toLowerCase());
        if (!exists) {
          target.fields.push(newField);
        }
      }
      break;
    }

    case "rename_field": {
      const { oldName, newName } = mutation.params;
      const oldLower = oldName.toLowerCase();
      
      for (const component of updatedSchema.components) {
        if (component.fields) {
          for (const field of component.fields) {
            if (field.label.toLowerCase() === oldLower || field.id.toLowerCase() === oldLower) {
              field.label = capitalizeFirst(newName);
              field.id = `${newName.toLowerCase()}-${field.id.split("-").slice(1).join("-")}`;
            }
          }
        }
        // Also check children
        if (component.children) {
          renameInChildren(component.children, oldLower, newName);
        }
      }
      break;
    }

    case "remove_field": {
      const { name } = mutation.params;
      const nameLower = name.toLowerCase();

      for (const component of updatedSchema.components) {
        if (component.fields) {
          component.fields = component.fields.filter(
            (f) => f.label.toLowerCase() !== nameLower && f.id.toLowerCase() !== nameLower
          );
        }
        if (component.children) {
          component.children = removeInChildren(component.children, nameLower);
        }
      }
      break;
    }

    case "move_section": {
      const { section, direction, target } = mutation.params;
      const sectionLower = section.toLowerCase();
      const targetLower = target.toLowerCase();

      // Find and remove the section
      const sectionIndex = updatedSchema.components.findIndex(
        (c) => c.name.toLowerCase().includes(sectionLower) || c.id.toLowerCase().includes(sectionLower)
      );

      if (sectionIndex === -1) break;

      const [movedSection] = updatedSchema.components.splice(sectionIndex, 1);

      // Determine new position
      let newIndex = 0;
      if (direction === "to" && targetLower === "top") {
        newIndex = 0;
      } else if (direction === "to" && targetLower === "bottom") {
        newIndex = updatedSchema.components.length;
      } else if (direction === "above" || direction === "before") {
        const targetIndex = updatedSchema.components.findIndex(
          (c) => c.name.toLowerCase().includes(targetLower) || c.id.toLowerCase().includes(targetLower)
        );
        newIndex = targetIndex >= 0 ? targetIndex : 0;
      } else if (direction === "below" || direction === "after") {
        const targetIndex = updatedSchema.components.findIndex(
          (c) => c.name.toLowerCase().includes(targetLower) || c.id.toLowerCase().includes(targetLower)
        );
        newIndex = targetIndex >= 0 ? targetIndex + 1 : updatedSchema.components.length;
      }

      updatedSchema.components.splice(newIndex, 0, movedSection);
      break;
    }

    case "add_component": {
      const { componentType, componentName } = mutation.params;
      const newComponent: BuilderComponentNode = {
        id: `${componentType}-${componentName.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
        name: capitalizeFirst(componentName),
        type: componentType as BuilderComponentNode["type"],
        props: {},
      };

      // Add at the end of the first page component, or as a new page
      const pageComponent = updatedSchema.components.find((c) => c.type === "page");
      if (pageComponent) {
        if (!pageComponent.children) pageComponent.children = [];
        pageComponent.children.push(newComponent);
      } else {
        updatedSchema.components.push(newComponent);
      }
      break;
    }
  }

  // Update metadata
  updatedSchema.metadata.mutationCount = (updatedSchema.metadata.mutationCount || 0) + 1;
  updatedSchema.metadata.lastMutation = mutation.summary;
  updatedSchema.metadata.lastEdited = "just now";
  updatedSchema.version = (updatedSchema.version || 0) + 1;
  updatedSchema.lastModified = "just now";

  // Add to diff
  const diffEntry = mutation.type === "remove_field" 
    ? `- ${mutation.summary}` 
    : `+ ${mutation.summary}`;
  updatedSchema.diff = updatedSchema.diff || [];
  updatedSchema.diff.unshift(diffEntry);
  if (updatedSchema.diff.length > 5) {
    updatedSchema.diff = updatedSchema.diff.slice(0, 5);
  }

  // Add to history
  const historyEntry = {
    time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    title: mutation.summary,
    detail: mutation.instruction,
    tone: "success" as const,
  };
  updatedSchema.history = updatedSchema.history || [];
  updatedSchema.history.unshift(historyEntry);
  if (updatedSchema.history.length > 10) {
    updatedSchema.history = updatedSchema.history.slice(0, 10);
  }

  return updatedSchema;
}

// Helper functions

function deepClone<T>(val: T): T {
  return JSON.parse(JSON.stringify(val)) as T;
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function inferFieldType(fieldName: string): BuilderField["type"] {
  const lower = fieldName.toLowerCase();
  if (lower.includes("date") || lower.includes("time")) return "date";
  if (lower.includes("count") || lower.includes("amount") || lower.includes("value") || lower.includes("price")) return "number";
  if (lower.includes("status") || lower.includes("priority") || lower.includes("stage")) return "status";
  if (lower.includes("type") || lower.includes("category") || lower.includes("owner")) return "select";
  return "text";
}

function findTargetComponent(
  schema: RuntimeSchema,
  targetName?: string
): BuilderComponentNode | null {
  if (!targetName) {
    // Return first table component
    return findFirstTableComponent(schema.components);
  }

  const targetLower = targetName.toLowerCase();
  for (const component of schema.components) {
    if (component.name.toLowerCase().includes(targetLower) || component.id.toLowerCase().includes(targetLower)) {
      return component;
    }
    if (component.children) {
      const found = findInChildren(component.children, targetLower);
      if (found) return found;
    }
  }
  return findFirstTableComponent(schema.components);
}

function findFirstTableComponent(components: BuilderComponentNode[]): BuilderComponentNode | null {
  for (const component of components) {
    if (component.type === "table") return component;
    if (component.children) {
      const found = findFirstTableComponent(component.children);
      if (found) return found;
    }
  }
  return null;
}

function findInChildren(children: BuilderComponentNode[], targetLower: string): BuilderComponentNode | null {
  for (const child of children) {
    if (child.name.toLowerCase().includes(targetLower) || child.id.toLowerCase().includes(targetLower)) {
      return child;
    }
    if (child.children) {
      const found = findInChildren(child.children, targetLower);
      if (found) return found;
    }
  }
  return null;
}

function renameInChildren(children: BuilderComponentNode[], oldLower: string, newName: string): void {
  for (const child of children) {
    if (child.fields) {
      for (const field of child.fields) {
        if (field.label.toLowerCase() === oldLower || field.id.toLowerCase() === oldLower) {
          field.label = capitalizeFirst(newName);
        }
      }
    }
    if (child.children) {
      renameInChildren(child.children, oldLower, newName);
    }
  }
}

function removeInChildren(children: BuilderComponentNode[], nameLower: string): BuilderComponentNode[] {
  return children
    .map((child) => {
      // Remove matching fields from this child
      if (child.fields) {
        child.fields = child.fields.filter(
          (f) => f.label.toLowerCase() !== nameLower && f.id.toLowerCase() !== nameLower
        );
      }
      // Recursively process children
      if (child.children) {
        return { ...child, children: removeInChildren(child.children, nameLower) };
      }
      return child;
    })
    .filter((child) => {
      // Remove children that match by name/id (only if they have no fields - i.e., they are components, not tables)
      if (child.name.toLowerCase() === nameLower || child.id.toLowerCase() === nameLower) {
        return false;
      }
      return true;
    });
}
