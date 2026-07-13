#!/usr/bin/env node
/**
 * Cloudflare Pages Deployment via REST API
 * Uses native fetch (Node.js 18+)
 */
const TOKEN = "cfat_FucES954ZNssC1jUIFzGNWSpk7hSNhs8a39edIjY5b5866bf";
const ACCT = "studexchange-933155";
const PROJ = "laisa-demo";
const DEPLOY_DIR = "/workspace/deploy-stud-exchange";
const API = "https://api.cloudflare.com/client/v4";

const h = { "Authorization": `Bearer ${TOKEN}`, "Content-Type": "application/json" };
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

function hashFile(filePath) {
  return crypto.createHash("sha1").update(fs.readFileSync(filePath)).digest("hex");
}

function getFiles() {
  const files = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fp = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(fp);
      else {
        const rel = "/" + path.relative(DEPLOY_DIR, fp);
        files.push({ path: rel, digest: hashFile(fp), fileSize: fs.statSync(fp).size });
      }
    }
  }
  walk(DEPLOY_DIR);
  return files;
}

async function deploy() {
  console.log("1. Creating Pages deployment...");
  let r = await fetch(`${API}/accounts/${ACCT}/pages/projects/${PROJ}/deployments`, {
    method: "POST",
    headers: h,
    body: JSON.stringify({ branch: "main", buildConfig: {}, source: { type: "dropzone" } })
  });
  let d = await r.json();
  if (!d.success) {
    // Try getting existing deployments
    r = await fetch(`${API}/accounts/${ACCT}/pages/projects/${PROJ}/deployments?page=1&per_page=1`, { headers: h });
    d = await r.json();
    console.log("   Error creating new deployment:", JSON.stringify(d.errors || d));
    console.log("   Total existing deployments:", d.result?.total);
    process.exit(1);
  }

  const dep = d.result;
  const depId = dep.id;
  console.log(`   ✅ Deployment: ${depId}`);
  console.log(`   URL: ${dep.url}`);

  // Poll for upload URL
  console.log("2. Getting upload URL...");
  let uploadUrl = null;
  for (let i = 0; i < 10; i++) {
    r = await fetch(`${API}/accounts/${ACCT}/pages/projects/${PROJ}/deployments/${depId}`, { headers: h });
    dep = (await r.json()).result;
    uploadUrl = dep.upload_url || dep.upload_config?.uploadURL;
    if (uploadUrl) break;
    // Check rtxns for upload info
    if (dep.rtxns && dep.rtxns.length > 0) {
      for (const rtxn of dep.rtxns) {
        if (rtxn.upload_url) { uploadUrl = rtxn.upload_url; break; }
      }
    }
    console.log(`   Waiting... (${i+1}/10) upload_url=${uploadUrl || 'none'}`);
    await new Promise(r => setTimeout(r, 2000));
  }

  if (!uploadUrl) {
    // Last resort: try known CF Pages upload pattern
    r = await fetch(`${API}/accounts/${ACCT}/pages/projects/${PROJ}/deployments/${depId}`, { headers: h });
    dep = (await r.json()).result;
    console.log("   Full response keys:", Object.keys(dep));
    console.log("   rtxns count:", (dep.rtxns || []).length);
    if (dep.rtxns?.length > 0) console.log("   rtxns[0]:", JSON.stringify(dep.rtxns[0]).slice(0, 300));
    process.exit(1);
  }
  console.log(`   ✅ Upload URL: ${uploadUrl.slice(0, 60)}...`);

  // Upload manifest
  const files = getFiles();
  console.log(`3. Uploading ${files.length} files...`);
  const manifest = { manifest: files };
  r = await fetch(`${uploadUrl}/manifest`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(manifest)
  });
  if (r.status !== 200 && r.status !== 201) {
    const txt = await r.text();
    console.log(`   Manifest error ${r.status}: ${txt.slice(0, 200)}`);
    process.exit(1);
  }
  const signed = (await r.json()).files || [];
  console.log(`   ✅ ${signed.length} signed URLs received`);

  // Upload each file
  let ok = 0, fail = 0;
  for (const f of signed) {
    const local = path.join(DEPLOY_DIR, f.path.replace(/^\//, ""));
    if (!fs.existsSync(local)) { console.log(`   ⚠️  Missing: ${f.path}`); continue; }
    const data = fs.readFileSync(local);
    const pr = await fetch(f.signedUrl, { method: "PUT", body: data });
    if (pr.ok) { ok++; console.log(`   ✅ ${f.path}`); }
    else { fail++; console.log(`   ❌ ${f.path}: ${pr.status}`); }
  }
  console.log(`   Uploaded: ${ok} ok, ${fail} failed`);

  // Finalize
  console.log("4. Finalizing...");
  r = await fetch(`${uploadUrl}/manifest`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(manifest)
  });
  const result = await r.json();
  console.log(`\n🎉 DEPLOYED!`);
  console.log(`   URL: ${result.deployUrl || dep.url}`);
  console.log(`   Preview: ${result.previewUrl}`);
}

deploy().catch(e => { console.error("Fatal:", e.message); process.exit(1); });
