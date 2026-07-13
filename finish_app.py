remaining = '''
                {i:"H",n:"Hermes",r:"Chief Technology Officer",d:"Self-hosted LLM. Ollama Qwen 2.5. Persistent memory. Multi-agent orchestration.",s:["Ollama Qwen 2.5","GitHub","Self-Hosted"]},
                {i:"N",n:"Naledi",r:"Chief Marketing Officer",d:"Content calendars, social media, multi-platform campaigns 24/7.",s:["20 posts/month","Analytics","Multi-platform"]},
                {i:"A",n:"Auto-Commerce",r:"E-Commerce Manager",d:"Shopify, listings, orders, inventory, customer comms.",s:["Shopify","Inventory","Orders"]},
                {i:"R",n:"Robusca",r:"Chief of Staff",d:"Coordinates all agents, manages priorities, calendar.",s:["Coordination","War Room","Reporting"]},
                {i:"M",n:"Obsidian Mind",r:"Memory and Reasoning Core",d:"Persistent vault. Semantic search. Decision records.",s:["Vault","Semantic Search","Memory"]},
                {i:"V",n:"Voice Agent",r:"Client Communications",d:"Real-time voice AI. Speaks to clients 24/7.",s:["OpenAI Realtime","Eleven Labs","SA Phone"]},
              ].map(a => (
                <div key={a.n} className="rounded-2xl p-6 border" style={{background:"#0d0d1c",borderColor:"#1c1c32"}}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black mb-4" style={{background:"rgba(108,99,255,0.1)",color:"#6c63ff"}}>{a.i}</div>
                  <div className="text-sm font-bold mb-0.5">{a.n}</div>
                  <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{color:"#6c63ff"}}>{a.r}</div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">{a.d}</p>
                  <div className="flex flex-wrap gap-2">
                    {a.s.map(sk => (
                      <span key={sk} className="px-2.5 py-1 rounded-lg text-xs font-semibold" style={{background:"#11111f",border:"1px solid #1c1c32",color:"#7070a8"}}>{sk}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="border-t" style={{borderColor:"#1c1c32",background:"#0d0d1c"}}>
        <div className="max-w-6xl mx-auto px-6 py-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white" style={{background:"linear-gradient(135deg,#6c63ff,#00d4ff)"}}>DF</div>
            <div>
              <div className="text-xs font-bold text-gray-400">Dark Factory</div>
              <div className="text-xs text-gray-700">OGRE Computer · Studex Group · 2026</div>
            </div>
          </div>
          <div className="text-xs text-gray-700 text-right">
            cto@studex-group.com<br/>Johannesburg, South Africa
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform: translateY(4px) } to { opacity:1; transform: translateY(0) } }
        .animate-in { animation: fadeIn 0.3s ease }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  )
}
'''

with open('/workspace/df-site/src/App.tsx', 'a') as f:
    f.write(remaining)

size = len(open('/workspace/df-site/src/App.tsx').read())
lines = open('/workspace/df-site/src/App.tsx').read().count('\n')
print(f"Final: {size} bytes, {lines} lines")
