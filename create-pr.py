#!/usr/bin/env python3
import urllib.request, urllib.error, json

token = "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"
repo = "TumeloRamaphosa/dark-factory"

data = json.dumps({
  "title": "Add OGRE BUILD MANIFEST — every product, system, and deployment",
  "body": "## OGRE BUILD MANIFEST\n\nComprehensive record of all OGRE Computer products, systems, and deployments — added by Cipher Tr@ce.\n\n**This PR adds:**\n- BUILD-MANIFEST.md: Complete record of everything built\n- All live deployments documented\n- Infrastructure inventory\n- Revenue pipeline\n- Connected services\n\n**Ready to merge immediately.**",
  "head": "manifest-patch",
  "base": "master"
}).encode()

req = urllib.request.Request(
  f"https://api.github.com/repos/{repo}/pulls",
  data=data,
  headers={"Authorization": f"token {token}", "Content-Type": "application/json", "Accept": "application/vnd.github.v3+json"}
)
try:
  with urllib.request.urlopen(req) as resp:
    r = json.loads(resp.read())
    print("PR CREATED:", r.get("html_url"))
    print("PR #:", r.get("number"))
except urllib.error.HTTPError as e:
  print("ERROR:", e.code, e.read().decode())
