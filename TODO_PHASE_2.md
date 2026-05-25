# TODO - Phase 2 (Prisma schema evolution)

- [ ] Update `prisma/schema.prisma` to add `Mutation` model + `Preview` model
- [ ] Add relations from `App` to `Mutation[]` and `Preview[]`
- [ ] Ensure preview token uniqueness, and preserve schema version history
- [ ] Run `npx prisma migrate dev --name add_mutations_and_previews`
- [ ] Run `npx prisma generate`
- [ ] Run `npm run typecheck`
- [ ] Run `npm run build`
- [ ] Stop after verifying schema-related changes

