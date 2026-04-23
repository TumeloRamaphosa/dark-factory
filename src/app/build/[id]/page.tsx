'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Terminal, CheckCircle, Circle, Loader2, AlertCircle, ExternalLink, Code2 } from 'lucide-react';

interface BuildStage {
  name: string;
  agent: string;
  status: 'pending' | 'running' | 'complete' | 'failed';
  output?: string;
}

interface BuildJob {
  id: string;
  status: string;
  stages: BuildStage[];
  repoUrl?: string;
  deployUrl?: string;
}

export default function BuildProgress() {
  const params = useParams();
  const [job, setJob] = useState<BuildJob | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setJob(data.job);
        }
      } catch (error) {
        console.error('Failed to fetch job:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
    const interval = setInterval(fetchJob, 3000); // Poll every 3s
    return () => clearInterval(interval);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Build Not Found</h1>
          <p className="text-zinc-400 mt-2">The build job doesn't exist or has expired.</p>
        </div>
      </div>
    );
  }

  const isComplete = job.status === 'complete';
  const isFailed = job.status === 'failed';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Terminal className="w-8 h-8 text-orange-500" />
            <div>
              <h1 className="text-2xl font-bold">Build Progress</h1>
              <p className="text-zinc-400 font-mono text-sm">ID: {job.id}</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="mb-8">
            {isComplete ? (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400">
                <CheckCircle className="w-4 h-4" />
                Build Complete
              </span>
            ) : isFailed ? (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-400">
                <AlertCircle className="w-4 h-4" />
                Build Failed
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 text-orange-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                Building...
              </span>
            )}
          </div>

          {/* Build Stages */}
          <div className="space-y-4 mb-8">
            {job.stages.map((stage, index) => (
              <motion.div
                key={stage.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-white/5"
              >
                {stage.status === 'complete' ? (
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                ) : stage.status === 'running' ? (
                  <Loader2 className="w-6 h-6 text-orange-500 animate-spin flex-shrink-0" />
                ) : stage.status === 'failed' ? (
                  <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                ) : (
                  <Circle className="w-6 h-6 text-zinc-600 flex-shrink-0" />
                )}
                
                <div className="flex-1">
                  <p className="font-medium">{stage.name}</p>
                  <p className="text-sm text-zinc-500">Agent: {stage.agent}</p>
                </div>
                
                <span className={`text-sm ${
                  stage.status === 'complete' ? 'text-green-400' :
                  stage.status === 'running' ? 'text-orange-400' :
                  stage.status === 'failed' ? 'text-red-400' :
                  'text-zinc-600'
                }`}>
                  {stage.status === 'complete' ? 'Done' :
                   stage.status === 'running' ? 'Running...' :
                   stage.status === 'failed' ? 'Failed' :
                   'Waiting'}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Success Links */}
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 gap-4"
            >
              {job.repoUrl && (
                <a
                  href={job.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-4 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/20 transition-colors"
                >
                  <Code2 className="w-5 h-5" />
                  View Code
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              
              {job.deployUrl && (
                <a
                  href={job.deployUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 transition-all"
                >
                  <ExternalLink className="w-5 h-5" />
                  Live Site
                </a>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
