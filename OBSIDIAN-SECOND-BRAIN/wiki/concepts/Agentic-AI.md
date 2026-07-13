---
type: concept
name: Agentic AI
domain: artificial-intelligence
created: 2026-07-01
tags: [ai, agents, orchestration, multi-agent]
---

# Agentic AI

## Definition

Agentic AI = multiple AI agents working autonomously, each with a defined role, that coordinate to accomplish complex goals without human intervention at every step.

**Contrast with:** Single AI chatbot (one agent, one task, human-in-loop constantly).

## Dark Factory Agent Architecture

[[Cipher Tr@ce]] runs a **6-agent team** on the [[OGRE VM Cluster]]:

| Agent | Role | Schedule |
|-------|------|----------|
| [[Cipher Tr@ce]] (CEO) | Always active. Orchestration. Decision-making | 24/7 |
| Research Agent | 9-country + AI landscape intelligence | 3am daily |
| Memory Agent | Ingest session learnings into [[llm_wiki]] | Every session |
| Builder Agent | Build and deploy products | 10pm daily |
| Comms Agent | LAISA client comms, proposals | On trigger |
| Partner Agent | Jasiri, SoftBank, Flutterwave, CSIR | Mon/Wed/Fri |
| Revenue Agent | Revenue check-in, pipeline log | 5pm daily |

## Key Principles

1. **Agents have memory** — [[headroom]] for token compression, [[llm_wiki]] for persistent wiki
2. **Agents communicate via structured output** — JSON schemas, not natural language
3. **Human sets strategy, agents execute** — Tumelo = CEO, [[Cipher Tr@ce]] = COO
4. **Isolated VMs** — Each client's agents run on their own VM. Zero data mixing

## VM Isolation Model

```
Client A VM ──► Agent 1 ──► Agent 2 ──► Dashboard
Client B VM ──► Agent 1 ──► Agent 2 ──► Dashboard
Client C VM ──► Agent 1 ──► Dashboard
```

Each VM is a completely isolated Linux machine. Agents on Client A's VM cannot see, access, or interact with anything on Client B's VM.

## Tooling

- **Orchestration:** [[OpenClaw]] (MaxClaw) — session management, cron, sub-agents
- **Local coding:** [[QwenPaw]] — local LLM coding team (free, runs Qwen 2.5 locally)
- **Code review:** CodeRabbit — reviews every PR automatically
- **Memory:** [[llm_wiki]] — persistent wiki with 4-signal relevance model
- **Market intel:** [[last30days-skill]] — Reddit, X, YouTube, HN, Polymarket

## Related

- [[VM Isolation Architecture]]
- [[Dark Factory Stack]]
- [[headroom]] skill
- [[llm_wiki 3-Layer System]]