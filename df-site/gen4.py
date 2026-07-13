#!/usr/bin/env python3

part4 = '''
<hr style="border:none;border-top:1px solid #1c1c32;max-width:1200px;margin:0 auto">

<section id="agents" style="padding:6rem 2rem;max-width:1200px;margin:0 auto">
<div style="font-size:.6rem;text-transform:uppercase;letter-spacing:.2em;color:#6c63ff;font-weight:700;margin-bottom:.6rem">Intelligence Layer</div>
<h2 style="font-size:clamp(1.5rem,4vw,2.4rem);font-weight:900;letter-spacing:-.02em;line-height:1.1;margin-bottom:.6rem">AI Agent Team</h2>
<p style="color:#7070a8;max-width:480px;font-size:.9rem;line-height:1.8;margin-bottom:2.5rem">Five agents running on the OGRE VM. Each with a specific role. All coordinated by Hermes + Robusca.</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1rem">

<div style="background:#0d0d1c;border:1px solid #1c1c32;border-radius:16px;padding:1.5rem">
<div style="display:flex;align-items:center;gap:1rem;margin-bottom:.8rem"><div style="font-size:1.1rem;font-weight:900;width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:rgba(108,99,255,.1);flex-shrink:0">H</div><div><div style="font-size:.88rem;font-weight:800">Hermes</div><div style="font-size:.6rem;color:#6c63ff;font-weight:600;text-transform:uppercase;letter-spacing:.06em">Chief Technology Officer</div></div></div>
<p style="font-size:.76rem;color:#7070a8;line-height:1.6;margin-bottom:.8rem">Self-hosted LLM. Ollama Qwen 2.5. Persistent memory. Multi-agent orchestration. Zero external API calls for reasoning.</p>
<div style="display:flex;flex-wrap:wrap;gap:.4rem"><span style="padding:3px 9px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.6rem;color:#40406a;font-weight:600">Ollama Qwen 2.5</span><span style="padding:3px 9px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.6rem;color:#40406a;font-weight:600">GitHub</span><span style="padding:3px 9px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.6rem;color:#40406a;font-weight:600">Self-Hosted</span></div>
</div>

<div style="background:#0d0d1c;border:1px solid #1c1c32;border-radius:16px;padding:1.5rem">
<div style="display:flex;align-items:center;gap:1rem;margin-bottom:.8rem"><div style="font-size:1.1rem;font-weight:900;width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:rgba(236,72,153,.1);flex-shrink:0">N</div><div><div style="font-size:.88rem;font-weight:800">Naledi</div><div style="font-size:.6rem;color:#ec4899;font-weight:600;text-transform:uppercase;letter-spacing:.06em">Chief Marketing Officer</div></div></div>
<p style="font-size:.76rem;color:#7070a8;line-height:1.6;margin-bottom:.8rem">Content calendars, social media scheduling, campaign drafting. Multi-platform 24/7.</p>
<div style="display:flex;flex-wrap:wrap;gap:.4rem"><span style="padding:3px 9px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.6rem;color:#40406a;font-weight:600">20 posts/month</span><span style="padding:3px 9px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.6rem;color:#40406a;font-weight:600">Analytics</span><span style="padding:3px 9px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.6rem;color:#40406a;font-weight:600">Multi-platform</span></div>
</div>

<div style="background:#0d0d1c;border:1px solid #1c1c32;border-radius:16px;padding:1.5rem">
<div style="display:flex;align-items:center;gap:1rem;margin-bottom:.8rem"><div style="font-size:1.1rem;font-weight:900;width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:rgba(16,185,129,.1);flex-shrink:0">A</div><div><div style="font-size:.88rem;font-weight:800">Auto-Commerce</div><div style="font-size:.6rem;color:#10b981;font-weight:600;text-transform:uppercase;letter-spacing:.06em">E-Commerce Manager</div></div></div>
<p style="font-size:.76rem;color:#7070a8;line-height:1.6;margin-bottom:.8rem">Manages Shopify, product listings, order workflows, inventory, customer communication.</p>
<div style="display:flex;flex-wrap:wrap;gap:.4rem"><span style="padding:3px 9px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.6rem;color:#40406a;font-weight:600">Shopify</span><span style="padding:3px 9px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.6rem;color:#40406a;font-weight:600">Inventory</span><span style="padding:3px 9px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.6rem;color:#40406a;font-weight:600">Orders</span></div>
</div>

<div style="background:#0d0d1c;border:1px solid #1c1c32;border-radius:16px;padding:1.5rem">
<div style="display:flex;align-items:center;gap:1rem;margin-bottom:.8rem"><div style="font-size:1.1rem;font-weight:900;width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:rgba(245,158,11,.1);flex-shrink:0">R</div><div><div style="font-size:.88rem;font-weight:800">Robusca</div><div style="font-size:.6rem;color:#f59e0b;font-weight:600;text-transform:uppercase;letter-spacing:.06em">Chief of Staff</div></div></div>
<p style="font-size:.76rem;color:#7070a8;line-height:1.6;margin-bottom:.8rem">Coordinates all agents, manages priorities, maintains the operational calendar.</p>
<div style="display:flex;flex-wrap:wrap;gap:.4rem"><span style="padding:3px 9px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.6rem;color:#40406a;font-weight:600">Coordination</span><span style="padding:3px 9px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.6rem;color:#40406a;font-weight:600">War Room</span><span style="padding:3px 9px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.6rem;color:#40406a;font-weight:600">Reporting</span></div>
</div>

<div style="background:#0d0d1c;border:1px solid #1c1c32;border-radius:16px;padding:1.5rem">
<div style="display:flex;align-items:center;gap:1rem;margin-bottom:.8rem"><div style="font-size:1.1rem;font-weight:900;width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:rgba(239,68,68,.1);flex-shrink:0">O</div><div><div style="font-size:.88rem;font-weight:800">Obsidian Mind</div><div style="font-size:.6rem;color:#ec4899;font-weight:600;text-transform:uppercase;letter-spacing:.06em">Memory and Reasoning Core</div></div></div>
<p style="font-size:.76rem;color:#7070a8;line-height:1.6;margin-bottom:.8rem">Persistent vault. Semantic search. Decision records. Client history. Agents never start from zero.</p>
<div style="display:flex;flex-wrap:wrap;gap:.4rem"><span style="padding:3px 9px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.6rem;color:#40406a;font-weight:600">Vault</span><span style="padding:3px 9px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.6rem;color:#40406a;font-weight:600">Semantic Search</span><span style="padding:3px 9px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.6rem;color:#40406a;font-weight:600">Memory</span></div>
</div>

<div style="background:#0d0d1c;border:1px solid #1c1c32;border-radius:16px;padding:1.5rem">
<div style="display:flex;align-items:center;gap:1rem;margin-bottom:.8rem"><div style="font-size:1.1rem;font-weight:900;width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:rgba(0,212,255,.1);flex-shrink:0">V</div><div><div style="font-size:.88rem;font-weight:800">Voice Agent</div><div style="font-size:.6rem;color:#00d4ff;font-weight:600;text-transform:uppercase;letter-spacing:.06em">Client Communications</div></div></div>
<p style="font-size:.76rem;color:#7070a8;line-height:1.6;margin-bottom:.8rem">Real-time voice AI. Speaks to clients 24/7. Qualifies leads, books appointments.</p>
<div style="display:flex;flex-wrap:wrap;gap:.4rem"><span style="padding:3px 9px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.6rem;color:#40406a;font-weight:600">OpenAI Realtime</span><span style="padding:3px 9px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.6rem;color:#40406a;font-weight:600">Eleven Labs</span><span style="padding:3px 9px;background:#11111f;border:1px solid #1c1c32;border-radius:6px;font-size:.6rem;color:#40406a;font-weight:600">SA Phone</span></div>
</div>

</div>
</section>

<hr style="border:none;border-top:1px solid #1c1c32;max-width:1200px;margin:0 auto">

<section id="global-launch" style="padding:6rem 2rem;max-width:1200px;margin:0 auto">
<div style="font-size:.6rem;text-transform:uppercase;letter-spacing:.2em;color:#6c63ff;font-weight:700;margin-bottom:.6rem">Friday 10 July 2026</div>
<h2 style="font-size:clamp(1.5rem,4vw,2.4rem);font-weight:900;letter-spacing:-.02em;line-height:1.1;margin-bottom:.6rem">Global Markets Launch Event</h2>
<p style="color:#7070a8;max-width:480px;font-size:.9rem;line-height:1.8;margin-bottom:2.5rem">18:00 SA / 12:00 UTC / 19:00 CAT. Studex Global Markets goes live. ICVMS platform. Africa-Russia trade corridor.</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;margin-bottom:2rem">
<div style="background:#0d0d1c;border:1px solid #1c1c32;border-radius:12px;padding:1.2rem;display:flex;gap:1rem;align-items:flex-start"><div style="font-size:1.4rem;margin-top:2px">&#128197;</div><div><div style="font-size:.82rem;font-weight:700;margin-bottom:2px">Friday 10 July 2026</div><div style="font-size:.72rem;color:#7070a8">18:00 SA / 12:00 UTC / 19:00 CAT</div></div></div>
<div style="background:#0d0d1c;border:1px solid #1c1c32;border-radius:12px;padding:1.2rem;display:flex;gap:1rem;align-items:flex-start"><div style="font-size:1.4rem;margin-top:2px">&#128205;</div><div><div style="font-size:.82rem;font-weight:700;margin-bottom:2px">Johannesburg, South Africa</div><div style="font-size:.72rem;color:#7070a8">Studex Global Markets HQ</div></div></div>
<div style="background:#0d0d1c;border:1px solid #1c1c32;border-radius:12px;padding:1.2rem;display:flex;gap:1rem;align-items:flex-start"><div style="font-size:1.4rem;margin-top:2px">&#127919;</div><div><div style="font-size:.82rem;font-weight:700;margin-bottom:2px">ICVMS Platform Launch</div><div style="font-size:.72rem;color:#7070a8">6 VMs connected · Africa-Russia corridor</div></div></div>
<div style="background:#0d0d1c;border:1px solid #1c1c32;border-radius:12px;padding:1.2rem;display:flex;gap:1rem;align-items:flex-start"><div style="font-size:1.4rem;margin-top:2px">&#127757;</div><div><div style="font-size:.82rem;font-weight:700;margin-bottom:2px">B-BBEE Level 1</div><div style="font-size:.72rem;color:#7070a8">POPIA Compliant · Johannesburg SA</div></div></div>
</div>
<div style="background:linear-gradient(135deg,rgba(108,99,255,.1),rgba(0,212,255,.05));border:1px solid rgba(108,99,255,.15);border-radius:16px;padding:2rem;text-align:center;margin-bottom:1.5rem">
<div style="font-size:.9rem;font-weight:800;margin-bottom:.5rem">Watch the Global Markets Launch Live</div>
<div style="font-size:.78rem;color:#7070a8;margin-bottom:1rem">YouTube Live · LinkedIn Live · Studex Global Markets</div>
<div style="display:flex;gap:.8rem;justify-content:center;flex-wrap:wrap">
<a href="https://www.youtube.com/@studexglobalmarkets" target="_blank" style="padding:8px 20px;background:#ff0000;color:#fff;border-radius:8px;font-size:.78rem;font-weight:700">YouTube</a>
<a href="https://www.linkedin.com/company/studex-global-markets" target="_blank" style="padding:8px 20px;background:#0a66c2;color:#fff;border-radius:8px;font-size:.78rem;font-weight:700">LinkedIn</a>
<a href="mailto:cto@studex-group.com?subject=RSVP Global Markets Launch" style="padding:8px 20px;background:#11111f;border:1px solid #1c1c32;color:#7070a8;border-radius:8px;font-size:.78rem">RSVP via Email</a>
</div>
</div>
</section>

<footer style="border-top:1px solid #1c1c32;padding:3rem 2rem;max-width:1200px;margin:0 auto">
<div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:2rem;margin-bottom:2rem">
<div><div style="display:flex;align-items:center;gap:10px;margin-bottom:.8rem"><div style="width:30px;height:30px;border-radius:8px;background:linear-gradient(135deg,#6c63ff,#00d4ff);display:flex;align-items:center;justify-content:center;font-size:.6rem;font-weight:900;color:#fff">DF</div><div style="font-size:.72rem;font-weight:800;color:#eeeef8">Dark Factory</div></div><p style="font-size:.72rem;color:#7070a8;line-height:1.7;max-width:300px">OGRE Computer. Studex Group. Sovereign AI build factory. B-BBEE Level 1. POPIA Compliant.</p></div>
<div><div style="font-size:.64rem;text-transform:uppercase;letter-spacing:.1em;color:#6c63ff;font-weight:700;margin-bottom:.8rem">Products</div>
<a href="https://hgjcgc2esiki.space.minimax.io" target="_blank" style="display:block;font-size:.72rem;color:#7070a8;margin-bottom:.4rem">DarkDesk</a>
<a href="https://3twhamln9rsh.space.minimax.io" target="_blank" style="display:block;font-size:.72rem;color:#7070a8;margin-bottom:.4rem">AutoFlex Pro</a>
<a href="https://w1tu0qxf216v.space.minimax.io" target="_blank" style="display:block;font-size:.72rem;color:#7070a8;margin-bottom:.4rem">Red Team Agent</a>
<a href="https://j3s0jkun4cbh.space.minimax.io" target="_blank" style="display:block;font-size:.72rem;color:#7070a8;margin-bottom:.4rem">ICVMS Platform</a>
<a href="https://6g18k484b9fx.space.minimax.io" target="_blank" style="display:block;font-size:.72rem;color:#7070a8;margin-bottom:.4rem">BMAD</a>
</div>
<div><div style="font-size:.64rem;text-transform:uppercase;letter-spacing:.1em;color:#6c63ff;font-weight:700;margin-bottom:.8rem">Company</div>
<a href="#products" style="display:block;font-size:.72rem;color:#7070a8;margin-bottom:.4rem">Products</a>
<a href="#vms" style="display:block;font-size:.72rem;color:#7070a8;margin-bottom:.4rem">VM Ecosystem</a>
<a href="#agents" style="display:block;font-size:.72rem;color:#7070a8;margin-bottom:.4rem">AI Agents</a>
<a href="#bmad" style="display:block;font-size:.72rem;color:#7070a8;margin-bottom:.4rem">BMAD</a>
<a href="#global-launch" style="display:block;font-size:.72rem;color:#7070a8;margin-bottom:.4rem">Global Launch</a>
</div>
<div><div style="font-size:.64rem;text-transform:uppercase;letter-spacing:.1em;color:#6c63ff;font-weight:700;margin-bottom:.8rem">Contact</div>
<a href="mailto:cto@studex-group.com" style="display:block;font-size:.72rem;color:#7070a8;margin-bottom:.4rem">cto@studex-group.com</a>
<a href="https://wa.me/27000000000" target="_blank" style="display:block;font-size:.72rem;color:#7070a8;margin-bottom:.4rem">WhatsApp</a>
<div style="margin-top:.5rem;font-size:.6rem;color:#40406a;line-height:1.7">FNB · Studex Group<br>Acc: 62760837610<br>Branch: Woodmead<br>Code: 250-655</div>
</div>
</div>
<div style="text-align:center;padding:1.5rem;border-top:1px solid #1c1c32;font-size:.62rem;color:#40406a">© 2026 Dark Factory · OGRE Computer · Studex Group · B-BBEE Level 1 · POPIA Compliant · Johannesburg SA</div>
</footer>

<script>
// Hero canvas
(function(){
var c=document.getElementById('hc');
if(!c)return;
var x=c.getContext('2d');
if(!x)return;
var W=window.innerWidth,H=window.innerHeight;
c.width=W;c.height=H;
var cx=W/2,cy=H/2;
var pts=[{a:0,c:'#6c63ff'},{a:72,c:'#00d4ff'},{a:144,c:'#ec4899'},{a:216,c:'#f59e0b'},{a:288,c:'#10b981'}];
var t=0;
function draw(){
  if(!x)return;
  x.clearRect(0,0,W,H);
  t+=0.006;
  var dist=Math.min(W,H)*.3;
  pts.forEach(function(p,i){
    var ra=(p.a+t*20)*Math.PI/180;
    var rx=cx+dist*Math.cos(ra),ry=cy+dist*Math.sin(ra);
    x.beginPath();x.arc(rx,ry,4+Math.sin(t+i)*2,0,Math.PI*2);
    x.fillStyle=p.c;x.shadowColor=p.c;x.shadowBlur=12;x.fill();x.shadowBlur=0;
    x.beginPath();x.arc(rx,ry,16+Math.sin(t+i)*4,0,Math.PI*2);
    x.strokeStyle=p.c+'22';x.lineWidth=1;x.stroke();
  });
  x.beginPath();x.arc(cx,cy,8,0,Math.PI*2);
  x.fillStyle='#6c63ff';x.shadowColor='#6c63ff';x.shadowBlur=16;x.fill();x.shadowBlur=0;
  for(var i=1;i<=3;i++){
    x.beginPath();
    x.arc(cx,cy,30*i+Math.sin(t*.5)*4,0,Math.PI*2);
    x.strokeStyle='rgba(108,99,255,'+(.08/i)+')';x.lineWidth=.5;x.stroke();
  }
  requestAnimationFrame(draw);
}
draw();
window.addEventListener('resize',function(){W=window.innerWidth;H=window.innerHeight;c.width=W;c.height=H});
})();

// VM canvas
(function(){
var c=document.getElementById('vmc');
if(!c)return;
var x=c.getContext('2d');
if(!x)return;
var W=c.offsetWidth,H=280;
c.width=W;
var cx=W/2,cy=H/2,rr=Math.min(W,H)*.32;
var vms=[{a:270,c:'#6c63ff'},{a:330,c:'#00d4ff'},{a:30,c:'#10b981'},{a:90,c:'#ec4899'},{a:150,c:'#f59e0b'}];
var t=0;
function draw(){
  if(!x)return;
  x.clearRect(0,0,W,H);
  t+=0.008;
  vms.forEach(function(v,i){
    var ra=(v.a-90)*Math.PI/180;
    var px=cx+rr*Math.cos(ra),py=cy+rr*Math.sin(ra);
    x.beginPath();x.moveTo(cx,cy);x.lineTo(px,py);
    x.strokeStyle=v.c+'22';x.lineWidth=1;x.stroke();
    var g=x.createRadialGradient(px,py,0,px,py,30);
    g.addColorStop(0,v.c+'18');g.addColorStop(1,'transparent');
    x.beginPath();x.arc(px,py,30,0,Math.PI*2);x.fillStyle=g;x.fill();
    var pt=((t*.8+i*.3)%1);
    var dx=cx+(px-cx)*pt,dy=cy+(py-cy)*pt;
    x.beginPath();x.arc(dx,dy,3,0,Math.PI*2);
    x.fillStyle=v.c;x.shadowColor=v.c;x.shadowBlur=6;x.fill();x.shadowBlur=0;
  });
  for(var i=1;i<=3;i++){
    x.beginPath();
    x.arc(cx,cy,40+i*18+Math.sin(t*.7+i)*3,0,Math.PI*2);
    x.strokeStyle='rgba(108,99,255,'+(.06/i)+')';
    x.setLineDash([4,6]);x.lineWidth=.5;x.stroke();x.setLineDash([]);
  }
  requestAnimationFrame(draw);
}
draw();
})();
</script>
</body>
</html>
'''

with open('/workspace/df-site/df-unified-site/dist/index.html', 'a') as out:
    out.write(part4)
print(f"Part 4 appended: {len(part4)} chars")

import os
size = os.path.getsize('/workspace/df-site/df-unified-site/dist/index.html')
print(f"Total file size: {size} bytes")
