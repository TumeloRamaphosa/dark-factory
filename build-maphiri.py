#!/usr/bin/env python3
import json, subprocess, os, shutil

BASE = "/workspace/maphiri-site/maphiri-books"
PKG = f"{BASE}/package.json"

# 1. Update package.json with new deps
with open(PKG) as f:
    pkg = json.load(f)

pkg["dependencies"]["three"] = "^0.170.0"
pkg["dependencies"]["@react-three/fiber"] = "^8.17.10"
pkg["dependencies"]["@react-three/drei"] = "^9.117.0"
pkg["dependencies"]["uuid"] = "^11.1.0"

pkg["devDependencies"]["@types/three"] = "^0.170.0"
pkg["devDependencies"]["@types/uuid"] = "^10.0.0"

with open(PKG, "w") as f:
    json.dump(pkg, f, indent=2)

print("package.json updated")

# 2. Install deps
result = subprocess.run(["npm", "install"], cwd=BASE, capture_output=True, text=True, timeout=120)
print("npm install:", result.returncode)
if result.returncode != 0:
    print(result.stderr[-500:])
else:
    print("All deps installed OK")

print("DONE")
