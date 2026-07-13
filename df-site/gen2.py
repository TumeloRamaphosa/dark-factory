#!/usr/bin/env python3

part2 = '''
<hr style="border:none;border-top:1px solid #1c1c32;max-width:1200px;margin:0 auto">

<section id="vms" style="padding:6rem 2rem;max-width:1200px;margin:0 auto">
<div style="font-size:.6rem;text-transform:uppercase;letter-spacing:.2em;color:#6c63ff;font-weight:700;margin-bottom:.6rem">Live Now · Animated</div>
<h2 style="font-size:clamp(1.5rem,4vw,2.4rem);font-weight:900;letter-spacing:-.02em;line-height:1.1;margin-bottom:.6rem">ICVMS — VM Ecosystem</h2>
<p style="color:#7070a8;max-width:480px;font-size:.9rem;line-height:1.8;margin-bottom:2rem">Six VMs connected through StudEx OS. B-BBEE Level 1 · POPIA Compliant · Johannesburg SA</p>
<div style="background:#0d0d1c;border:1px solid #1c1c32;border-radius:16px;padding:2rem">
<canvas id="vmc" style="border-radius:10px;height:280px;display:block;width:100%;background:#07070f"></canvas>
<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:.7rem;margin-top:1.2rem">
<div style="background:#11111f;border:1px solid #1c1c32;border-radius:10px;padding:.8rem;text-align:center"><div style="font-size:.72rem;font-weight:700;margin-bottom:2px">AfricaBiz</div><div style="font-size:.58rem;color:#6c63ff;text-transform:uppercase;letter-spacing:.06em;font-weight:700;margin-bottom:3px">Trade &amp; Commerce</div><div style="font-size:.66rem;color:#40406a;line-height:1.5">B-BBEE Level 1 · POPIA</div></div>
<div style="background:#11111f;border:1px solid #1c1c32;border-radius:10px;padding:.8rem;text-align:center"><div style="font-size:.72rem;font-weight:700;margin-bottom:2px">NtechLab</div><div style="font-size:.58rem;color:#6c63ff;text-transform:uppercase;letter-spacing:.06em;font-weight:700;margin-bottom:3px">AI Facial Recognition</div><div style="font-size:.66rem;color:#40406a;line-height:1.5">Computer vision · AI</div></div>
<div style="background:rgba(16,185,129,.03);border:1px solid rgba(16,185,129,.4);border-radius:10px;padding:.8rem;text-align:center"><div style="font-size:.72rem;font-weight:700;margin-bottom:2px;color:#10b981">VM 05 — OPEN</div><div style="font-size:.58rem;color:#10b981;text-transform:uppercase;letter-spacing:.06em;font-weight:700;margin-bottom:3px">Your Company</div><div style="font-size:.66rem;color:#40406a;line-height:1.5">Apply now · B-BBEE preferred</div></div>
<div style="background:#11111f;border:1px solid #1c1c32;border-radius:10px;padding:.8rem;text-align:center"><div style="font-size:.72rem;font-weight:700;margin-bottom:2px">Pharmasyntez</div><div style="font-size:.58rem;color:#6c63ff;text-transform:uppercase;letter-spacing:.06em;font-weight:700;margin-bottom:3px">Pharma Distribution</div><div style="font-size:.66rem;color:#40406a;line-height:1.5">Cold chain · SAHPRA</div></div>
<div style="background:#11111f;border:1px solid #1c1c32;border-radius:10px;padding:.8rem;text-align:center"><div style="font-size:.72rem;font-weight:700;margin-bottom:2px">ART Engineering</div><div style="font-size:.58rem;color:#6c63ff;text-transform:uppercase;letter-spacing:.06em;font-weight:700;margin-bottom:3px">Manufacturing</div><div style="font-size:.66rem;color:#40406a;line-height:1.5">DevOps · CI/CD</div></div>
</div>
</div>
</section>

<hr style="border:none;border-top:1px solid #1c1c32;max-width:1200px;margin:0 auto">

<section id="market" style="padding:6rem 2rem;max-width:1200px;margin:0 auto">
<div style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center">
<div>
<div style="font-size:.6rem;text-transform:uppercase;letter-spacing:.2em;color:#6c63ff;font-weight:700;margin-bottom:.6rem">Studex Global Markets</div>
<h2 style="font-size:clamp(1.5rem,4vw,2.4rem);font-weight:900;letter-spacing:-.02em;line-height:1.1;margin-bottom:.6rem">Africa-Russia Trade<br>Infrastructure</h2>
<p style="color:#7070a8;font-size:.9rem;line-height:1.8;margin-bottom:2rem">Built for the Africa-Russia trade corridor. B-BBEE Level 1. POPIA compliant.</p>
<div style="display:flex;flex-wrap:wrap;gap:.6rem;margin-bottom:1.5rem">
<div style="padding:7px 14px;background:#0d0d1c;border:1px solid #1c1c32;border-radius:8px;font-size:.74rem;font-weight:600;color:#7070a8;display:flex;align-items:center;gap:7px"><div style="width:5px;height:5px;border-radius:50%;background:#6c63ff;flex-shrink:0"></div>Africa-Russia Trade</div>
<div style="padding:7px 14px;background:#0d0d1c;border:1px solid #1c1c32;border-radius:8px;font-size:.74rem;font-weight:600;color:#7070a8;display:flex;align-items:center;gap:7px"><div style="width:5px;height:5px;border-radius:50%;background:#10b981;flex-shrink:0"></div>B-BBEE Level 1</div>
<div style="padding:7px 14px;background:#0d0d1c;border:1px solid #1c1c32;border-radius:8px;font-size:.74rem;font-weight:600;color:#7070a8;display:flex;align-items:center;gap:7px"><div style="width:5px;height:5px;border-radius:50%;background:#00d4ff;flex-shrink:0"></div>Johannesburg SA</div>
<div style="padding:7px 14px;background:#0d0d1c;border:1px solid #1c1c32;border-radius:8px;font-size:.74rem;font-weight:600;color:#7070a8;display:flex;align-items:center;gap:7px"><div style="width:5px;height:5px;border-radius:50%;background:#f59e0b;flex-shrink:0"></div>6 VMs · 1 Platform</div>
</div>
<div style="background:linear-gradient(135deg,rgba(108,99,255,.12),rgba(0,212,255,.06));border:1px solid rgba(108,99,255,.2);border-radius:16px;padding:1.5rem;text-align:center">
<div style="font-size:.9rem;font-weight:800;margin-bottom:.4rem">Apply for VM 05</div>
<div style="font-size:.76rem;color:#7070a8;margin-bottom:.8rem">The final ICVMS partner slot. B-BBEE companies preferred.</div>
<a href="mailto:hello@studexglobalmarkets.com?subject=VM 05 Application" style="display:inline-block;background:#6c63ff;color:#fff;font-weight:700;padding:8px 20px;border-radius:8px;font-size:.78rem">Apply via Email</a>
</div>
</div>
<div>
<div style="background:#0d0d1c;border:1px solid #1c1c32;border-radius:16px;padding:1.7rem;margin-bottom:.8rem">
<div style="width:44px;height:44px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;margin-bottom:.9rem;background:rgba(0,212,255,.1)">I</div>
<div style="font-size:.92rem;font-weight:800;margin-bottom:4px">ICVMS Official Proposal</div>
<span style="display:inline-flex;padding:3px 10px;background:rgba(0,212,255,.08);border:1px solid rgba(0,212,255,.2);border-radius:999px;font-size:.58rem;color:#00d4ff;font-weight:700;letter-spacing:.05em;text-transform:uppercase;margin-bottom:.5rem">Official · Minima UI</span>
<p style="font-size:.76rem;color:#7070a8;line-height:1.6;margin-bottom:.5rem">All 5 partner logos, VM specs, pricing tiers, FNB bank details.</p>
<div style="font-size:.82rem;font-weight:700;color:#6c63ff;margin-bottom:.5rem">$4,000/mo + $7,590 setup</div>
<div style="display:flex;gap:.5rem;flex-wrap:wrap">
<a href="https://j3s0jkun4cbh.space.minimax.io" target="_blank" style="padding:5px 12px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.66rem;color:#7070a8">Proposal</a>
<a href="https://a5cjrm7f1x8s.space.minimax.io" target="_blank" style="padding:5px 12px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.66rem;color:#7070a8">Full Demo</a>
</div>
</div>
<div style="background:#0d0d1c;border:1px solid #1c1c32;border-radius:16px;padding:1.7rem">
<div style="width:44px;height:44px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;margin-bottom:.9rem;background:rgba(239,68,68,.1)">M</div>
<div style="font-size:.92rem;font-weight:800;margin-bottom:4px">MindX Voice Agent</div>
<span style="display:inline-flex;padding:3px 10px;background:rgba(108,99,255,.08);border:1px solid rgba(108,99,255,.15);border-radius:999px;font-size:.58rem;color:#6c63ff;font-weight:700;letter-spacing:.05em;text-transform:uppercase;margin-bottom:.5rem">New Proposal</span>
<p style="font-size:.76rem;color:#7070a8;line-height:1.6;margin-bottom:.5rem">Voice AI for MindX. Own SA VM. 4 agents. Built in 4 weeks.</p>
<div style="font-size:.82rem;font-weight:700;color:#6c63ff;margin-bottom:.5rem">$4,000/mo + $7,590 setup</div>
<div style="display:flex;gap:.5rem;flex-wrap:wrap">
<a href="https://9w8nktistow4.space.minimax.io" target="_blank" style="padding:5px 12px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.66rem;color:#7070a8">Proposal</a>
<a href="#bmad" style="padding:5px 12px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.66rem;color:#7070a8">Start PRD</a>
</div>
</div>
</div>
</div>
</section>
'''

with open('/workspace/df-site/df-unified-site/dist/index.html', 'a') as out:
    out.write(part2)
print(f"Part 2 appended: {len(part2)} chars")
