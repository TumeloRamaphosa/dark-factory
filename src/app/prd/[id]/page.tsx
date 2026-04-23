'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FileText, ChevronLeft, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function PRDViewer() {
  const params = useParams();
  
  // Mock PRD data - in production this would fetch from API
  const prd = {
    id: params.id,
    title: "Sample App",
    summary: "A modern web application built with Next.js",
    techStack: ["Next.js 15", "TypeScript", "Tailwind", "Prisma"],
    features: [
      "User authentication",
      "Real-time updates", 
      "Payment integration",
      "Admin dashboard",
      "API endpoints"
    ],
    timeline: "2-3 weeks",
    price: 29,
    architecture: `## System Architecture

**Frontend**: Next.js 15 App Router with React Server Components
**Backend**: API Routes + Server Actions
**Database**: PostgreSQL with Prisma ORM
**Auth**: NextAuth.js with OAuth providers
**Deploy**: Vercel Edge Network

## Data Flow

1. User authenticates via NextAuth
2. Requests hit Next.js API routes
3. Server Actions handle mutations
4. Prisma queries PostgreSQL
5. Real-time updates via Server-Sent Events`,
    apiSpec: `## API Endpoints

### Authentication
\`\`\`
POST /api/auth/signin
POST /api/auth/signout
GET  /api/auth/session
\`\`\`

### Resources
\`\`\`
GET    /api/items
POST   /api/items
GET    /api/items/:id
PATCH  /api/items/:id
DELETE /api/items/:id
\`\`\``
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl font-bold">Product Requirements Document</h1>
          </div>

          <div className="bg-zinc-900/50 rounded-2xl border border-white/10 p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">{prd.title}</h2>
              <p className="text-zinc-400">{prd.summary}</p>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {prd.techStack.map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 rounded-full bg-zinc-800 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-3">Features</h3>
              <ul className="space-y-2">
                {prd.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-zinc-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-black/30 rounded-xl p-6 border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5 text-orange-500" />
                <h3 className="font-medium">Architecture</h3>
              </div>
              <pre className="text-sm text-zinc-400 whitespace-pre-wrap font-mono">{prd.architecture}</pre>
            </section>

            <section className="bg-black/30 rounded-xl p-6 border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5 text-purple-500" />
                <h3 className="font-medium">API Specification</h3>
              </div>
              <pre className="text-sm text-zinc-400 whitespace-pre-wrap font-mono">{prd.apiSpec}</pre>
            </section>

            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <div>
                <p className="text-zinc-400 text-sm">Build price</p>
                <p className="text-3xl font-bold">${prd.price}</p>
              </div>
              <Link
                href={`/build/${prd.id}`}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 font-medium transition-all"
              >
                Start Building →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
