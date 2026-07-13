import shutil, os
src = '/workspace/df-site/src/App.tsx'
dst = '/workspace/df-site/df-unified-site/src/App.tsx'
shutil.copy2(src, dst)
size = os.path.getsize(dst)
lines = open(dst).read().count('\n')
print("Copied to Vite project:", size, "bytes,", lines, "lines")
