#!/usr/bin/env python3
"""
Cloudflare Pages Direct Upload via REST API
Handles the full deployment workflow
"""
import os, hashlib, json, base64, requests, time

TOKEN = "cfat_FucES954ZNssC1jUIFzGNWSpk7hSNhs8a39edIjY5b5866bf"
ACCT = "studexchange-933155"
PROJ = "laisa-demo"
DEPLOY_DIR = "/workspace/deploy-stud-exchange"

API = "https://api.cloudflare.com/client/v4"
h = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}

def hash_file(path):
    with open(path, "rb") as f:
        return hashlib.sha1(f.read()).hexdigest()

def get_files():
    files = []
    for root, dirs, filenames in os.walk(DEPLOY_DIR):
        for fn in filenames:
            fp = os.path.join(root, fn)
            rel = "/" + os.path.relpath(fp, DEPLOY_DIR)
            files.append({"path": rel, "digest": hash_file(fp), "fileSize": os.path.getsize(fp)})
    return files

print("1. Creating Pages deployment...")
r = requests.post(
    f"{API}/accounts/{ACCT}/pages/projects/{PROJ}/deployments",
    headers=h,
    json={"branch": "main", "buildConfig": {}, "source": {"type": "dropzone"}}
)
d = r.json()
if not d.get("success"):
    print(f"   Error: {d.get('errors')}")
    print(f"   Response: {r.text[:200]}")
    # Try getting existing deployment info instead
    r2 = requests.get(f"{API}/accounts/{ACCT}/pages/projects/{PROJ}/deployments?page=1&per_page=1", headers=h)
    print(f"   Existing deployments: {r2.json().get('result',{}).get('total')}")
    exit(1)

dep = d["result"]
dep_id = dep["id"]
print(f"   ✅ Deployment created: {dep_id}")
print(f"   URL: {dep.get('url')}")

# Poll for upload URL
print("2. Waiting for upload URL...")
upload_url = None
for i in range(10):
    r = requests.get(f"{API}/accounts/{ACCT}/pages/projects/{PROJ}/deployments/{dep_id}", headers=h)
    dep = r.json()["result"]
    ua = dep.get("upload_url") or dep.get("upload_config", {}).get("uploadURL")
    if ua:
        upload_url = ua
        break
    print(f"   Waiting... ({i+1}/10)")
    time.sleep(2)

if not upload_url:
    # Try from the rtxns field
    r = requests.get(f"{API}/accounts/{ACCT}/pages/projects/{PROJ}/deployments/{dep_id}", headers=h)
    dep = r.json()["result"]
    print(f"   Full response keys: {list(dep.keys())}")
    print(f"   rtxns: {str(dep.get('rtxns',{}))[:200]}")
    # Try common patterns
    rtxns = dep.get("rtxns", [])
    if rtxns:
        for rtxn in rtxns:
            if isinstance(rtxn, dict):
                for k, v in rtxn.items():
                    if isinstance(v, str) and ("upload" in v.lower() or "cloudflare" in v.lower()):
                        print(f"   Found: {k}: {v}")
    exit(1)

print(f"   ✅ Upload URL: {upload_url[:80]}...")

# Upload manifest
files = get_files()
print(f"3. Uploading {len(files)} files...")
manifest = {"manifest": files}

r = requests.post(f"{upload_url}/manifest", headers={"Content-Type": "application/json"}, json=manifest)
if r.status_code not in (200, 201):
    print(f"   Manifest error: {r.status_code} {r.text[:200]}")
    exit(1)

signed = r.json().get("files", [])
print(f"   ✅ Got {len(signed)} signed URLs")

# Upload each file
ok, fail = 0, 0
for f in signed:
    local = os.path.join(DEPLOY_DIR, f["path"].lstrip("/"))
    if not os.path.exists(local):
        print(f"   ⚠️  Missing: {f['path']}")
        continue
    with open(local, "rb") as fh:
        data = fh.read()
    pr = requests.put(f["signedUrl"], data=data)
    if pr.status_code in (200, 201):
        ok += 1
        print(f"   ✅ {f['path']}")
    else:
        fail += 1
        print(f"   ❌ {f['path']}: {pr.status_code}")

print(f"   Uploaded: {ok} ok, {fail} failed")

# Finalize
print("4. Finalizing deployment...")
r = requests.post(f"{upload_url}/manifest", headers={"Content-Type": "application/json"}, json=manifest)
print(f"   Finalize: {r.status_code}")
if r.status_code in (200, 201):
    result = r.json()
    print(f"\n🎉 DEPLOYED!")
    print(f"   URL: {result.get('deployUrl')}")
    print(f"   Preview: {result.get('previewUrl')}")
else:
    print(f"   Response: {r.text[:300]}")
