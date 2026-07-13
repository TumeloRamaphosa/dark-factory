#!/usr/bin/env python3
import re

# --- App.tsx fixes ---
with open('/workspace/maphiri-site/maphiri-books/src/App.tsx', 'r') as f:
    app = f.read()

# 1. Remove unused useEffect
app = app.replace("import { useState, useEffect } from 'react'", "import { useState } from 'react'")

# 2. Fix: rename unused onBuy parameter to _onBuy in the component that has it
# Pattern: <SomeComponent ... onBuy={...} ...> where onBuy is declared but not used
# Find components that destructure onBuy but don't use it
# Strategy: rename the parameter in the function signature only
# Let's look at which function has unused onBuy at line 120
# The simplest fix: add const _ = onBuy in the function body, or use void

# For the specific unused onBuy (at line ~120, FoundationSection):
# Replace { onBuy } with { onBuy: _onBuy } in function params where it causes issues
# Actually let's just use it via void:
app = re.sub(
    r'(function FoundationSection\(\{ onBuy \}:)',
    r'function FoundationSection({ onBuy: _onBuy }:',
    app
)
# And add void _onBuy inside FoundationSection
app = re.sub(
    r'(function FoundationSection\(\{ onBuy: _onBuy \}:) \{',
    r'\1 {\n  void _onBuy',
    app
)
print('Unused onBuy fixed in FoundationSection')

# 3. Fix Footer import — remove all existing ones first, insert after last import
app_lines = app.split('\n')
# Remove any existing Footer import
app_lines = [l for l in app_lines if "import Footer from './Footer'" not in l]
# Find last import line
last_import_idx = 0
for i, l in enumerate(app_lines):
    if l.strip().startswith('import ') or (l.strip().startswith("from '") and i < 5):
        last_import_idx = i
    if l.strip().startswith('const ') or l.strip().startswith('function '):
        if not l.strip().startswith('import'):
            break

# Insert Footer import after last import
app_lines.insert(last_import_idx + 1, "import Footer from './Footer'")
app = '\n'.join(app_lines)
print(f'Footer import inserted after line {last_import_idx+1}')

with open('/workspace/maphiri-site/maphiri-books/src/App.tsx', 'w') as f:
    f.write(app)
print('App.tsx written')

# --- Footer.tsx fixes ---
with open('/workspace/maphiri-site/maphiri-books/src/Footer.tsx', 'r') as f:
    footer = f.read()

# Remove any broken import lines (the PINK/GREEN one we added wrong)
footer = footer.replace("import { PINK, GREEN } from './App'\n", "")

# Make sure PINK and GREEN are defined at the top
footer = "const PINK = '#E91E8C'\nconst GREEN = '#2ECC71'\n\n" + footer

with open('/workspace/maphiri-site/maphiri-books/src/Footer.tsx', 'w') as f:
    f.write(footer)
print('Footer.tsx written')

print('ALL DONE')
