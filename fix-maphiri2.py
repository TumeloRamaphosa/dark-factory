with open('/workspace/maphiri-site/maphiri-books/src/App.tsx', 'r') as f:
    content = f.read()

# Fix: Remove the duplicate stray </div> that was incorrectly added
# The pattern is: </div>[newline]</div>[newline]<div style={{borderTop
old = '''      </div>
      </div>
      <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:'1.5rem',display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:'0.75rem',color:'#555'}}>'''
new = '''      </div>
      <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:'1.5rem',display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:'0.75rem',color:'#555'}}>'''

if old in content:
    content = content.replace(old, new)
    print('Duplicate </div> removed')
else:
    print('Pattern not found - checking raw')

with open('/workspace/maphiri-site/maphiri-books/src/App.tsx', 'w') as f:
    f.write(content)
