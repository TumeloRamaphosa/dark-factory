#!/usr/bin/env python3
"""
Cloudflare Pages Deployment Script
Uploads files to Cloudflare Pages via the direct upload API
"""
import os
import hashlib
import json
import requests

TOKEN = "cfat_FucES954ZNssC1jUIFzGNWSpk7hSNhs8a39edIjY5b5866bf"
ACCT_ID = "studexchange-933155"
PROJECT = "laisa-demo"
DEPLOY_ID = "c8dc2b23-f01f-4f4e-bde1-c9d55ecdc10e-173bceea-0bca-4438-a7a7-ef6da8ee7cb1"
DEPLOY_DIR = "/workspace/deploy-stud-exchange"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

def sha1_file(path):
    h = hashlib.sha1()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()

def get_files(base_dir):
    """Get all files in deployment directory"""
    files = []
    for root, dirs, filenames in os.walk(base_dir):
        for filename in filenames:
            filepath = os.path.join(root, filename)
            rel_path = os.path.relpath(filepath, base_dir)
            size = os.path.getsize(filepath)
            sha1_hash = sha1_file(filepath)
            files.append({
                "path": f"/{rel_path}",
                "fileSize": size,
                "digest": sha1_hash
            })
    return files

def deploy():
    print("📦 Getting deployment upload URL...")
    
    # Get deployment details
    r = requests.get(
        f"https://api.cloudflare.com/client/v4/accounts/{ACCT_ID}/pages/projects/{PROJECT}/deployments/{DEPLOY_ID}",
        headers=headers
    )
    data = r.json()
    deployment = data.get("result", {})
    upload_config = deployment.get("upload_config", {})
    upload_url = upload_config.get("uploadURL")
    
    if not upload_url:
        print("❌ No upload URL found")
        print("Response:", json.dumps(data, indent=2))
        return False
    
    print(f"✅ Upload URL: {upload_url[:50]}...")
    
    # Get files
    print("📁 Collecting files...")
    files = get_files(DEPLOY_DIR)
    print(f"   Found {len(files)} files")
    
    # Create manifest
    manifest = {
        "manifest": files
    }
    
    print("🔐 Getting signed upload URLs...")
    # Get signed URLs for each file
    r = requests.post(
        f"{upload_url}/manifest",
        headers={"Content-Type": "application/json"},
        json=manifest
    )
    
    if r.status_code not in (200, 201):
        print(f"❌ Manifest error: {r.status_code} {r.text}")
        return False
    
    signed_manifest = r.json()
    print(f"   Got {len(signed_manifest.get('files', []))} signed URLs")
    
    # Upload each file
    print("⬆️  Uploading files...")
    for file_info in signed_manifest.get("files", []):
        local_path = os.path.join(DEPLOY_DIR, file_info["path"].lstrip("/"))
        signed_url = file_info["signedUrl"]
        
        if not os.path.exists(local_path):
            print(f"   ⚠️  File not found: {local_path}")
            continue
        
        with open(local_path, "rb") as f:
            file_data = f.read()
        
        put_resp = requests.put(signed_url, data=file_data)
        if put_resp.status_code in (200, 201):
            print(f"   ✅ {file_info['path']}")
        else:
            print(f"   ❌ {file_info['path']}: {put_resp.status_code}")
    
    # Finalize deployment
    print("🚀 Finalizing deployment...")
    r = requests.post(
        f"{upload_url}/manifest",
        headers={"Content-Type": "application/json"},
        json=manifest
    )
    
    if r.status_code in (200, 201):
        result = r.json()
        deploy_url = result.get("deployUrl", deployment.get("url"))
        print(f"\n✅ DEPLOYED: {deploy_url}")
        print(f"   Preview: {result.get('previewUrl')}")
        return True
    else:
        print(f"❌ Finalize error: {r.status_code} {r.text}")
        return False

if __name__ == "__main__":
    success = deploy()
    exit(0 if success else 1)
