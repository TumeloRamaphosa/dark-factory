chunk = '''                name="company"
                value={form.company}
                onChange={handleInput}
                placeholder="Studex Group"
                type="text"
                className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-[#11111f] border text-gray-200 placeholder-gray-700 focus:border-indigo-500/50"
                style={{ borderColor: "#1c1c32" }}
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-600 block mb-2">
                Type
              </label>
              <select
                value={form.type}
                onChange={handleSelect}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-[#11111f] border text-gray-200"
                style={{ borderColor: "#1c1c32" }}
              >
                {PROJECT_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-600 block mb-2">
                Project Description
              </label>
              <textarea
                name="desc"
                value={form.desc}
                onChange={handleTextarea}
                rows={4}
                placeholder="Describe what you want built. Be specific about features, integrations, users..."
                className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none bg-[#11111f] border text-gray-200 placeholder-gray-700 focus:border-indigo-500/50"
                style={{ borderColor: "#1c1c32" }}
              />
            </div>
            <div className="col-span-2 flex justify-center pt-2">
              <button
                type="submit"
                className="px-12 py-4 rounded-xl text-base font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: "#6c63ff", boxShadow: "0 8px 32px rgba(108,99,255,0.45)" }}
              >
                Submit Project — R29
              </button>
            </div>
          </form>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div style={{ borderTop: "1px solid #1c1c32" }} /></div>

      {/* AGENTS */}
      <section id="agents" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#6c63ff" }}>
          Intelligence Layer
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">The AI Agent Team</h2>
        <p className="text-gray-500 max-w-xl mb-12 leading-relaxed">
          Six specialist agents. Each running 24/7. OpenJarvis + Ollama + Eleven Labs + Cursor.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {AGENTS.map(agent => (
            <div
              key={agent.name}
              className="rounded-2xl p-6 border"
              style={{ background: "#0d0d1c", borderColor: "#1c1c32" }}
            >
              <div
                className="text-2xl w-12 h-12 rounded-xl flex items-center justify-center font-black mb-4"
                style={{ background: "rgba(108,99,255,0.1)", color: "#6c63ff" }}
              >
                {agent.icon}
              </div>
              <div className="text-base font-bold mb-0.5">{agent.name}</div>
              <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#6c63ff" }}>
                {agent.role}
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{agent.desc}</p>
              <div className="flex flex-wrap gap-2">
                {agent.stack.map(s => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                    style={{ background: "#11111f", border: "1px solid #1c1c32", color: "#7070a8" }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t mt-8" style={{ borderColor: "#1c1c32", background: "#0d0d1c" }}>
        <div className="max-w-6xl mx-auto px-6 py-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white"
              style={{ background: "linear-gradient(135deg,#6c63ff,#00d4ff)" }}
            >
              DF
            </div>
            <div>
              <div className="text-xs font-bold text-gray-400">Dark Factory</div>
              <div className="text-xs text-gray-600">OGRE Computer · Studex Group · 2026</div>
            </div>
          </div>
          <div className="text-xs text-gray-600 text-right">
            cto@studex-group.com<br />
            Johannesburg, South Africa
          </div>
        </div>
      </footer>
    </div>
  )
}
'''

with open('/workspace/df-site/src/App.tsx', 'a') as f:
    f.write(chunk)

print("Appended", len(chunk), "chars. Total file size:", len(open('/workspace/df-site/src/App.tsx').read()))
