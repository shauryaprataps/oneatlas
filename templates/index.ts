import { crmTemplate } from "./crm";
import { inventoryTemplate } from "./inventory";
import { hrTemplate } from "./hr";
import { analyticsTemplate } from "./analytics";
import { adminTemplate } from "./admin";

export type RuntimeTemplate = {
  name: string;
  version: number;
  tags: string[];
  description: string;
  baseSchema: unknown;
};

export const runtimeTemplates = [
  crmTemplate,
  inventoryTemplate,
  hrTemplate,
  analyticsTemplate,
  adminTemplate,
];

