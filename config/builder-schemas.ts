import type { RuntimeSchema } from "@/types";

export const runtimeSchemas: RuntimeSchema[] = [
  {
    id: "crm-runtime",
    templateId: "tpl_crm",
    appName: "Revenue Command Center",
    version: 12,
    lastModified: "2 minutes ago",
    connection: "connected",
    components: [
      {
        id: "page-crm",
        name: "CRM Workspace",
        type: "page",
        props: { layout: "operations", owner: "Revenue Ops" },
        children: [
          { id: "metric-pipeline", name: "Pipeline Health", type: "metric", props: { value: "$842k", delta: "+12%" } },
          { id: "chart-revenue", name: "Revenue Forecast", type: "chart", props: { range: "90 days", confidence: "High" } },
          {
            id: "table-accounts",
            name: "Accounts Table",
            type: "table",
            props: { rows: 128, status: "Live" },
            fields: [
              { id: "account", label: "Account", type: "text" },
              { id: "owner", label: "Owner", type: "select" },
              { id: "stage", label: "Stage", type: "status" },
              { id: "value", label: "Value", type: "number" },
            ],
          },
          { id: "activity-feed", name: "Activity Feed", type: "activity", props: { items: 18, priority: "High" } },
        ],
      },
    ],
  },
  {
    id: "analytics-runtime",
    templateId: "tpl_analytics",
    appName: "Analytics Workspace",
    version: 8,
    lastModified: "6 minutes ago",
    connection: "connected",
    components: [
      {
        id: "page-analytics",
        name: "Analytics Dashboard",
        type: "page",
        props: { layout: "executive", owner: "Data Ops" },
        children: [
          { id: "metric-arr", name: "ARR", type: "metric", props: { value: "$3.8M", delta: "+9%" } },
          { id: "metric-retention", name: "Retention", type: "metric", props: { value: "94%", delta: "+2%" } },
          { id: "chart-cohort", name: "Cohort Trend", type: "chart", props: { range: "12 months", confidence: "Medium" } },
          {
            id: "table-segments",
            name: "Segment Table",
            type: "table",
            props: { rows: 42, status: "Live" },
            fields: [
              { id: "segment", label: "Segment", type: "text" },
              { id: "growth", label: "Growth", type: "number" },
              { id: "risk", label: "Risk", type: "status" },
            ],
          },
        ],
      },
    ],
  },
];

export function getRuntimeSchema(schemaId?: string) {
  return runtimeSchemas.find((schema) => schema.id === schemaId) ?? runtimeSchemas[0];
}
