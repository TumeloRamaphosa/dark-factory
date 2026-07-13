#!/usr/bin/env python3
"""Assemble the two HTML segments into a complete Dark Factory page."""
with open('/workspace/df-v3/dist/index.html', 'r') as f:
    part1 = f.read()
with open('/workspace/df-v3/dist/part2b.html', 'r') as f:
    part2 = f.read()

# part1 ends at </section> (home section closed) inside <main>
# We need to find where the home section closes and inject part2 after it
# Actually: part1 has </section> at the end (closing s-home) + </main> + <footer>
# We want: s-home section (closed) + s-portfolio + s-skills + s-stack + s-about + </main> + footer + script

# Find the </section> that closes s-home (it's right before </main>)
sec_idx = part1.rfind('</section>')
main_idx = part1.rfind('</main>')

print(f"part1 length: {len(part1)}")
print(f"</section> at: {sec_idx}, </main> at: {main_idx}")

# The section is right at the end of the main wrap div
# part1 structure: ...features div (inside s-home) → </section> → </main> → <footer>
# We want to insert part2 between </section> and </main>

if sec_idx > 0 and main_idx > sec_idx:
    head = part1[:sec_idx+len('</section>')]
    tail = part1[main_idx:]  # starts at </main>
    full = head + '\n' + part2.strip() + '\n' + tail
else:
    # fallback: append part2 before </body>
    body_idx = part1.rfind('</body>')
    if body_idx > 0:
        head = part1[:body_idx]
        full = head + '\n' + part2.strip() + '\n' + '</body></html>'
    else:
        full = part1 + '\n' + part2.strip()

size = len(full.encode('utf-8'))
print(f"Total size: {size} bytes ({size/1024:.1f} KB)")

with open('/workspace/df-v3/dist/index.html', 'w') as f:
    f.write(full)
print("Written successfully")

# Verify
with open('/workspace/df-v3/dist/index.html') as f:
    c = f.read()
checks = ['s-home', 's-portfolio', 's-skills', 's-stack', 's-about', 'showTab', 'generatePRD', 'startBuild', 'resetForm', '</script>', 'DARK FACTORY', 'Build Me A', '</html>']
for ch in checks:
    print('  ', 'OK' if ch in c else 'MISSING', ':', ch)
