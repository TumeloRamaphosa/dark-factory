#!/usr/bin/env python3
"""
NotebookLM Skill Wrapper for OpenClaw / OGRE Computer
=====================================================
Based on: github.com/PleasePrompto/notebooklm-skill

WHAT IT DOES:
  Lets OGRE query Google NotebookLM notebooks for source-grounded,
  citation-backed answers powered by Gemini — directly from this terminal.
  Each answer comes exclusively from uploaded documents. No hallucinations.
  Perfect for querying LAISA clinic documents, patient workflows,
  Studex Group policies, pharmaceutical databases.

HOW IT WORKS:
  1. User uploads docs to notebooklm.google.com (once)
  2. Shares the notebook publicly (Share → Anyone with link)
  3. OGRE queries it via browser automation (patchright/Playwright)
  4. Gemini returns source-grounded answers with citations

SKILL LOCATION: /workspace/skills/notebooklm-skill/
USAGE: python3 /workspace/skills/notebooklm-skill/scripts/run.py [command]

ENVIRONMENT:
  Automatically managed — creates .venv on first use.
  All data stored in ~/.claude/skills/notebooklm/data/

PREREQUISITES ON LOCAL CLAUDE CODE:
  - Clone to ~/.claude/skills/notebooklm/
  - One-time: python scripts/run.py auth_manager.py setup
  - Then: python scripts/run.py auth_manager.py status (check auth)

NOTE FOR OGRE VM:
  The browser automation (patchright) requires a display.
  On headless OGRE VM, run with: export HEADLESS=false
  Or use --show-browser flag to debug.
  If Chrome crashes: python scripts/run.py cleanup_manager.py --preserve-library

QUICK TEST:
  python3 /workspace/skills/notebooklm-skill/scripts/run.py \
    auth_manager.py status

ADD A NOTEBOOK (SMART ADD):
  python3 /workspace/skills/notebooklm-skill/scripts/run.py \
    notebook_manager.py add \
    --url "https://notebooklm.google.com/notebook/YOUR-ID" \
    --name "LAISA Clinic Documents" \
    --description "Patient intake forms, workflows, aesthetic treatment protocols" \
    --topics "aesthetic,clinic,patients,intake,workflows"

LIST NOTEBOOKS:
  python3 /workspace/skills/notebooklm-skill/scripts/run.py \
    notebook_manager.py list

ASK A QUESTION:
  python3 /workspace/skills/notebooklm-skill/scripts/run.py \
    ask_question.py \
    --question "What is the patient intake workflow for Botox treatments?" \
    --notebook-url "https://notebooklm.google.com/notebook/YOUR-ID"

FOR OGRE INTERNAL USE:
  - LAISA clinic SOPs → NotebookLM → queried by OGRE agent
  - Pharmasyntez drug database → NotebookLM → queried for SAHPRA compliance
  - Studex Group policies → NotebookLM → queried for B-BBEE reporting
"""

import subprocess
import sys
import os

SKILL_DIR = "/workspace/skills/notebooklm-skill"
RUN_PY = f"{SKILL_DIR}/scripts/run.py"

def run(command: list[str], desc: str = "") -> None:
    """Run a notebooklm skill command."""
    cmd = ["python3", RUN_PY] + command
    print(f"\n{'='*60}")
    if desc:
        print(f"  {desc}")
    print(f"  Command: {' '.join(cmd)}")
    print(f"{'='*60}\n")
    result = subprocess.run(cmd, cwd=SKILL_DIR)
    if result.returncode != 0:
        print(f"[ERROR] Command failed with exit code {result.returncode}")
    return result.returncode

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        print("\nUSAGE EXAMPLES:")
        print("  python3 notebooklm_wrapper.py auth_manager.py status")
        print("  python3 notebooklm_wrapper.py notebook_manager.py list")
        print("  python3 notebooklm_wrapper.py ask_question.py --question 'What is the patient intake form?' --notebook-url 'URL'")
        sys.exit(1)

    args = sys.argv[1:]
    rc = run(args, desc=f"Running: {' '.join(args)}")
    sys.exit(rc)
