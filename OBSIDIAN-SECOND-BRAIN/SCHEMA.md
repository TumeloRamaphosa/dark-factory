# Schema — Dark Factory Knowledge Base
## llm_wiki Structure Rules

**Purpose:** This wiki is the persistent memory and knowledge base for [[Cipher Tr@ce]] and the Dark Factory. It is the single source of truth for clients, products, engineering decisions, partnerships, and revenue.

---

## Page Types

### Entity Pages (`/wiki/entities/`)
For **people, organizations, products, and VM instances**.
- Frontmatter: `type: entity`, `name`, `created`, `tags`
- Naming: `First-Last.md` for people, `Organization-Name.md` for orgs

**Examples:**
- `entities/Tumelo-Ramaphosa.md` — Founder, Studex Group
- `entities/LAISA-Aesthetic-Clinic.md` — Client, Phase A
- `entities/DARK-FAC#ORY-VM.md` — Primary development VM
- `entities/Pharmasyntez.md` — Russia pharma partner

### Concept Pages (`/wiki/concepts/`)
For **theories, methods, frameworks, and architectural patterns**.
- Frontmatter: `type: concept`, `name`, `domain`, `tags`
- Naming: `concept-name.md`

**Examples:**
- `concepts/agentic-ai.md` — Multi-agent orchestration
- `concepts/vm-isolation.md` — Why isolated VMs matter
- `concepts/BMAD-model.md` — Build Me A Dashboard model
- `concepts/PRD-intake.md` — 4-step PRD wizard process

### Source Pages (`/wiki/sources/`)
For **summaries of raw source documents**.
- Frontmatter: `type: source`, `source-path`, `date`, `tags`
- Naming: `source-document-name.md`

### Query Pages (`/wiki/queries/`)
For **saved research answers and agent research outputs**.
- Frontmatter: `type: query`, `question`, `date`, `confidence`
- Naming: `query-short-title.md`

### Synthesis Pages (`/wiki/synthesis/`)
For **cross-source analysis and insights**.
- Frontmatter: `type: synthesis`, `topic`, `date`, `confidence`

---

## Linking Conventions

- Always use `[[wikilinks]]` for internal references
- Tag cross-references: `see [[entity/Name]]`
- Confidence scores: `confidence: high | medium | low`
- Use `> [!info]` callouts for important notes
- Use `> [!warning]` callouts for blockers

---

## Quality Rules

1. Every page MUST have frontmatter with `type`, `name`, `created`
2. Every page MUST link to at least 2 other wiki pages
3. Sources MUST cite the raw source path in frontmatter
4. Query pages MUST include the original question
5. Update `log.md` after every significant knowledge addition

---

## Maintenance

- Run lint check weekly: `llm_wiki lint`
- Check for orphan pages (pages with no incoming links)
- Update `overview.md` when major new knowledge is added
- Archive queries older than 90 days to `archive/queries/`

---

*Schema version: 1.0 — Dark Factory Vault*
*Maintained by: [[Cipher Tr@ce]]*
