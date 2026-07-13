
              <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#C9A84C', background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 20, padding: '3px 10px' }}>{m.stat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: '0 32px 80px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 11, color: '#C9A84C', fontFamily: 'monospace', letterSpacing: '0.2em', marginBottom: 12 }}>THE FLOW</div>
          <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 900 }}>From idea to live product in 4 steps</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {stepDefs.map((s, i) => (
            <Step key={s.title} n={i + 1} {...s} status={step > i ? 'done' : step === i ? 'active' : 'idle'} />
          ))}
        </div>

        {/* CodeRabbit */}
        <div style={{ marginTop: 32, background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 16, padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 32 }}>🐰</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 17, color: '#fff', marginBottom: 4 }}>CodeRabbit AI Code Review</div>
              <div style={{ fontSize: 13, color: '#9ca3af' }}>Every pull request reviewed before it merges. Security, performance, and best practice flags in real time.</div>
            </div>
            {buildDone && <div style={{ marginLeft: 'auto', fontSize: 11, color: '#22c55e', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 20, padding: '4px 12px', whiteSpace: 'nowrap' }}>✓ Active on this build</div>}
          </div>
          {buildDone ? (
            <div style={{ display: 'grid', gap: 10 }}>
              {REVIEWS.map(r => (
                <div key={r.file} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: '#9ca3af', fontFamily: 'monospace' }}>{r.file}</span>
                    <span style={{ fontSize: 10, color: '#6b7280' }}>{r.lang}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 10, padding: '2px 8px', borderRadius: 10, background: r.status === 'approved' ? 'rgba(34,197,94,0.15)' : 'rgba(234,179,8,0.15)', color: r.status === 'approved' ? '#22c55e' : '#eab308', border: `1px solid ${r.status === 'approved' ? 'rgba(34,197,94,0.4)' : 'rgba(234,179,8,0.4)'}`, fontFamily: 'monospace' }}>
                      {r.status === 'approved' ? '✓ Approved' : '↻ Changes requested'}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.6 }}>{r.comment}</div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${buildProgress}%`, background: 'linear-gradient(90deg, #f59e0b, #C9A84C)', transition: 'width 0.3s', borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 11, color: '#C9A84C', fontFamily: 'monospace', minWidth: 36 }}>{Math.round(buildProgress)}%</span>
              </div>
              <div style={{ fontSize: 11, color: '#6b7280', fontFamily: 'monospace' }}>booking.tsx → api/appointments.ts → schema.prisma → ...</div>
            </div>
          )}
        </div>
      </section>

      {/* ── SUBMIT ── */}
      <section id="submit" style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: '0 32px 80px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 11, color: '#C9A84C', fontFamily: 'monospace', letterSpacing: '0.2em', marginBottom: 12 }}>START HERE</div>
          <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 900 }}>Submit your idea</h2>
          <p style={{ color: '#9ca3af', marginTop: 8 }}>Voice note, link, or typed description. Pick your lane.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          {/* Voice notes */}
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{ fontSize: 24 }}>🎙️</span>
              <span style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>Voice Notes</span>
              <span style={{ marginLeft: 'auto', fontSize: 10, color: '#6b7280', fontFamily: 'monospace' }}>MiniMax TTS</span>
            </div>
            <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
              {notes.map(n => (
                <div key={n.id} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#ef4444"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
                    </div>
                    <span style={{ fontSize: 11, color: '#9ca3af' }}>{n.dur} · {n.time}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 10, color: '#22c55e', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 20, padding: '2px 8px' }}>✓ Transcribed</span>
                  </div>
                  <p style={{ fontSize: 12, color: '#d1d5db', fontStyle: 'italic', lineHeight: 1.6 }}>"{n.text}"</p>
                </div>
              ))}
            </div>
            {submitted && <div style={{ padding: '10px 14px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 10, fontSize: 13, color: '#22c55e', textAlign: 'center', marginBottom: 14 }}>✓ Voice note submitted — AI analysing your brief...</div>}
            <button
              onMouseDown={() => !recording && startRecord()}
              onMouseUp={() => recording && stopRecord()}
              style={{ width: '100%', padding: '14px', borderRadius: 10, fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s', background: recording ? 'rgba(239,68,68,0.8)' : '#C9A84C', color: recording ? '#fff' : '#0a0a0a' }}>
              {recording ? (
                <><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff', animation: 'pulse 1s infinite', display: 'inline-block' }} />{fmt(recordingTimer)} — Release to stop</>
              ) : (
                <><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/></svg>Hold to record</>
              )}
            </button>
          </div>

          {/* Links */}
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{ fontSize: 24 }}>🔗</span>
              <span style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>Reference Links</span>
              <span style={{ marginLeft: 'auto', fontSize: 10, color: '#6b7280', fontFamily: 'monospace' }}>Figma · Notion · Loom</span>
            </div>
            {[{ u: 'figma.com/file/salon-booking-v3', t: 'Figma', d: 'Booking flow mockup' }, { u: 'notion.so/clinic-workflows', t: 'Notion', d: 'Current intake process' }].map(l => (
              <div key={l.u} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 12, marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{l.t === 'Figma' ? '🎨' : '📋'}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, color: '#C9A84C', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.u}</div>
                    <div style={{ fontSize: 10, color: '#6b7280' }}>{l.d}</div>
                  </div>
                  <span style={{ fontSize: 10, color: '#6b7280', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'monospace', flexShrink: 0 }}>{l.t}</span>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <input value={link} onChange={e => setLink(e.target.value)} onKeyDown={e => e.key === 'Enter' && submitLink()} placeholder="Paste Figma, Notion, or any URL..." style={{ flex: 1, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: '#fff', outline: 'none', fontFamily: 'monospace' }} />
              <button onClick={submitLink} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontWeight: 700, fontSize: 12, padding: '10px 16px', borderRadius: 8, cursor: 'pointer', whiteSpace: 'nowrap' }}>Submit</button>
            </div>
          </div>
        </div>

        {/* Type description */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 24 }}>⌨️</span>
            <span style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>Or just type it</span>
          </div>
          <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={4} placeholder="Describe your product idea in plain English. What does it do? Who uses it? What should it look like? What problem does it solve?..." style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '12px 14px', fontSize: 13, color: '#fff', outline: 'none', resize: 'none', lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
            <span style={{ fontSize: 12, color: '#6b7280' }}>Be as descriptive as possible — the more detail, the better the output.</span>
            <button onClick={startBuild} style={{ background: '#C9A84C', color: '#0a0a0a', fontWeight: 700, fontSize: 13, padding: '12px 24px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
              Start building — R29 →
            </button>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section style={{ position: 'relative', zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(201,168,76,0.02)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, textAlign: 'center', marginBottom: 48 }}>What you receive</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {WHAT_YOU_GET.map(w => (
              <div key={w.t} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{w.i}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: 6 }}>{w.t}</div>
                <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.65 }}>{w.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: '80px 32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, marginBottom: 12 }}>Simple pricing.</h2>
          <p style={{ color: '#9ca3af', fontSize: 16 }}>R29 per product. No subscription. No surprises.</p>
        </div>
        <div style={{ maxWidth: 440, margin: '0 auto' }}>
          <div style={{ background: 'rgba(201,168,76,0.06)', border: '2px solid rgba(201,168,76,0.5)', borderRadius: 20, padding: 36, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, background: '#C9A84C', color: '#0a0a0a', fontSize: 10, fontWeight: 900, padding: '4px 14px', borderBottomLeftRadius: 12 }}>BEST VALUE</div>
            <div style={{ fontSize: 64, fontWeight: 900, color: '#C9A84C', lineHeight: 1 }}>R29</div>
            <div style={{ fontSize: 15, color: '#9ca3af', marginBottom: 28, marginTop: 4 }}>per completed product</div>
            {['One product, one price', 'CodeRabbit AI review included', 'Unlimited revisions until approved', 'Production deployment included', 'PRD document included', '24h support after delivery', 'No monthly commitment'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left', fontSize: 13, color: '#d1d5db', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ color: '#22c55e', fontSize: 16 }}>✓</span>{f}
              </div>
            ))}
            <a href="#submit" style={{ display: 'block', width: '100%', marginTop: 24, background: '#C9A84C', color: '#0a0a0a', fontWeight: 800, fontSize: 15, padding: '16px', borderRadius: 10, textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(201,168,76,0.3)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '' }}>
              Start your first build →
            </a>
            <p style={{ fontSize: 11, color: '#6b7280', marginTop: 14 }}>50% payment now · 50% when you approve the build</p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '80px 32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, marginBottom: 12 }}>Ready to build?</h2>
        <p style={{ color: '#9ca3af', marginBottom: 32, fontSize: 15 }}>First build is R29. If you don't love it, we fix it free.</p>
        <a href="#submit" style={{ display: 'inline-block', background: '#C9A84C', color: '#0a0a0a', fontWeight: 900, fontSize: 17, padding: '18px 48px', borderRadius: 12, textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(201,168,76,0.35)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '' }}>
          Launch Dark Factory →
        </a>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position: 'relative', zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px 32px', textAlign: 'center', fontSize: 12, color: '#4b5563' }}>
        DARKFACTORY · Built by <span style={{ color: '#C9A84C' }}>OGRE Computer</span> · Studex Group AI Infrastructure · 2026 ·
        <a href="mailto:info@studexmeat.com" style={{ color: '#C9A84C', textDecoration: 'none', marginLeft: 8 }}>info@studexmeat.com</a>
      </footer>
    </div>
  )
}
