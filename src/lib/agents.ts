// Agent Spawning System
// Spawns Pi (planner) and Cursor (coder) sub-agents

// import { spawnSubAgent } from './subagent';

export interface BuildJob {
  id: string;
  prdId: string;
  status: 'queued' | 'planning' | 'coding' | 'deploying' | 'complete' | 'failed';
  stages: BuildStage[];
  repoUrl?: string;
  deployUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BuildStage {
  name: string;
  agent: 'pi' | 'cursor' | 'vercel';
  status: 'pending' | 'running' | 'complete' | 'failed';
  output?: string;
  startedAt?: string;
  completedAt?: string;
}

export async function startBuild(prd: any): Promise<BuildJob> {
  const job: BuildJob = {
    id: generateId(),
    prdId: prd.id,
    status: 'queued',
    stages: [
      { name: 'Architecture Planning', agent: 'pi', status: 'pending' },
      { name: 'Database Schema', agent: 'pi', status: 'pending' },
      { name: 'API Design', agent: 'pi', status: 'pending' },
      { name: 'Frontend Components', agent: 'cursor', status: 'pending' },
      { name: 'Backend Implementation', agent: 'cursor', status: 'pending' },
      { name: 'Integration & Tests', agent: 'cursor', status: 'pending' },
      { name: 'Deploy to Vercel', agent: 'vercel', status: 'pending' }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // Store job in database/memory
  await storeJob(job);
  
  // Start the pipeline
  process.nextTick(() => runBuildPipeline(job, prd));
  
  return job;
}

async function runBuildPipeline(job: BuildJob, prd: any) {
  try {
    // Stage 1: Pi - Architecture Planning
    await updateStage(job, 'Architecture Planning', 'running');
    const plan = await spawnPiAgent(prd);
    await updateStage(job, 'Architecture Planning', 'complete', plan);
    
    // Stage 2: Pi - Database Schema
    await updateStage(job, 'Database Schema', 'running');
    const schema = await spawnPiAgent({ ...prd, task: 'database-schema', plan });
    await updateStage(job, 'Database Schema', 'complete', schema);
    
    // Stage 3: Pi - API Design
    await updateStage(job, 'API Design', 'running');
    const apiDesign = await spawnPiAgent({ ...prd, task: 'api-design', plan, schema });
    await updateStage(job, 'API Design', 'complete', apiDesign);
    
    // Stage 4-6: Cursor - Coding
    await updateStage(job, 'Frontend Components', 'running');
    const frontend = await spawnCursorAgent({ 
      ...prd, 
      task: 'frontend',
      plan, schema, apiDesign 
    });
    await updateStage(job, 'Frontend Components', 'complete', frontend);
    
    await updateStage(job, 'Backend Implementation', 'running');
    const backend = await spawnCursorAgent({ 
      ...prd, 
      task: 'backend',
      plan, schema, apiDesign, frontend 
    });
    await updateStage(job, 'Backend Implementation', 'complete', backend);
    
    await updateStage(job, 'Integration & Tests', 'running');
    const tests = await spawnCursorAgent({ 
      ...prd, 
      task: 'tests',
      plan, schema, apiDesign, frontend, backend 
    });
    await updateStage(job, 'Integration & Tests', 'complete', tests);
    
    // Stage 7: Deploy
    await updateStage(job, 'Deploy to Vercel', 'running');
    const deploy = await deployToVercel(job.id);
    await updateStage(job, 'Deploy to Vercel', 'complete', JSON.stringify(deploy));
    
    // Complete
    await updateJobStatus(job, 'complete', deploy.repoUrl, deploy.deployUrl);
    
  } catch (error) {
    console.error('Build pipeline failed:', error);
    await updateJobStatus(job, 'failed');
  }
}

async function spawnPiAgent(context: any): Promise<string> {
  // Spawn Pi agent for planning
  console.log('Spawning Pi agent...', context.task || 'architecture');
  
  // In production, this would call OpenClaw sessions_spawn
  // For now, simulate with local processing
  await new Promise(r => setTimeout(r, 3000));
  
  return `Pi plan generated for ${context.task || 'architecture'}`;
}

async function spawnCursorAgent(context: any): Promise<string> {
  // Spawn Cursor agent for coding
  console.log('Spawning Cursor agent...', context.task);
  
  // In production, this would call sessions_spawn with runtime="acp"
  await new Promise(r => setTimeout(r, 5000));
  
  return `Cursor code generated for ${context.task}`;
}

async function deployToVercel(jobId: string): Promise<{ repoUrl: string; deployUrl: string }> {
  console.log('Deploying to Vercel...', jobId);
  
  await new Promise(r => setTimeout(r, 2000));
  
  return {
    repoUrl: `https://github.com/darkfactory/build-${jobId}`,
    deployUrl: `https://build-${jobId}.vercel.app`
  };
}

async function updateStage(job: BuildJob, stageName: string, status: BuildStage['status'], output?: string) {
  const stage = job.stages.find(s => s.name === stageName);
  if (stage) {
    stage.status = status;
    stage.output = output;
    if (status === 'running') stage.startedAt = new Date().toISOString();
    if (status === 'complete' || status === 'failed') stage.completedAt = new Date().toISOString();
  }
  job.updatedAt = new Date().toISOString();
  await storeJob(job);
}

async function updateJobStatus(job: BuildJob, status: BuildJob['status'], repoUrl?: string, deployUrl?: string) {
  job.status = status;
  if (repoUrl) job.repoUrl = repoUrl;
  if (deployUrl) job.deployUrl = deployUrl;
  job.updatedAt = new Date().toISOString();
  await storeJob(job);
}

async function storeJob(job: BuildJob) {
  // In production: save to database
  // For now: in-memory or JSON file
  const fs = require('fs');
  const path = require('path');
  const jobsDir = path.join(process.cwd(), '.jobs');
  
  if (!fs.existsSync(jobsDir)) {
    fs.mkdirSync(jobsDir, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(jobsDir, `${job.id}.json`),
    JSON.stringify(job, null, 2)
  );
}

export async function getJob(id: string): Promise<BuildJob | null> {
  const fs = require('fs');
  const path = require('path');
  const jobPath = path.join(process.cwd(), '.jobs', `${id}.json`);
  
  if (!fs.existsSync(jobPath)) return null;
  
  return JSON.parse(fs.readFileSync(jobPath, 'utf8'));
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}
