#!/usr/bin/env python3
"""Write complete App.tsx by combining prefix + new step2+ content."""

with open('/workspace/ciphertrace-unified/src/App.tsx', 'r') as f:
    old = f.read()

pos = old.find('{step === 2 && !done && (')
prefix = old[:pos]

suffix = """                <div>
                  <h3 style={{fontWeight:800,fontSize:'1rem',color:'#e8e8f0',marginBottom:4}}>What are we building?</h3>
                  <p style={{fontSize:'0.825rem',color:'#9090b0',marginBottom:'1.25rem'}}>Describe your project clearly so we can scope it.</p>
                  <div style={{marginBottom:'1rem'}}>
                    <label style={{fontSize:'0.7rem',fontWeight:700,color:'#9090b0',display:'block',marginBottom:6,textTransform:'uppercase',letterSpacing:'0.08em',fontFamily:'monospace'}}>Project Name *</label>
                    <input value={s.projectName} onChange={e=>up('projectName',e.target.value)} placeholder='e.g. LAISA Agent OS, SafeSight CRM'
                      style={{width:'100%',padding:'0.625rem 0.875rem',borderRadius:10,border:'1px solid rgba(255,255,255,0.1)',fontSize:'0.875rem',fontFamily:'inherit',background:'rgba(255,255,255,0.05)',color:'#e8e8f0',outline:'none',boxSizing:'border-box'}}
                    />
                  </div>
                  <div style={{marginBottom:'1rem'}}>
                    <label style={{fontSize:'0.7rem',fontWeight:700,color:'#9090b0',display:'block',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.08em',fontFamily:'monospace'}}>Project Type</label>
                    <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                      {['AI Agent','Website','Mobile App','Dashboard','E-Commerce','Automation'].map(t=>(
                        <button key={t} onClick={()=>up('type',t)} style={{padding:'0.35rem 0.875rem',borderRadius:100,fontSize:'0.775rem',fontWeight:600,border:`1px solid ${s.type===t?C.a:'rgba(255,255,255,0.1)'}`,background:s.type===t?`${C.a}20`:'transparent',color:s.type===t?C.a:'#9090b0',cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>{t}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{marginBottom:'1rem'}}>
                    <label style={{fontSize:'0.7rem',fontWeight:700,color:'#9090b0',display:'block',marginBottom:6,textTransform:'uppercase',letterSpacing:'0.08em',fontFamily:'monospace'}}>Problem Statement *</label>
                    <textarea value={s.problem} onChange={e=>up('problem',e.target.value)} placeholder='What problem are you solving?' rows={3}
                      style={{width:'100%',padding:'0.625rem 0.875rem',borderRadius:10,border:'1px solid rgba(255,255,255,0.1)',fontSize:'0.875rem',fontFamily:'inherit',background:'rgba(255,255,255,0.05)',color:'#e8e8f0',resize:'vertical',lineHeight:1.6,outline:'none',boxSizing:'border-box'}}
                    />
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem',marginBottom:'1.25rem'}}>
                    <div>
                      <label style={{fontSize:'0.7rem',fontWeight:700,color:'#9090b0',display:'block',marginBottom:6,textTransform:'uppercase',letterSpacing:'0.08em',fontFamily:'monospace'}}>Budget</label>
                      <select value={s.budget} onChange={e=>up('budget',e.target.value)} style={{width:'100%',padding:'0.625rem 0.875rem',borderRadius:10,border:'1px solid rgba(255,255,255,0.1)',fontSize:'0.875rem',fontFamily:'inherit',background:'rgba(255,255,255,0.05)',color:'#e8e8f0',outline:'none',cursor:'pointer',appearance:'none'}}>
                        <option value=''>— Select —</option>
                        <option>R5K – R15K</option><option>R15K – R50K</option><option>R50K – R150K</option><option>R150K – R350K</option><option>R350K+</option>
                      </select>
                    </div>
                    <div>
                      <label style={{fontSize:'0.7rem',fontWeight:700,color:'#9090b0',display:'block',marginBottom:6,textTransform:'uppercase',letterSpacing:'0.08em',fontFamily:'monospace'}}>Timeline</label>
                      <select value={s.timeline} onChange={e=>up('timeline',e.target.value)} style={{width:'100%',padding:'0.625rem 0.875rem',borderRadius:10,border:'1px solid rgba(255,255,255,0.1)',fontSize:'0.875rem',fontFamily:'inherit',background:'rgba(255,255,255,0.05)',color:'#e8e8f0',outline:'none',cursor:'pointer',appearance:'none'}}>
                        <option value=''>— Select —</option>
                        <option>ASAP</option><option>Within 2 weeks</option><option>Within 1 month</option><option>1–3 months</option>
                      </select>
                    </div>
                  </div>
                  <div style={{display:'flex',gap:8}}>
                    <button onClick={()=>setStep(1)} style={{flex:1,padding:'0.75rem',borderRadius:12,background:'rgba(255,255,255,0.06)',border:'none',fontWeight:600,fontSize:'0.875rem',cursor:'pointer',color:'#9090b0',fontFamily:'inherit'}}>← Back</button>
                    <button onClick={()=>s.projectName&&s.problem&&setStep(3)} disabled={!s.projectName||!s.problem}
                      style={{flex:2,padding:'0.75rem',borderRadius:12,background:(!s.projectName||!s.problem)?'rgba(108,99,255,0.2)':C.a,color:'#fff',border:'none',fontWeight:700,fontSize:'0.875rem',cursor:(!s.projectName||!s.problem)?'default':'pointer',fontFamily:'inherit',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
                      Voice Note →
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && !done && (
                <div>
                  <h3 style={{fontWeight:800,fontSize:'1rem',color:'#e8e8f0',marginBottom:4}}>Attach your assets</h3>
                  <p style={{fontSize:'0.825rem',color:'#9090b0',marginBottom:'1.25rem'}}>Voice note or document. Everything is scanned before we open it.</p>
                  <div onClick={recording?stopRec:startRec} style={{background:'rgba(255,255,255,0.03)',border:`2px dashed ${recording?C.p:'rgba(255,255,255,0.1)'}`,borderRadius:16,padding:'1.5rem',textAlign:'center',marginBottom:'1rem',cursor:'pointer',transition:'all 0.2s'}}>
                    <div style={{width:52,height:52,borderRadius:'50%',background:recording?C.p:C.a,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 0.75rem',boxShadow:`0 4px 16px ${recording?'rgba(236,72,153,.3)':'rgba(108,99,255,.3)'}`,transition:'all 0.2s'}}>
                      <Mic size={22} color='#fff' />
                    </div>
                    <p style={{fontWeight:700,fontSize:'0.875rem',color:recording?C.p:'#e8e8f0'}}>{recording?`Recording... ${fmt(secs)}`:'Tap to record a voice brief'}</p>
                    <p style={{fontSize:'0.75rem',color:'#5a5a7a',marginTop:4}}>{vn?`Voice note ready — ${vn.name}`:'Talk through your idea — 2 to 5 minutes'}</p>
                  </div>
                  <div style={{display:'flex',gap:8}}>
                    <button onClick={()=>setStep(2)} style={{flex:1,padding:'0.75rem',borderRadius:12,background:'rgba(255,255,255,0.06)',border:'none',fontWeight:600,fontSize:'0.875rem',cursor:'pointer',color:'#9090b0',fontFamily:'inherit'}}>← Back</button>
                    <button onClick={()=>setStep(4)} style={{flex:2,padding:'0.75rem',borderRadius:12,background:C.a,color:'#fff',border:'none',fontWeight:700,fontSize:'0.875rem',cursor:'pointer',fontFamily:'inherit',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>Review →</button>
                  </div>
                </div>
              )}

              {step === 4 && !done && (
                <div>
                  <h3 style={{fontWeight:800,fontSize:'1rem',color:'#e8e8f0',marginBottom:4}}>Review your PRD</h3>
                  <p style={{fontSize:'0.825rem',color:'#9090b0',marginBottom:'1.25rem'}}>Make sure everything looks right.</p>
                  <div style={{background:'rgba(255,255,255,0.03)',borderRadius:14,padding:'1rem',marginBottom:'1rem'}}>
                    {[['Name',s.name||'—'],['Email',s.email||'—'],['Project',s.projectName||'—'],['Type',s.type||'—'],['Budget',s.budget||'—'],['Timeline',s.timeline||'—'],['Voice',vn?'✓ Voice note attached':'— No voice note']].map(([k,v])=>(
                      <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'0.5rem 0',borderBottom:'1px solid rgba(255,255,255,0.05)',fontSize:'0.825rem'}}>
                        <span style={{fontSize:'0.75rem',color:'#5a5a7a',fontWeight:600}}>{k}</span>
                        <span style={{fontWeight:600,color:'#e8e8f0'}}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{display:'flex',gap:8}}>
                    <button onClick={()=>setStep(3)} style={{flex:1,padding:'0.75rem',borderRadius:12,background:'rgba(255,255,255,0.06)',border:'none',fontWeight:600,fontSize:'0.875rem',cursor:'pointer',color:'#9090b0',fontFamily:'inherit'}}>← Back</button>
                    <button onClick={submit} disabled={sending} style={{flex:2,padding:'0.75rem',borderRadius:12,background:sending?'rgba(108,99,255,0.2)':C.a,color:'#fff',border:'none',fontWeight:700,fontSize:'0.875rem',cursor:sending?'default':'pointer',fontFamily:'inherit',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
                      {sending?<><div style={{width:14,height:14,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',borderRadius:'50%',animation:'spin 1s linear infinite'}}/>Submitting...</>:<>Submit PRD →</>}
                    </button>
                  </div>
                </div>
              )}

              {done&&(
                <div style={{textAlign:'center',padding:'2rem 0'}}>
                  <CheckCircle size={48} color={C.a} style={{margin:'0 auto 1rem',display:'block'}}/>
                  <h3 style={{fontSize:'1.25rem',fontWeight:800,color:'#e8e8f0',marginBottom:8}}>PRD Submitted!</h3>
                  <p style={{fontSize:'0.875rem',color:'#9090b0',lineHeight:1.7,marginBottom:'1rem'}}>Your brief is in. Our team will review it personally and be in touch within 24 hours.</p>
                  <div style={{display:'inline-block',background:'rgba(108,99,255,0.1)',border:`1px solid ${C.a}30`,borderRadius:8,padding:'0.5rem 1.25rem',fontFamily:'monospace',fontSize:'0.825rem',color:C.a,marginBottom:'1.5rem'}}>{refId}</div>
                  <br/>
                  <button onClick={()=>setPrd(false)} style={{padding:'0.75rem 2rem',borderRadius:12,background:C.a,color:'#fff',border:'none',fontWeight:700,fontSize:'0.875rem',cursor:'pointer',fontFamily:'inherit'}}>Close</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,background:'rgba(9,9,14,0.92)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.06)',height:64,display:'flex',alignItems:'center'}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 2rem',width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:10,cursor:'pointer'}} onClick={()=>scroll('hero')}>
            <div style={{width:34,height:34,borderRadius:9,background:'linear-gradient(135deg, #6c63ff, #8b5cf6)',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 16px rgba(108,99,255,0.35)'}}>🏭</div>
            <div>
              <div style={{fontWeight:800,fontSize:'0.9rem',color:'#e8e8f0',letterSpacing:'-0.01em'}}>CipherTrace</div>
              <div style={{fontSize:'0.6rem',color:'#5a5a7a',fontFamily:'monospace'}}>Dark Factory | Studex Dev</div>
            </div>
          </div>
          <div style={{display:'flex',gap:4}}>
            {['clients','products','success','founder'].map(id=>(
              <button key={id} onClick={()=>scroll(id)} style={{padding:'0.45rem 0.875rem',borderRadius:10,fontSize:'0.825rem',fontWeight:600,border:'none',cursor:'pointer',background:'transparent',color:'#9090b0',fontFamily:'inherit',transition:'all 0.15s'}}>{id.charAt(0).toUpperCase()+id.slice(1)}</button>
            ))}
          </div>
          <button onClick={()=>setPrd(true)} style={{padding:'0.6rem 1.25rem',borderRadius:12,background:'#6c63ff',color:'#fff',border:'none',fontWeight:700,fontSize:'0.825rem',cursor:'pointer',display:'inline-flex',alignItems:'center',gap:6,boxShadow:'0 4px 20px rgba(108,99,255,0.35)',fontFamily:'inherit',transition:'all 0.2s'}}>✨ Drop a PRD</button>
        </div>
      </nav>

      {/* HERO */}
      <section id='hero' style={{position:'relative',minHeight:'100vh',display:'flex',alignItems:'center',padding:'6rem 2rem 4rem',overflow:'hidden'}}>
        <div style={{position:'absolute',top:-200,left:'50%',transform:'translateX(-50%)',width:800,height:800,background:'radial-gradient(ellipse, rgba(108,99,255,0.12) 0%, rgba(0,212,255,0.05) 40%, transparent 70%)',pointerEvents:'none'}}/>
        <div style={{maxWidth:1200,margin:'0 auto',width:'100%',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'4rem',alignItems:'center',position:'relative',zIndex:1}}>
          <div>
            <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(108,99,255,0.1)',border:'1px solid rgba(108,99,255,0.25)',borderRadius:100,padding:'0.3rem 1rem',marginBottom:'1.5rem'}}>
              <div style={{width:6,height:6,borderRadius:'50%',background:'#6c63ff',animation:'pulse-anim 2s infinite'}}/>
              <span style={{fontSize:'0.7rem',fontWeight:700,color:'#6c63ff',letterSpacing:'0.08em',fontFamily:'monospace'}}>8 VMs · 60+ Agents · 24/7 Operations</span>
            </div>
            <h1 style={{fontSize:'clamp(2.5rem,6vw,4.5rem)',fontWeight:900,lineHeight:1.0,letterSpacing:'-0.03em',color:'#e8e8f0',marginBottom:'1.25rem'}}>
              An automated<br/><span style={{color:'#6c63ff'}}>software</span><br/><span style={{color:'#ec4899'}}>environment.</span>
            </h1>
            <p style={{fontSize:'1.05rem',color:'#9090b0',lineHeight:1.8,marginBottom:'2rem',maxWidth:480}}>We build Cyber Sapien companies — AI agents run operations, humans orchestrate from the command centre. Every business has the intelligence of a multinational at African prices.</p>
            <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:'3rem'}}>
              <button onClick={()=>setPrd(true)} style={{padding:'0.8rem 1.75rem',borderRadius:14,background:'#6c63ff',color:'#fff',border:'none',fontWeight:700,fontSize:'0.9rem',cursor:'pointer',display:'inline-flex',alignItems:'center',gap:8,boxShadow:'0 6px 24px rgba(108,99,255,0.3)',fontFamily:'inherit',transition:'all 0.2s'}}>✨ Drop a PRD</button>
              <button onClick={()=>scroll('products')} style={{padding:'0.8rem 1.75rem',borderRadius:14,background:'rgba(255,255,255,0.04)',color:'#9090b0',border:'1px solid rgba(255,255,255,0.08)',fontWeight:600,fontSize:'0.9rem',cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>⚙️ See Products</button>
            </div>
            <div style={{display:'flex',gap:'2.5rem',flexWrap:'wrap'}}>
              {[{v:'8',l:'VMs Active'},{v:'60+',l:'AI Agents'},{v:'24/7',l:'Operations'}].map(x=>(
                <div key={x.l}><div style={{fontSize:'2.25rem',fontWeight:900,letterSpacing:'-0.03em',color:'#6c63ff'}}>{x.v}</div><div style={{fontSize:'0.7rem',color:'#5a5a7a',textTransform:'uppercase',letterSpacing:'0.1em',fontFamily:'monospace',fontWeight:600,marginTop:4}}>{x.l}</div></div>
              ))}
            </div>
          </div>
          <div style={{height:480,position:'relative'}}>
            <SphereGraph onNodeClick={setSel} />
            <div style={{textAlign:'center',fontSize:'0.75rem',color:'#5a5a7a',marginTop:12,fontFamily:'monospace'}}>Click any node to explore →</div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id='clients' style={{padding:'5rem 2rem',position:'relative',zIndex:1,background:'#0f0f1a'}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'2.5rem'}}>
            <div style={{fontSize:'0.7rem',fontWeight:700,color:'#6c63ff',letterSpacing:'0.18em',textTransform:'uppercase',marginBottom:8,fontFamily:'monospace'}}>// Capabilities</div>
            <h2 style={{fontSize:'clamp(1.75rem,4vw,3rem)',fontWeight:900,letterSpacing:'-0.025em',color:'#e8e8f0',lineHeight:1.1,marginBottom:'0.5rem'}}>The <span style={{color:'#6c63ff'}}>full stack</span> of an AI company</h2>
            <p style={{color:'#9090b0',fontSize:'1rem',maxWidth:540,margin:'0 auto'}}>Everything you need to run an AI-powered business. Built once. Running 24/7.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(260px,1fr))',gap:'1rem'}}>
            {CAPABILITIES.map((cap,i)=><CapabilityCard key={cap.label} cap={cap} i={i} />)}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id='products' style={{padding:'5rem 2rem',position:'relative',zIndex:1}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'2.5rem'}}>
            <div style={{fontSize:'0.7rem',fontWeight:700,color:'#ec4899',letterSpacing:'0.18em',textTransform:'uppercase',marginBottom:8,fontFamily:'monospace'}}>// Products</div>
            <h2 style={{fontSize:'clamp(1.75rem,4vw,3rem)',fontWeight:900,letterSpacing:'-0.025em',color:'#e8e8f0',lineHeight:1.1}}>Build. Operate. <span style={{color:'#6c63ff'}}>Scale.</span></h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(300px,1fr))',gap:'1.5rem'}}>
            {PRODUCTS.map(p=>(
              <div key={p.id} style={{background:'rgba(15,15,26,0.9)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:24,overflow:'hidden',backdropFilter:'blur(10px)',transition:'all 0.25s',cursor:'pointer'}}
                onClick={()=>setSel(p.id)}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='translateY(-6px)';(e.currentTarget as HTMLElement).style.boxShadow='0 20px 60px rgba(0,0,0,0.4)'}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='';(e.currentTarget as HTMLElement).style.boxShadow=''}}
              >
                <div style={{height:4,background:`linear-gradient(90deg, ${p.color}, ${p.color}60)`}}/>
                <div style={{padding:'1.5rem'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
                    <div style={{width:44,height:44,borderRadius:12,background:`${p.color}15`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.25rem'}}>{p.icon}</div>
                    <span style={{padding:'0.2rem 0.6rem',borderRadius:100,fontSize:'0.6rem',fontWeight:700,background:`${p.color}15`,color:p.color,fontFamily:'monospace'}}>LIVE</span>
                  </div>
                  <h3 style={{fontWeight:800,fontSize:'1.05rem',color:'#e8e8f0',marginBottom:4}}>{p.name}</h3>
                  <p style={{fontSize:'0.8rem',color:'#5a5a7a',marginBottom:12}}>{p.desc}</p>
                  <div style={{fontWeight:900,fontSize:'1.5rem',color:p.color,marginBottom:12}}>{p.price}</div>
                  <ul style={{listStyle:'none',padding:0,margin:'0 0 1.25rem',display:'flex',flexDirection:'column',gap:6}}>
                    {p.features.map(f=>(
                      <li key={f} style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:'0.825rem',color:'#9090b0'}}>
                        <CheckCircle size={14} color='#6c63ff' style={{flexShrink:0,marginTop:2}}/>{f}
                      </li>
                    ))}
                  </ul>
                  <button style={{width:'100%',padding:'0.75rem',borderRadius:12,background:p.color,color:'#fff',border:'none',fontWeight:700,fontSize:'0.825rem',cursor:'pointer',fontFamily:'inherit',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>Explore →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUCCESS */}
      <section id='success' style={{padding:'5rem 2rem',position:'relative',zIndex:1,background:'#0f0f1a'}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'2.5rem'}}>
            <div style={{fontSize:'0.7rem',fontWeight:700,color:'#10b981',letterSpacing:'0.18em',textTransform:'uppercase',marginBottom:8,fontFamily:'monospace'}}>// Proof</div>
            <h2 style={{fontSize:'clamp(1.75rem,4vw,3rem)',fontWeight:900,letterSpacing:'-0.025em',color:'#e8e8f0',lineHeight:1.1}}>Results that <span style={{color:'#10b981'}}>speak.</span></h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1.5rem',marginBottom:'2.5rem'}}>
            {[{v:'8',l:'VMs Active',s:'OGRE GPU cluster 24/7'},{v:'60+',l:'AI Agents',s:'Research, build, comms, security'},{v:'9',l:'Countries',s:'SA, Nigeria, Kenya, Ghana, Russia'},{v:'R4.2M',l:'Pipeline',s:'Active proposals + contracts'}].map(m=>(
              <div key={m.l} style={{background:'rgba(108,99,255,0.05)',border:'1px solid rgba(108,99,255,0.15)',borderRadius:24,padding:'1.75rem',textAlign:'center',transition:'all 0.2s'}}>
                <div style={{fontSize:'2.5rem',fontWeight:900,letterSpacing:'-0.03em',color:'#6c63ff'}}>{m.v}</div>
                <div style={{fontWeight:700,fontSize:'0.875rem',marginTop:6}}>{m.l}</div>
                <div style={{fontSize:'0.775rem',color:'#5a5a7a',marginTop:4}}>{m.s}</div>
              </div>
            ))}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.5rem'}}>
            <div style={{background:'rgba(16,185,129,0.04)',border:'1px solid rgba(16,185,129,0.2)',borderRadius:24,padding:'2rem'}}>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:'1.25rem'}}>
                <div style={{width:48,height:48,borderRadius:12,background:'rgba(16,185,129,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.5rem'}}>🏥</div>
                <div><div style={{fontWeight:800,fontSize:'1rem'}}>LAISA Aesthetic Clinic</div><div style={{fontSize:'0.775rem',color:'#10b981',fontFamily:'monospace',fontWeight:600}}>Phase A — Production</div></div>
              </div>
              <p style={{fontSize:'0.9rem',color:'#9090b0',lineHeight:1.8,marginBottom:'1.25rem'}}>We built and deployed the LAISA Agent OS in 6 weeks. Dr. Musa's clinic now runs on 6 AI agents. WhatsApp CRM, booking, email, social. Zero missed follow-ups.</p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                {[['Build cost','R350K'],['Monthly','R55K/month'],['Agents','6 agents'],['Response','< 2 hours']].map(([k,v])=>(
                  <div key={k} style={{background:'rgba(16,185,129,0.06)',borderRadius:10,padding:'0.75rem',textAlign:'center'}}>
                    <div style={{fontSize:'0.65rem',color:'#5a5a7a',marginBottom:4,fontFamily:'monospace'}}>{k}</div>
                    <div style={{fontWeight:800,color:'#10b981'}}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background:'rgba(139,92,246,0.04)',border:'1px solid rgba(139,92,246,0.2)',borderRadius:24,padding:'2rem'}}>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:'1.25rem'}}>
                <div style={{width:48,height:48,borderRadius:12,background:'rgba(139,92,246,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.5rem'}}>🌍</div>
                <div><div style={{fontWeight:800,fontSize:'1rem'}}>Studex Global Markets</div><div style={{fontSize:'0.775rem',color:'#8b5cf6',fontFamily:'monospace',fontWeight:600}}>Pharmasyntez Active</div></div>
              </div>
              <p style={{fontSize:'0.9rem',color:'#9090b0',lineHeight:1.8,marginBottom:'1.25rem'}}>Africa pharma: <strong style={{color:'#e8e8f0'}}>$29.3B (2025) → $44.1B (2032)</strong>. Anti-TB, HIV, oncology, diabetes. SAHPRA licensed. B-BBEE Level 1.</p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                {[['Y1 Pipeline','R2.99M'],['License','SAHPRA'],['B-BBEE','Level 1'],['Countries','54 African']].map(([k,v])=>(
                  <div key={k} style={{background:'rgba(139,92,246,0.06)',borderRadius:10,padding:'0.75rem',textAlign:'center'}}>
                    <div style={{fontSize:'0.65rem',color:'#5a5a7a',marginBottom:4,fontFamily:'monospace'}}>{k}</div>
                    <div style={{fontWeight:800,color:'#8b5cf6'}}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section id='founder' style={{padding:'5rem 2rem',position:'relative',zIndex:1}}>
        <div style={{maxWidth:1200,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'4rem',alignItems:'start'}}>
          <div>
            <div style={{fontSize:'0.7rem',fontWeight:700,color:'#ec4899',letterSpacing:'0.18em',textTransform:'uppercase',marginBottom:8,fontFamily:'monospace'}}>// The Founder</div>
            <h2 style={{fontSize:'clamp(1.5rem,3vw,2.25rem)',fontWeight:900,letterSpacing:'-0.025em',color:'#e8e8f0',lineHeight:1.1,marginBottom:'1.5rem'}}>Meet <span style={{color:'#ec4899'}}>Tumelo Ramaphosa</span></h2>
            <p style={{fontSize:'0.9rem',color:'#9090b0',lineHeight:1.8,marginBottom:'1.5rem'}}>From McDonald's to Hult Business School to IBM + Cardano. From the youngest AWS Certified Cloud Practitioner in Africa to running 8 AI VMs. 11 years building what others said was impossible.</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:'1.5rem'}}>
              {['IBM Partner','Cardano Partner','AWS Partner','Google Cloud Partner'].map(t=>(
                <span key={t} style={{padding:'0.3rem 0.875rem',borderRadius:100