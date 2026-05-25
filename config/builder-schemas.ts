import type { RuntimeSchema } from "@/types";

const crm: RuntimeSchema = {
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
      props: { layout: "pipeline", owner: "Revenue Ops" },
      children: [
        { id: "metric-pipeline", name: "Pipeline Health", type: "metric", props: { value: "$842k", delta: "+12%" } },
        { id: "metric-risk", name: "At-Risk Accounts", type: "metric", props: { value: "14", delta: "-3" } },
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
        { id: "activity-feed", name: "Deal Activity Feed", type: "activity", props: { items: 18, priority: "High" } },
      ],
    },
  ],
};

const hr: RuntimeSchema = {
  id: "hr-runtime",
  templateId: "tpl_hr",
  appName: "People Operations Hub",
  version: 5,
  lastModified: "9 minutes ago",
  connection: "connected",
  components: [
    {
      id: "page-hr",
      name: "HR Dashboard",
      type: "page",
      props: { layout: "people", owner: "People Ops" },
      children: [
        { id: "metric-headcount", name: "Headcount", type: "metric", props: { value: "214", delta: "+8" } },
        { id: "metric-onboarding", name: "Onboarding Queue", type: "metric", props: { value: "11", delta: "+4" } },
        { id: "chart-hiring", name: "Hiring Funnel", type: "chart", props: { range: "30 days", confidence: "Medium" } },
        {
          id: "table-employees",
          name: "Employee Directory",
          type: "table",
          props: { rows: 214, status: "Synced" },
          fields: [
            { id: "employee", label: "Employee", type: "text" },
            { id: "team", label: "Team", type: "select" },
            { id: "startDate", label: "Start Date", type: "date" },
            { id: "status", label: "Status", type: "status" },
          ],
        },
        { id: "workflow-onboarding", name: "Onboarding Workflow", type: "workflow", props: { steps: 7, status: "Active" } },
      ],
    },
  ],
};

const admin: RuntimeSchema = {
  id: "admin-runtime",
  templateId: "tpl_admin",
  appName: "Admin Control Plane",
  version: 10,
  lastModified: "4 minutes ago",
  connection: "connected",
  components: [
    {
      id: "page-admin",
      name: "Admin Panel",
      type: "page",
      props: { layout: "control", owner: "Internal Ops" },
      children: [
        { id: "metric-users", name: "Active Users", type: "metric", props: { value: "1,284", delta: "+41" } },
        { id: "metric-incidents", name: "Open Incidents", type: "metric", props: { value: "3", delta: "-2" } },
        { id: "chart-audit", name: "Audit Volume", type: "chart", props: { range: "7 days", confidence: "High" } },
        {
          id: "table-roles",
          name: "Role Matrix",
          type: "table",
          props: { rows: 36, status: "Governed" },
          fields: [
            { id: "role", label: "Role", type: "text" },
            { id: "scope", label: "Scope", type: "select" },
            { id: "users", label: "Users", type: "number" },
            { id: "risk", label: "Risk", type: "status" },
          ],
        },
        { id: "activity-audit", name: "Audit Stream", type: "activity", props: { items: 64, priority: "Critical" } },
      ],
    },
  ],
};

const analytics: RuntimeSchema = {
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
};

const inventory: RuntimeSchema = {
  id: "inventory-runtime",
  templateId: "tpl_inventory",
  appName: "Inventory Operations System",
  version: 7,
  lastModified: "12 minutes ago",
  connection: "connected",
  components: [
    {
      id: "page-inventory",
      name: "Inventory System",
      type: "page",
      props: { layout: "supply", owner: "Supply Ops" },
      children: [
        { id: "metric-stock", name: "Stock Accuracy", type: "metric", props: { value: "98.2%", delta: "+1.1%" } },
        { id: "metric-reorder", name: "Reorder Queue", type: "metric", props: { value: "27", delta: "+6" } },
        { id: "chart-movement", name: "Stock Movement", type: "chart", props: { range: "14 days", confidence: "High" } },
        {
          id: "table-stock",
          name: "Warehouse Stock Table",
          type: "table",
          props: { rows: 486, status: "Live" },
          fields: [
            { id: "sku", label: "SKU", type: "text" },
            { id: "warehouse", label: "Warehouse", type: "select" },
            { id: "quantity", label: "Quantity", type: "number" },
            { id: "reorder", label: "Reorder Status", type: "status" },
          ],
        },
        { id: "workflow-vendors", name: "Vendor Reorder Workflow", type: "workflow", props: { steps: 5, status: "Active" } },
      ],
    },
  ],
};

const support: RuntimeSchema = {
  id: "support-runtime",
  templateId: "tpl_support",
  appName: "Support Triage Workspace",
  version: 6,
  lastModified: "5 minutes ago",
  connection: "connected",
  components: [
    {
      id: "page-support",
      name: "Support Workspace",
      type: "page",
      props: { layout: "queue", owner: "Customer Ops" },
      children: [
        { id: "metric-sla", name: "SLA Health", type: "metric", props: { value: "91%", delta: "+5%" } },
        { id: "metric-tickets", name: "Open Tickets", type: "metric", props: { value: "73", delta: "-12" } },
        { id: "chart-response", name: "Response Trend", type: "chart", props: { range: "7 days", confidence: "Medium" } },
        {
          id: "table-tickets",
          name: "Ticket Queue",
          type: "table",
          props: { rows: 73, status: "Live" },
          fields: [
            { id: "ticket", label: "Ticket", type: "text" },
            { id: "customer", label: "Customer", type: "text" },
            { id: "sla", label: "SLA", type: "status" },
            { id: "owner", label: "Owner", type: "select" },
          ],
        },
        { id: "activity-escalations", name: "Escalation Feed", type: "activity", props: { items: 9, priority: "High" } },
      ],
    },
  ],
};

export const runtimeSchemas: RuntimeSchema[] = [crm, hr, admin, analytics, inventory, support];

export function getRuntimeSchema(schemaId?: string) {
  return runtimeSchemas.find((schema) => schema.id === schemaId) ?? crm;
}
