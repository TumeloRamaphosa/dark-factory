#!/usr/bin/env python3

with open('/workspace/maphiri-site/maphiri-books/src/App.tsx', 'r') as f:
    content = f.read()

# Add import for new Footer at the top (after existing imports)
old_import_check = "import Footer from './Footer'"
if old_import_check not in content:
    # Find the last import line
    lines = content.split('\n')
    insert_at = 0
    for i, line in enumerate(lines):
        if line.startswith('import ') or line.startswith('const ') or line.startswith('function '):
            insert_at = i + 1
    lines.insert(insert_at, "import Footer from './Footer'")
    content = '\n'.join(lines)
    print(f'Import added at line {insert_at+1}')

# Remove the old Footer function (from "function Footer() {" to the closing "}")
import re
# Match the entire Footer function definition
content = re.sub(
    r'\nfunction Footer\(\)[\s\S]*?\n\}\n',
    '\n',
    content,
    count=1
)
print('Old Footer function removed')

with open('/workspace/maphiri-site/maphiri-books/src/App.tsx', 'w') as f:
    f.write(content)

print('App.tsx updated successfully')
