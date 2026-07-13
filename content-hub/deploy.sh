#!/bin/bash
# Deploy OGRE Content Hub to Vercel
# Usage: bash deploy.sh

TOKEN="vcp_6u72w3yq8hh1lIYznWymtcV0p9nOeXoMnjAbyqkwTvmn4d5v0L2I5byn"
PROJECT="ogre-content-hub"
TEAM=""

# Create project via API
echo "🏭 Deploying OGRE Content Hub to Vercel..."

# Deploy using Vercel REST API
RESPONSE=$(curl -s -X POST "https://api.vercel.com/v13/deployments" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "'"$PROJECT"'",
    "files": [
      {
        "file": "index.html",
        "data": '"$(cat index.html | python3 -c 'import sys,json; print(json.dumps(sys.stdin.read()))')"'
      },
      {
        "file": "api/upload.js", 
        "data": '"$(cat api/upload.js | python3 -c 'import sys,json; print(json.dumps(sys.stdin.read()))')"'
      },
      {
        "file": "vercel.json",
        "data": "{\"version\":2,\"routes\":[{\"src\":\"/upload\",\"dest\":\"/api/upload.js\",\"methods\":[\"POST\"]},{\"src\":\"/(.*)\",\"dest\":\"/$1\"}],\"outputDirectory\":\".\"}"
      }
    ],
    "projectSettings": {
      "framework": null,
      "buildCommand": null,
      "outputDirectory": ".",
      "installCommand": null,
      "devCommand": null
    },
    "target": "production"
  }')

echo "Response: $RESPONSE"
