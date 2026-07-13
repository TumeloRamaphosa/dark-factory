#!/usr/bin/env python3
# Part 1 of unified site generator

part1 = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dark Factory — OGRE Computer · Studex Group</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Plus Jakarta Sans',sans-serif;background:#07070f;color:#eeeef8;-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:#07070f}
::-webkit-scrollbar-thumb{background:#1c1c32;border-radius:2px}
::-webkit-scrollbar-thumb:hover{background:#6c63ff}
a{color:inherit;text-decoration:none}
canvas{position:fixed;inset:0;z-index:0;opacity:.4;pointer-events:none}
section a:hover{opacity:.85}
button:hover{opacity:.9;transform:translateY(-1px)}
</style>
</head>
<body>
<canvas id="hc"></canvas>
<nav style="position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 3rem;height:62px;background:rgba(7,7,15,.93);backdrop-filter:blur(20px);border-bottom:1px solid #1c1c32">
<div style="display:flex;align-items:center;gap:10px">
<div style="width:34px;height:34px;border-radius:9px;background:linear-gradient(135deg,#6c63ff,#00d4ff);display:flex;align-items:center;justify-content:center;font-size:.7rem;font-weight:900;color:#fff">DF</div>
<div><div style="font-size:.7rem;font-weight:800;color:#eeeef8;letter-spacing:.1em;text-transform:uppercase">Dark Factory</div><div style="font-size:.55rem;color:#7070a8">OGRE Computer · Studex Group</div></div>
</div>
<div style="display:flex;gap:2rem;align-items:center">
<a href="#products" style="font-size:.72rem;color:#7070a8;font-weight:500">Products</a>
<a href="#vms" style="font-size:.72rem;color:#7070a8;font-weight:500">VM Ecosystem</a>
<a href="#market" style="font-size:.72rem;color:#7070a8;font-weight:500">Global Markets</a>
<a href="#bmad" style="font-size:.72rem;color:#7070a8;font-weight:500">Build Me A Dashboard</a>
<a href="#agents" style="font-size:.72rem;color:#7070a8;font-weight:500">AI Agents</a>
<a href="#global-launch" style="font-size:.72rem;color:#7070a8;font-weight:500">Global Launch</a>
</div>
<a href="#bmad" style="display:inline-flex;padding:8px 18px;background:#6c63ff;color:#fff;border-radius:8px;font-size:.72rem;font-weight:700">Start a Project</a>
</nav>

<section style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:5rem 2rem 3rem;position:relative;overflow:hidden">
<div style="position:relative;z-index:2;max-width:900px">
<div style="display:inline-flex;align-items:center;gap:7px;padding:5px 16px;background:rgba(108,99,255,.1);border:1px solid rgba(108,99,255,.2);border-radius:999px;font-size:.62rem;color:#6c63ff;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:1.8rem">Dark Factory · OGRE Computer · Studex Group · July 2026</div>
<h1 style="font-size:clamp(2.6rem,8vw,6rem);font-weight:900;line-height:.95;letter-spacing:-.03em;margin-bottom:1.2rem;background:linear-gradient(135deg,#fff 30%,rgba(255,255,255,.4));-webkit-background-clip:text;-webkit-text-fill-color:transparent">Build. Ship.<br>Repeat.</h1>
<p style="font-size:.98rem;color:#7070a8;max-width:500px;margin:0 auto 2.5rem">A sovereign AI build factory. Multi-agent teams design, build, and deploy software from idea to live product in days.</p>
<div style="display:flex;gap:.9rem;justify-content:center;flex-wrap:wrap">
<a href="#bmad" style="display:inline-flex;padding:13px 30px;background:#6c63ff;color:#fff;border-radius:10px;font-weight:700;font-size:.88rem;box-shadow:0 8px 30px rgba(108,99,255,.4)">Build Me A Dashboard — R29</a>
<a href="#vms" style="display:inline-flex;padding:12px 26px;background:transparent;border:1px solid #272745;color:#7070a8;border-radius:10px;font-weight:600;font-size:.85rem">Explore VM Ecosystem</a>
</div>
</div>
</section>

<div style="display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid #1c1c32;border-bottom:1px solid #1c1c32;background:#0d0d1c">
<div style="text-align:center;padding:1.5rem 1rem;border-right:1px solid #1c1c32"><div style="font-size:1.8rem;font-weight:900;color:#6c63ff;display:block">6</div><div style="font-size:.6rem;text-transform:uppercase;letter-spacing:.1em;color:#40406a;margin-top:4px;font-weight:600">Live Products</div></div>
<div style="text-align:center;padding:1.5rem 1rem;border-right:1px solid #1c1c32"><div style="font-size:1.8rem;font-weight:900;color:#6c63ff;display:block">5</div><div style="font-size:.6rem;text-transform:uppercase;letter-spacing:.1em;color:#40406a;margin-top:4px;font-weight:600">AI Agents</div></div>
<div style="text-align:center;padding:1.5rem 1rem;border-right:1px solid #1c1c32"><div style="font-size:1.8rem;font-weight:900;color:#6c63ff;display:block">R200M+</div><div style="font-size:.6rem;text-transform:uppercase;letter-spacing:.1em;color:#40406a;margin-top:4px;font-weight:600">Tender Pipeline</div></div>
<div style="text-align:center;padding:1.5rem 1rem"><div style="font-size:1.8rem;font-weight:900;color:#6c63ff;display:block">$4K</div><div style="font-size:.6rem;text-transform:uppercase;letter-spacing:.1em;color:#40406a;margin-top:4px;font-weight:600">MRR Target</div></div>
</div>

<section id="products" style="padding:6rem 2rem;max-width:1200px;margin:0 auto">
<div style="font-size:.6rem;text-transform:uppercase;letter-spacing:.2em;color:#6c63ff;font-weight:700;margin-bottom:.6rem">The Products</div>
<h2 style="font-size:clamp(1.5rem,4vw,2.4rem);font-weight:900;letter-spacing:-.02em;line-height:1.1;margin-bottom:.6rem">Everything We Build</h2>
<p style="color:#7070a8;max-width:480px;font-size:.9rem;line-height:1.8;margin-bottom:2.5rem">Six live products. Each built, deployed, and earning. Voice AI to cybersecurity to global trade infrastructure.</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(265px,1fr));gap:1rem">

<div style="background:#0d0d1c;border:1px solid #1c1c32;border-radius:16px;padding:1.7rem">
<div style="width:44px;height:44px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;margin-bottom:.9rem;background:rgba(236,72,153,.1)">V</div>
<div style="font-size:.92rem;font-weight:800;margin-bottom:4px">DarkDesk</div>
<span style="display:inline-flex;padding:3px 10px;background:rgba(236,72,153,.08);border:1px solid rgba(236,72,153,.15);border-radius:999px;font-size:.58rem;color:#ec4899;font-weight:700;letter-spacing:.05em;text-transform:uppercase;margin-bottom:.5rem">Voice AI</span>
<p style="font-size:.76rem;color:#7070a8;line-height:1.6;margin-bottom:.5rem">AI voice companion. Real-time voice + chat. Lives in your own sovereign SA VM.</p>
<div style="font-size:.82rem;font-weight:700;color:#6c63ff;margin-bottom:.5rem">From R2,500/mo</div>
<div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.8rem">
<a href="https://hgjcgc2esiki.space.minimax.io" target="_blank" style="padding:5px 12px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.66rem;color:#7070a8">Demo</a>
<a href="https://j3s0jkun4cbh.space.minimax.io" target="_blank" style="padding:5px 12px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.66rem;color:#7070a8">Proposal</a>
</div>
</div>

<div style="background:#0d0d1c;border:1px solid #1c1c32;border-radius:16px;padding:1.7rem">
<div style="width:44px;height:44px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;margin-bottom:.9rem;background:rgba(16,185,129,.1)">W</div>
<div style="font-size:.92rem;font-weight:800;margin-bottom:4px">AutoFlex Pro</div>
<span style="display:inline-flex;padding:3px 10px;background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.15);border-radius:999px;font-size:.58rem;color:#10b981;font-weight:700;letter-spacing:.05em;text-transform:uppercase;margin-bottom:.5rem">Web Automation</span>
<p style="font-size:.76rem;color:#7070a8;line-height:1.6;margin-bottom:.5rem">AI agent reads webpages, fills forms, qualifies leads, books appointments.</p>
<div style="font-size:.82rem;font-weight:700;color:#6c63ff;margin-bottom:.5rem">From R1,500/mo</div>
<div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.8rem">
<a href="https://3twhamln9rsh.space.minimax.io" target="_blank" style="padding:5px 12px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.66rem;color:#7070a8">Demo</a>
<a href="#bmad" style="padding:5px 12px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.66rem;color:#7070a8">Build yours</a>
</div>
</div>

<div style="background:#0d0d1c;border:1px solid #1c1c32;border-radius:16px;padding:1.7rem">
<div style="width:44px;height:44px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;margin-bottom:.9rem;background:rgba(245,158,11,.1)">S</div>
<div style="font-size:.92rem;font-weight:800;margin-bottom:4px">Red Team Agent</div>
<span style="display:inline-flex;padding:3px 10px;background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.15);border-radius:999px;font-size:.58rem;color:#f59e0b;font-weight:700;letter-spacing:.05em;text-transform:uppercase;margin-bottom:.5rem">Cybersecurity AI</span>
<p style="font-size:.76rem;color:#7070a8;line-height:1.6;margin-bottom:.5rem">AI VM monitoring other AI agents for hallucinations, prompt injection, PII leakage.</p>
<div style="font-size:.82rem;font-weight:700;color:#6c63ff;margin-bottom:.5rem">R45,000/mo — Live MRR</div>
<div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.8rem">
<a href="https://w1tu0qxf216v.space.minimax.io" target="_blank" style="padding:5px 12px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.66rem;color:#7070a8">Demo</a>
<a href="https://kidvuwlj196t.space.minimax.io" target="_blank" style="padding:5px 12px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.66rem;color:#7070a8">Proposal</a>
</div>
</div>

<div style="background:#0d0d1c;border:1px solid #1c1c32;border-radius:16px;padding:1.7rem">
<div style="width:44px;height:44px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;margin-bottom:.9rem;background:rgba(108,99,255,.1)">I</div>
<div style="font-size:.92rem;font-weight:800;margin-bottom:4px">ICVMS Platform</div>
<span style="display:inline-flex;padding:3px 10px;background:rgba(108,99,255,.08);border:1px solid rgba(108,99,255,.15);border-radius:999px;font-size:.58rem;color:#6c63ff;font-weight:700;letter-spacing:.05em;text-transform:uppercase;margin-bottom:.5rem">Global Markets</span>
<p style="font-size:.76rem;color:#7070a8;line-height:1.6;margin-bottom:.5rem">6 VMs connected through StudEx OS. Africa-Russia trade corridor.</p>
<div style="font-size:.82rem;font-weight:700;color:#6c63ff;margin-bottom:.5rem">$4,000/mo</div>
<div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.8rem">
<a href="https://j3s0jkun4cbh.space.minimax.io" target="_blank" style="padding:5px 12px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.66rem;color:#7070a8">Proposal</a>
<a href="https://a5cjrm7f1x8s.space.minimax.io" target="_blank" style="padding:5px 12px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.66rem;color:#7070a8">Full Demo</a>
</div>
</div>

<div style="background:#0d0d1c;border:1px solid #1c1c32;border-radius:16px;padding:1.7rem">
<div style="width:44px;height:44px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;margin-bottom:.9rem;background:rgba(0,212,255,.1)">B</div>
<div style="font-size:.92rem;font-weight:800;margin-bottom:4px">BMAD</div>
<span style="display:inline-flex;padding:3px 10px;background:rgba(0,212,255,.08);border:1px solid rgba(0,212,255,.15);border-radius:999px;font-size:.58rem;color:#00d4ff;font-weight:700;letter-spacing:.05em;text-transform:uppercase;margin-bottom:.5rem">Rapid Development</span>
<p style="font-size:.76rem;color:#7070a8;line-height:1.6;margin-bottom:.5rem">Build Me A Dashboard. Describe what you want. We build it.</p>
<div style="font-size:.82rem;font-weight:700;color:#6c63ff;margin-bottom:.5rem">R29/once-off</div>
<div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.8rem">
<a href="#bmad" style="padding:5px 12px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.66rem;color:#7070a8">Start now</a>
<a href="https://6g18k484b9fx.space.minimax.io" target="_blank" style="padding:5px 12px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.66rem;color:#7070a8">View BMAD</a>
</div>
</div>

<div style="background:#0d0d1c;border:1px solid #1c1c32;border-radius:16px;padding:1.7rem">
<div style="width:44px;height:44px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;margin-bottom:.9rem;background:rgba(239,68,68,.1)">O</div>
<div style="font-size:.92rem;font-weight:800;margin-bottom:4px">Obsidian Mind</div>
<span style="display:inline-flex;padding:3px 10px;background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.15);border-radius:999px;font-size:.58rem;color:#ec4899;font-weight:700;letter-spacing:.05em;text-transform:uppercase;margin-bottom:.5rem">Enterprise AI OS</span>
<p style="font-size:.76rem;color:#7070a8;line-height:1.6;margin-bottom:.5rem">Persistent memory vault. Every conversation, deal, document stored forever.</p>
<div style="font-size:.82rem;font-weight:700;color:#6c63ff;margin-bottom:.5rem">$4,000/mo</div>
<div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.8rem">
<a href="https://kidvuwlj196t.space.minimax.io" target="_blank" style="padding:5px 12px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.66rem;color:#7070a8">Proposal</a>
<a href="https://idsucux7j3e4.space.minimax.io" target="_blank" style="padding:5px 12px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.66rem;color:#7070a8">VM Demo</a>
</div>
</div>

</div>
</section>
'''

with open('/workspace/df-site/df-unified-site/dist/index.html', 'w') as out:
    out.write(part1)

print(f"Part 1 written: {len(part1)} chars")
