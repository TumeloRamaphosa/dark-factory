#!/usr/bin/env python3
import re

# Fix tsconfig: remove erasableSyntaxOnly
tsconfig_path = '/workspace/maphiri-site/maphiri-books/tsconfig.app.json'
with open(tsconfig_path, 'r') as f:
    tc = f.read()
tc = tc.replace('"erasableSyntaxOnly": true,\n    ', '')
with open(tsconfig_path, 'w') as f:
    f.write(tc)
print('tsconfig fixed')

# Restore build script
pkg_path = '/workspace/maphiri-site/maphiri-books/package.json'
with open(pkg_path, 'r') as f:
    pkg = f.read()
pkg = pkg.replace('"build": "vite build"', '"build": "tsc -b && vite build"')
with open(pkg_path, 'w') as f:
    f.write(pkg)
print('package.json restored')

print('Done')
