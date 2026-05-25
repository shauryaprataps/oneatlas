# OneAtlas — AI-Native Runtime App Platform

Build internal applications that remain editable after generation.

OneAtlas converts prompts into persistent runtime schemas using deterministic template matching, stores versions in a database, and enables conversational edits without regenerating entire applications.

---

## Features

### Prompt → Runtime Generation
Generate operational applications from prompts:

Examples:

Build CRM dashboard
Create HR management system
Build inventory tracker
Generate analytics workspace
Create admin panel

Prompt
↓
Deterministic template matcher
↓
Template selected
↓
App persisted
↓
RuntimeSchema persisted
↓
SchemaVersion(version=1) created
↓
Open builder

## Local Setup

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

## Architecture

The frontend is template-first and schema-driven. Template metadata lives in `config/templates.ts`, runtime mock schemas live in `config/builder-schemas.ts`, shared contracts live in `/types`, and builder state is isolated in a Zustand store. The builder canvas renders from schema data instead of static placeholders, matching the brief's runtime-generated product philosophy.

##Tech Stack

Frontend:

Next.js 15
React
TypeScript
TailwindCSS
Zustand

Backend:

Next.js API Routes
Prisma ORM
Neon PostgreSQL

Database:

PostgreSQL (Neon)

Runtime:

Persistent Runtime Schemas
Versioned Mutations
