#!/usr/bin/env python3

part3 = '''
<hr style="border:none;border-top:1px solid #1c1c32;max-width:1200px;margin:0 auto">

<section id="bmad" style="padding:6rem 2rem;max-width:1200px;margin:0 auto">
<div style="font-size:.6rem;text-transform:uppercase;letter-spacing:.2em;color:#6c63ff;font-weight:700;margin-bottom:.6rem">Rapid Development</div>
<h2 style="font-size:clamp(1.5rem,4vw,2.4rem);font-weight:900;letter-spacing:-.02em;line-height:1.1;margin-bottom:.6rem">Build Me A Dashboard</h2>
<p style="color:#7070a8;max-width:480px;font-size:.9rem;line-height:1.8;margin-bottom:2.5rem">R29/once-off · B-BBEE Level 1 · Johannesburg · POPIA Compliant</p>
<div style="background:#0d0d1c;border:1px solid #1c1c32;border-radius:16px;padding:2.5rem">
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.8rem;margin-bottom:2rem">
<div style="text-align:center;padding:1rem;background:#11111f;border:1px solid #1c1c32;border-radius:10px"><div style="width:30px;height:30px;border-radius:50%;background:rgba(108,99,255,.1);border:1px solid rgba(108,99,255,.2);display:flex;align-items:center;justify-content:center;margin:0 auto .6rem;font-size:.72rem;font-weight:800;color:#6c63ff">1</div><div style="font-size:.78rem;font-weight:700;margin-bottom:.3rem">Submit</div><div style="font-size:.68rem;color:#7070a8;line-height:1.5">Fill the brief. Describe your project in plain English.</div></div>
<div style="text-align:center;padding:1rem;background:#11111f;border:1px solid #1c1c32;border-radius:10px"><div style="width:30px;height:30px;border-radius:50%;background:rgba(108,99,255,.1);border:1px solid rgba(108,99,255,.2);display:flex;align-items:center;justify-content:center;margin:0 auto .6rem;font-size:.72rem;font-weight:800;color:#6c63ff">2</div><div style="font-size:.78rem;font-weight:700;margin-bottom:.3rem">We Analyse</div><div style="font-size:.68rem;color:#7070a8;line-height:1.5">Our agents scope and plan the build in 24 hours.</div></div>
<div style="text-align:center;padding:1rem;background:#11111f;border:1px solid #1c1c32;border-radius:10px"><div style="width:30px;height:30px;border-radius:50%;background:rgba(108,99,255,.1);border:1px solid rgba(108,99,255,.2);display:flex;align-items:center;justify-content:center;margin:0 auto .6rem;font-size:.72rem;font-weight:800;color:#6c63ff">3</div><div style="font-size:.78rem;font-weight:700;margin-bottom:.3rem">We Build</div><div style="font-size:.68rem;color:#7070a8;line-height:1.5">CodeRabbit reviews every PR. Built and deployed.</div></div>
<div style="text-align:center;padding:1rem;background:#11111f;border:1px solid #1c1c32;border-radius:10px"><div style="width:30px;height:30px;border-radius:50%;background:rgba(108,99,255,.1);border:1px solid rgba(108,99,255,.2);display:flex;align-items:center;justify-content:center;margin:0 auto .6rem;font-size:.72rem;font-weight:800;color:#6c63ff">4</div><div style="font-size:.78rem;font-weight:700;margin-bottom:.3rem">You Approve</div><div style="font-size:.68rem;color:#7070a8;line-height:1.5">R29. 50% now, 50% on approval.</div></div>
</div>
<form id="bmad-form" onsubmit="submitBmad(event)">
<div style="display:grid;grid-template-columns:1fr 1fr;gap:.8rem;margin-bottom:.8rem">
<div><label style="font-size:.64rem;text-transform:uppercase;letter-spacing:.08em;color:#40406a;font-weight:700;margin-bottom:4px;display:block">Name *</label><input id="f-name" name="name" type="text" required placeholder="Tumelo Ramaphosa" style="background:#11111f;border:1px solid #1c1c32;border-radius:8px;padding:10px 13px;font-size:.82rem;color:#eeeef8;font-family:inherit;outline:none;width:100%"></div>
<div><label style="font-size:.64rem;text-transform:uppercase;letter-spacing:.08em;color:#40406a;font-weight:700;margin-bottom:4px;display:block">Email *</label><input id="f-email" name="email" type="email" required placeholder="tumelo@studexmeat.com" style="background:#11111f;border:1px solid #1c1c32;border-radius:8px;padding:10px 13px;font-size:.82rem;color:#eeeef8;font-family:inherit;outline:none;width:100%"></div>
<div><label style="font-size:.64rem;text-transform:uppercase;letter-spacing:.08em;color:#40406a;font-weight:700;margin-bottom:4px;display:block">Company</label><input id="f-company" name="company" type="text" placeholder="Studex Group" style="background:#11111f;border:1px solid #1c1c32;border-radius:8px;padding:10px 13px;font-size:.82rem;color:#eeeef8;font-family:inherit;outline:none;width:100%"></div>
<div><label style="font-size:.64rem;text-transform:uppercase;letter-spacing:.08em;color:#40406a;font-weight:700;margin-bottom:4px;display:block">Project Type</label><select id="f-type" name="type" style="background:#11111f;border:1px solid #1c1c32;border-radius:8px;padding:10px 13px;font-size:.82rem;color:#eeeef8;font-family:inherit;outline:none;width:100%"><option>Dashboard</option><option>Landing Page</option><option>Web App</option><option>Voice Agent</option><option>Automation</option><option>CRM</option><option>Other</option></select></div>
</div>
<div><label style="font-size:.64rem;text-transform:uppercase;letter-spacing:.08em;color:#40406a;font-weight:700;margin-bottom:4px;display:block">Project Description *</label><textarea id="f-desc" name="description" required rows="4" placeholder="Describe what you want built. Be specific about features, integrations, users, and any references." style="background:#11111f;border:1px solid #1c1c32;border-radius:8px;padding:10px 13px;font-size:.82rem;color:#eeeef8;font-family:inherit;resize:vertical;outline:none;width:100%;margin-bottom:.5rem"></textarea></div>
<div id="form-success" style="display:none;background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.2);border-radius:8px;padding:1rem;text-align:center;margin-bottom:1rem"><div style="font-size:.88rem;font-weight:700;color:#10b981;margin-bottom:.3rem">Submission sent!</div><div style="font-size:.72rem;color:#7070a8">We'll be in touch within 24 hours.</div></div>
<div style="display:flex;justify-content:center;padding-top:.5rem"><button type="submit" style="background:#6c63ff;color:#fff;padding:13px 40px;border-radius:10px;font-weight:700;font-size:.9rem;border:none;cursor:pointer;box-shadow:0 8px 30px rgba(108,99,255,.4);transition:all .2s">Submit Project — R29</button></div>
</form>
</div>
</section>

<script>
function submitBmad(e){
  e.preventDefault();
  var n=document.getElementById('f-name').value;
  var em=document.getElementById('f-email').value;
  var c=document.getElementById('f-company').value;
  var t=document.getElementById('f-type').value;
  var d=document.getElementById('f-desc').value;
  var body='BMAD Submission\n\nName: '+n+'\nEmail: '+em+'\nCompany: '+c+'\nType: '+t+'\n\n'+d;
  window.location.href='mailto:cto@studex-group.com?subject=BMAD Submission — '+encodeURIComponent(n)+'&body='+encodeURIComponent(body);
  document.getElementById('form-success').style.display='block';
}
</script>
'''

with open('/workspace/df-site/df-unified-site/dist/index.html', 'a') as out:
    out.write(part3)
print(f"Part 3 appended: {len(part3)} chars")
