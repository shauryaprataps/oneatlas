# OneAtlas Platform


## Local Setup

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

## Architecture

The frontend is template-first and schema-driven. Template metadata lives in `config/templates.ts`, runtime mock schemas live in `config/builder-schemas.ts`, shared contracts live in `/types`, and builder state is isolated in a Zustand store. The builder canvas renders from schema data instead of static placeholders, matching the brief's runtime-generated product philosophy.

## Stack

Next.js 15 App Router, TypeScript strict mode, TailwindCSS, local shadcn-style UI primitives, Zustand, and Prisma schema scaffolding for Neon/PostgreSQL-backed runtime metadata.
