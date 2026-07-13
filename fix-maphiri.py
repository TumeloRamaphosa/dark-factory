import re

with open('/workspace/maphiri-site/maphiri-books/src/App.tsx', 'r') as f:
    content = f.read()

# Fix 1: Add missing </div> before the footer divider div
# The grid div (display:grid, gridTemplateColumns:'1.5fr 1fr 1fr 1fr') never closes
# before the next <div style={{borderTop...
old1 = '''        </div>
      </div>
      <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:'1.5rem',display:'flex',justifyContent:'space-between' as const,alignItems:'center' as const,fontSize:'0.75rem',color:'#555'}}>'''
new1 = '''        </div>
      </div>
      </div>
      <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:'1.5rem',display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:'0.75rem',color:'#555'}}>'''
if old1 in content:
    content = content.replace(old1, new1)
    print('Fix 1 applied: missing grid </div> added')
else:
    print('Fix 1 NOT found')

# Fix 2: Remove all remaining ' as Const' from JSX inline styles
count = content.count(" as const")
content = content.replace(" as const", "")
if count > 0:
    print(f'Fix 2 applied: removed {count} occurrences of " as const"')
else:
    print('Fix 2: no " as const" found')

# Fix 3: Remove all ' as Const' (capital C)
count2 = content.count(" as Const")
content = content.replace(" as Const", "")
if count2 > 0:
    print(f'Fix 3 applied: removed {count2} occurrences of " as Const"')
else:
    print('Fix 3: no " as Const" found')

with open('/workspace/maphiri-site/maphiri-books/src/App.tsx', 'w') as f:
    f.write(content)

print('File written successfully')
