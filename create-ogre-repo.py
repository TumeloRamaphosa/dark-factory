#!/usr/bin/env python3
import urllib.request, json

token = "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"

data = json.dumps({
  "name": "ogre-command",
  "description": "OGRE Command Center — Dark Factory dashboard + comms layer. Cipher Tr@ce CEO dashboard.",
  "private": False,
  "has_issues": True,
  "has_wiki": True
}).encode()

req = urllib.request.Request(
  "https://api.github.com/user/repos",
  data=data,
  headers={"Authorization": f"token {token}", "Content-Type": "application/json", "Accept": "application/vnd.github.v3+json"}
)
try:
  with urllib.request.urlopen(req) as resp:
    r = json.loads(resp.read())
    print("CREATED:", r.get("html_url"))
except urllib.error.HTTPError as e:
  err = json.loads(e.read())
  print("ERROR:", err.get("message"))
