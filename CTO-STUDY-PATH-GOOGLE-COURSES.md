# CTO STUDY PATH — GOOGLE COURSES FOR AGENTIC ENGINEERING
## Chief Technical Officer: Tumelo Ramelo | Chief Engineer: AI Agent
### Updated: June 2026

---

## CONTEXT

Tumelo is studying to be CTO of Studex Group. He's currently completing the Claude introductory course (8 modules), then moving to Google Courses. The goal: master cloud infrastructure, AI/ML engineering, and agentic systems — to build and run the Ogre VM infrastructure business (LAISA Agent OS + Dark Factory).

**Current level:** Beginner to intermediate in AI/agent systems  
**Target role:** Chief Technical Officer — Studex Group  
**Time investment:** 2-3 hours/day, 5 days/week  
**Target timeline:** Solid foundation in 6 months, expert in 18 months

---

## THE LEARNING PRINCIPLES

1. **Claude Code first, then Google** — Learn to use AI coding tools before learning cloud infrastructure
2. **Build while learning** — Every course should have a project attached to it
3. **Agentic focus** — Every skill should connect to running AI agents on VMs
4. **SA context** — Apply everything to SA healthcare, pharma distribution, aesthetic clinic markets

---

## PHASE 1 — FOUNDATION (Month 1-2)
*Prerequisite: Complete Claude Code 8 modules first*

### 1.1 Google Cloud Digital Leader (FREE — 4-6 hours)
**Link:** https://www.cloudskillsboost.google/course-templates/weur/gcp-essentials-quest  
**Alternative:** https://grow.google/certificates/cloud-digital-leader  

**What it covers:**
- Cloud computing concepts (VMs, containers, serverless)
- Google Cloud products and services
- Pricing and billing
- Security and compliance
- Data and AI/ML on Google Cloud

**What to do:**
- Complete the course
- Take the exam (free, online)
- Build: Document all Google Cloud products that relate to VM infrastructure
- Apply to: Understanding what Ogre.ai is built on

---

### 1.2 Introduction to AI/ML on Google Cloud (FREE — 6 hours)
**Link:** https://www.cloudskillsboost.google/course-templates/introduction-to-ai-and-ml  

**What it covers:**
- Vertex AI overview
- Machine learning fundamentals
- Pre-trained APIs (Vision, Language, Speech)
- AutoML

**What to do:**
- Complete the course
- Build: Connect Vertex AI to a Next.js app — build an AI-powered clinic chatbot
- Apply to: LAISA agent intelligence layer

---

### 1.3 Generative AI Fundamentals (FREE — 4 hours)
**Link:** https://www.cloudskillsboost.google/course-templates/foundational-generative-ai  

**What it covers:**
- Gemini API and prompt design
- Grounding techniques
- Embeddings and vector search
- RAG (Retrieval-Augmented Generation)

**What to do:**
- Complete the course
- Build: Implement RAG for the LAISA knowledge base (Obsidian wiki → vector DB)
- Apply to: Making LAISA agents smarter with real-time clinic data

---

## PHASE 2 — INFRASTRUCTURE ENGINEERING (Month 2-4)

### 2.1 Google Cloud Computing Fundamentals (FREE — 6 hours)
**Link:** https://www.cloudskillsboost.google/course-templates/compute-essentials-quest  

**What it covers:**
- Compute Engine (VMs)
- Cloud Run (serverless containers)
- Cloud Functions (serverless functions)
- Kubernetes Engine (GKE)
- App Engine

**What to do:**
- Complete the course
- Build: Deploy the Dark Factory Next.js app to Cloud Run (instead of Vercel)
- Apply to: Understanding how Ogre VMs work under the hood

---

### 2.2 Kubernetes in Google Cloud (FREE — 8 hours)
**Link:** https://www.cloudskillsboost.google/quest/193  

**What it covers:**
- GKE cluster creation
- Deployments, services, ingress
- Auto-scaling
- Helm charts
- Multi-tenant clusters

**What to do:**
- Complete the course
- Build: Design a multi-tenant Kubernetes architecture for LAISA client VMs
  - Each client gets their own namespace
  - Agents run as pods
  - Shared headroom service across namespaces
  - Resource quotas per client (R599 tier = X pods, R1499 = Y pods)
- Apply to: Scaling LAISA from 3 clients to 300 clients

---

### 2.3 Networking on Google Cloud (FREE — 6 hours)
**Link:** https://www.cloudskillsboost.google/quest/193  

**What it covers:**
- VPC networks and firewall rules
- Load balancing
- Cloud CDN
- DNS management
- Private Service Connect

**What to do:**
- Complete the course
- Build: Design the LAISA network architecture
  - VM gets private IP only (no public exposure)
  - Clients access via Cloud Run frontend (HTTPS only)
  - Agent-to-agent communication over private VPC
  - WhatsApp webhook via Cloud Functions

---

## PHASE 3 — AI ENGINEERING (Month 3-6)

### 3.1 Vertex AI Agent Builder (FREE — 6 hours)
**Link:** https://www.cloudskillsboost.google/course-templates/vertex-ai-agent-builder  

**What it covers:**
- Building RAG agents
- Vertex AI Search
- MCP servers (Model Context Protocol)
- Grounding with enterprise data
- Agent Builder dashboard

**What to do:**
- Complete the course
- Build: Create a Vertex AI agent for LAISA that:
  - Answers questions about clinic services
  - Books appointments (connects to Supabase)
  - Sends WhatsApp confirmations
  - Uses LAISA's Obsidian wiki as the knowledge base (RAG)
- This is the core of the LAISA voice agent intelligence

---

### 3.2 Professional Machine Learning Engineer (FREE to study, $200 exam)
**Link:** https://cloud.google.com/certification/machine-learning-engineer  

**What it covers:**
- Vertex AI end-to-end ML pipelines
- Feature engineering
- Model training and evaluation
- MLOps best practices
- BigQuery ML

**What to do:**
- Study the course material (free on Coursera)
- Build: Train a custom model for SA clinic patient churn prediction
  - Data: Supabase patient records
  - Features: appointment frequency, treatment type, spending
  - Output: probability of patient returning next quarter
  - Deploy: Vertex AI endpoint → LAISA dashboard widget

---

### 3.3 Responsible AI for Developers (FREE — 4 hours)
**Link:** https://www.cloudskillsboost.google/course-templates/responsible-ai  

**What it covers:**
- AI bias and fairness
- Model evaluation for bias
- Safety in AI systems
- Explainability
- Governance frameworks

**What to do:**
- Complete the course
- Apply to: Healthcare AI compliance
  - POPIA: patient data in LAISA agents
  - SAHPRA: health claims made by LAISA content
  - B-BBEE: equity reporting in agent decisions
  - Document: Responsible AI policy for LAISA Agent OS

---

## PHASE 4 — DATA ENGINEERING (Month 4-7)

### 4.1 Professional Data Engineer (FREE to study, $200 exam)
**Link:** https://cloud.google.com/certification/data-engineer  

**What it covers:**
- BigQuery architecture and optimization
- Dataflow (Apache Beam pipelines)
- Pub/Sub (event streaming)
- Data fusion and ETL/ELT
- Looker (BI dashboards)

**What to do:**
- Study the material (Google Cloud Skills Boost has free labs)
- Build: LAISA Analytics Pipeline
  - Sources: Supabase (patients), Instagram API, Google Ads API, WhatsApp logs
  - Pipeline: Pub/Sub → Dataflow → BigQuery
  - Dashboard: Looker Studio (free) showing:
    - Patient funnel (inquiry → consultation → treatment → review)
    - Revenue per treatment type
    - Agent productivity (tasks completed per hour)
    - Marketing ROAS across channels

---

## PHASE 5 — AGENTIC SYSTEMS (Month 6-12)

### 5.1 Build AI Agents with LangChain + Vertex AI (PRACTICAL)
**Link:** https://cloud.google.com/solutions/generative-ai/  
**Additional:** https://python.langchain.com/docs/get_started/  

**What it covers:**
- LangChain for agent orchestration
- Tool calling and function calling
- Memory management
- Multi-agent systems
- Vertex AI as the LLM backend

**What to do:**
- Complete LangChain tutorials
- Build: Multi-agent system for LAISA
  - Agent 1: Charlie (voice) — receives calls, extracts intent
  - Agent 2: DenchClaw (CRM) — updates patient records
  - Agent 3: Naledi (social) — drafts content based on call summary
  - Agent 4: CashClaw (billing) — prepares quote
  - Orchestrator: General — coordinates all four, reports to dashboard
  - All connected via LangChain + Vertex AI + headroom for memory

---

### 5.2 Agentic AI on Google Cloud — MCP Server Architecture
**Link:** https://cloud.google.com/blog/topics/developers-practitioners/an-introduction-to-model-context-protocol  

**What it covers:**
- MCP (Model Context Protocol) — how AI agents talk to tools
- Building MCP servers
- Vertex AI Agent Engine
- Agent-to-agent communication

**What to do:**
- Build: MCP server for LAISA
  - Exposes: Supabase patient data, Google Ads API, Instagram API, WhatsApp API
  - Agents (Charlie, Naledi, etc.) connect as MCP clients
  - headroom sits between agents and MCP server for context compression
- Document the architecture for the Ogre VM client onboarding

---

## PHASE 6 — SPECIALIZATIONS (Month 9-18, pick 2)

### Option A: Cloud Security
**Course:** https://cloud.google.com/certification/cloud-security-engineer  
**Focus:** VPC security, IAM, Secret Manager, binary authorization  
**Apply to:** Securing LAISA client VM isolation (client A can't see client B's data)

### Option B: Cloud Networking
**Course:** https://cloud.google.com/certification/cloud-network-engineer  
**Focus:** Multi-region, private networking, zero-trust  
**Apply to:** SADC regional expansion (VMs in Jo'burg + Cape Town + Gaborone)

### Option C: Cloud DevOps
**Course:** https://cloud.google.com/certification/cloud-devops-engineer  
**Focus:** CI/CD, SRE practices, monitoring, alerting  
**Apply to:** Automating LAISA client VM provisioning — new client in 48 hours, fully configured

### Option D: Cloud Architecture
**Course:** https://cloud.google.com/certification/cloud-architect  
**Focus:** Solution design, cost optimization, disaster recovery  
**Apply to:** Designing the full LAISA multi-tenant SaaS architecture

---

## RECOMMENDED ORDER (Final Sequence)

```
MONTH 1-2
  ✓ Claude Code (8 modules — in progress)
  → Google Cloud Digital Leader
  → Generative AI Fundamentals + Vertex AI Agent Builder

MONTH 3-4
  → Introduction to AI/ML on Google Cloud
  → Google Cloud Computing Fundamentals
  → Kubernetes in Google Cloud

MONTH 5-6
  → Vertex AI Agent Builder (deep dive)
  → Responsible AI for Developers
  → Build LangChain multi-agent system for LAISA

MONTH 7-8
  → Professional Machine Learning Engineer (study)
  → Professional Data Engineer (study)
  → Build LAISA Analytics Pipeline (BigQuery + Looker)

MONTH 9-12
  → Professional Cloud Architect (study)
  → Cloud Securityspecialization
  → Design full LAISA multi-tenant SaaS architecture

MONTH 12-18
  → Expert deep dives (chosen specializations)
  → Publish architecture case study (write it up for LinkedIn)
  → Mentor other developers
  → Speak at SA tech meetups
```

---

## CERTIFICATION ROADMAP

| Certification | Cost | Priority | Timeline |
|-------------|------|----------|----------|
| Google Cloud Digital Leader | Free | 🔴 High | Month 2 |
| Generative AI Fundamentals | Free | 🔴 High | Month 2 |
| Vertex AI Agent Builder | Free | 🔴 High | Month 3 |
| Kubernetes in Google Cloud | Free | 🟠 Medium | Month 4 |
| Responsible AI for Developers | Free | 🟠 Medium | Month 5 |
| Professional ML Engineer | $200 | 🟠 Medium | Month 7 |
| Professional Data Engineer | $200 | 🟡 Lower | Month 8 |
| Professional Cloud Architect | $200 | 🟡 Lower | Month 10 |
| Professional Cloud Security Engineer | $200 | 🟡 Lower | Month 12 |

---

## WHAT TO BUILD WHILE LEARNING

| Month | Course | Project to Build |
|-------|--------|-----------------|
| 1 | Claude Code | Dark Factory app updates |
| 2 | Cloud Digital Leader | Document Ogre VM infrastructure |
| 2 | Generative AI | RAG for LAISA knowledge base |
| 3 | Computing Fundamentals | Deploy Dark Factory to Cloud Run |
| 4 | Kubernetes | Multi-tenant LAISA architecture design |
| 5 | Vertex AI Agent Builder | LAISA clinic chatbot (RAG) |
| 6 | Responsible AI | AI ethics policy for LAISA |
| 7 | ML Engineering | Patient churn prediction model |
| 8 | Data Engineering | LAISA analytics pipeline |
| 9 | Cloud Architecture | Full LAISA SaaS architecture doc |
| 10-12 | Specialization | Expert deep dive + case study |

---

## KEY RESOURCES

**Free Google Cloud Training:**
- https://www.cloudskillsboost.google
- https://grow.google/certificates
- https://cloud.google.com/blog/topics/developers-practitioners

**Agentic AI:**
- https://python.langchain.com/docs/get_started
- https://modelcontextprotocol.io
- https://docs.anthropic.com/en/docs

**SA Cloud Infrastructure:**
- https://cloud.google.com/about/locations (Johannesburg region)
- https://aws.amazon.com/local/south-africa/
- https://azure.microsoft.com/en-us/global-infrastructure/regions/south-africa-north

**Books to Read:**
1. *The Phoenix Project* — DevOps and IT operations
2. *Site Reliability Engineering* — Google's SRE handbook (free online)
3. *Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow* — Practical ML
4. *Designing Data-Intensive Applications* — Distributed systems theory

**SA Tech Community:**
- https://www.meetup.com/cape-town-google-developer-group/
- https://www.meetup.com/johannesburg-google-developer-group/
- https://toggl.com/blog/state-of-remote-work-south-africa (SA tech salaries context)

---

*Study plan compiled by: Chief Engineer AI Agent*  
*For: CTO-in-Training Tumelo Ramaphosa*  
*Last updated: June 16, 2026*