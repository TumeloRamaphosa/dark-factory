'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Code, Rocket, ChevronRight, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [idea, setIdea] = useState('');
  const [generating, setGenerating] = useState(false);
  const [prd, setPrd] = useState<any>(null);

  const generatePRD = async () => {
    if (!idea.trim()) return;
    setGenerating(true);
    
    // Simulate AI PRD generation
    await new Promise(r => setTimeout(r, 2000));
    
    setPrd({
      id: Math.random().toString(36).substring(7),
      title: idea,
      summary: `Build a ${idea} platform with modern tech stack`,
      techStack: ['Next.js 15', 'TypeScript', 'Tailwind', 'Prisma', 'PostgreSQL'],
      features: [
        'User authentication & profiles',
        'Real-time data sync',
        'Payment integration',
        'Admin dashboard',
        'API endpoints'
      ],
      timeline: '2-3 weeks',
      price: 29,
      status: 'generated'
    });
    setGenerating(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Glow Effects */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[128px]" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]" />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-6 h-6 text-orange-500" />
              <span className="font-bold text-xl tracking-tight">DARK FACTORY</span>
            </div>
            <nav className="flex items-center gap-6 text-sm text-zinc-400">
              <Link href="/builds" className="hover:text-white transition-colors">Live Builds</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <main className="max-w-4xl mx-auto px-6 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Development</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Build Me A
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">
                {' '}Dark
              </span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Describe your app idea. Get a complete PRD in seconds. 
              <span className="text-white font-medium"> Pay only when you're ready to build.</span>
            </p>
          </motion.div>

          {/* BMAD Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            {!prd ? (
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-purple-500 rounded-2xl blur opacity-20" />
                <div className="relative bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-2 border border-white/10">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && generatePRD()}
                      placeholder="I want to build a SaaS that..."
                      className="flex-1 bg-black/50 rounded-xl px-4 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                    />
                    <button
                      onClick={generatePRD}
                      disabled={generating || !idea.trim()}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-6 py-4 font-medium flex items-center gap-2 transition-all"
                    >
                      {generating ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5" />
                          BMAD
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <p className="text-center text-zinc-500 text-sm mt-4">
                  Try: "A marketplace for vintage sneakers" or "AI meal planner for gym bros"
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-20" />
                <div className="relative bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="text-sm text-green-400 font-medium mb-1">✓ PRD Generated</div>
                      <h2 className="text-2xl font-bold">{prd.title}</h2>
                    </div>
                    <button
                      onClick={() => setPrd(null)}
                      className="text-zinc-500 hover:text-white text-sm"
                    >
                      New Idea
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-zinc-400 mb-2">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                          {prd.techStack.map((tech: string) => (
                            <span key={tech} className="px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-zinc-400 mb-2">Timeline</h3>
                        <p className="text-white font-medium">{prd.timeline}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-zinc-400 mb-2">Key Features</h3>
                      <ul className="space-y-1">
                        {prd.features.map((feature: string, i: number) => (
                          <li key={i} className="text-sm text-zinc-300 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div>
                      <p className="text-zinc-400 text-sm">Pay today</p>
                      <p className="text-4xl font-bold">$0</p>
                      <p className="text-zinc-500 text-xs mt-1">Then 6 × $4.83/mo · Total $29</p>
                    </div>
                    <div className="flex gap-3">
                      <Link
                        href={`/prd/${prd.id}`}
                        className="px-4 py-3 rounded-xl border border-white/20 hover:bg-white/5 text-sm font-medium transition-colors"
                      >
                        View Full PRD
                      </Link>
                      <Link
                        href={`/build/${prd.id}`}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 font-medium flex items-center gap-2 transition-all"
                      >
                        Start Building Now
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mt-20"
          >
            {[
              { icon: Sparkles, title: 'AI PRD Generation', desc: 'Complete product specs in seconds' },
              { icon: Code, title: 'Pi + Cursor Agents', desc: 'Self-running coding agents' },
              { icon: Rocket, title: 'Auto Deploy', desc: 'Live URL in minutes, not days' },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors">
                <feature.icon className="w-8 h-8 text-orange-500 mb-4" />
                <h3 className="font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-400">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
