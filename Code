import { useState, useEffect } from "react";

const MISSIONS = [
  { day: 1, title: "INITIALIZE", mission: "Build your Progress Tracker app in Claude. Use the prompt to generate your sci-fi dashboard and get it running.", xp: 100, week: 1 },
  { day: 2, title: "FACT-CHECK", mission: "Learn to use Gemini to verify AI claims. Practice research workflows and cross-checking information.", xp: 150, week: 1 },
  { day: 3, title: "CREATIVE DUEL", mission: "Compare Claude vs. Gemini on storytelling & logic. Document which AI wins each round and why.", xp: 150, week: 1 },
  { day: 4, title: "VAULT SETUP", mission: "GitHub Foundations — Set up your Vault to save all your work. Create your first repo and get your first green square.", xp: 200, week: 1 },
  { day: 5, title: "GO LIVE", mission: "Replit Deployment — Host your tracker app live on the web. Get a shareable URL and send it to someone.", xp: 200, week: 1 },
  { day: 6, title: "PI BOOT", mission: "Pi Setup — Run the One-Command setup script to install the AI brains on your Raspberry Pi.", xp: 250, week: 2 },
  { day: 7, title: "LOCAL BRAIN", mission: "Run a chat model on the Pi with the Wi-Fi OFF. Your AI runs entirely offline — no cloud needed.", xp: 250, week: 2 },
  { day: 8, title: "VISION QUEST", mission: "Use the Pi camera to detect objects in your room. Test it on 5 different objects and log the results.", xp: 250, week: 2 },
  { day: 9, title: "AGENT MODE", mission: "Use Replit Agent to build a tool that talks to the Pi. Connect your cloud app to your physical hardware.", xp: 300, week: 2 },
  { day: 10, title: "ALERT SYSTEM", mission: "Milestone — Build a physical AI Alert system on the Pi. It should detect something and trigger a real-world response.", xp: 300, week: 2 },
  { day: 11, title: "MATH OF AI", mission: "Visualize how a Neuron works on your Pi. Build or run a demo that shows weights, inputs, and outputs.", xp: 250, week: 3 },
  { day: 12, title: "AI ETHICS", mission: "Research AI Guardrails and write your GitHub safety guide. Publish it as a README in a new repo.", xp: 250, week: 3 },
  { day: 13, title: "VOICE CTRL", mission: "Build a voice-controlled alarm or lamp using the Pi. It should respond to at least 2 voice commands.", xp: 300, week: 3 },
  { day: 14, title: "POLISH", mission: "Portfolio Polish — Clean up your code and finish your README files. Every project gets a proper description.", xp: 300, week: 3 },
  { day: 15, title: "GRAND FINALE", mission: "Pitch your projects to the family! Demo everything you've built over 15 days. You earned this. 🎓", xp: 500, week: 3 },
];

const TOOLS = ["CLAUDE", "GEMINI", "PI"];
const TOOL_COLORS = { CLAUDE: "#f97316", GEMINI: "#3b82f6", PI: "#a855f7" };
const WEEK_COLORS = { 1: "#3b82f6", 2: "#a855f7", 3: "#00ffcc" };
const WEEK_LABELS = { 1: "WEEK 1 — MASTERING THE SOFTWARE BRAINS", 2: "WEEK 2 — PHYSICAL AI", 3: "WEEK 3 — MASTERY & GRADUATION" };
const STORAGE_KEY = "ai-bootcamp-tracker-v1";

function loadFromStorage() {
  try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : null; } catch { return null; }
}
function saveToStorage(cards) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cards)); } catch {}
}

function HexGrid() {
  return (
    <div style={{
      position: "fixed", inset: 0, opacity: 0.04, pointerEvents: "none", zIndex: 0,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34z' fill='none' stroke='%2300ffcc' stroke-width='1'/%3E%3Cpath d='M28 100L0 84V50l28-16 28 16v34z' fill='none' stroke='%2300ffcc' stroke-width='1'/%3E%3C/svg%3E")`,
      backgroundSize: "56px 100px"
    }} />
  );
}

function ScanLine() {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, height: "2px",
      background: "linear-gradient(90deg, transparent, #00ffcc, transparent)",
      animation: "scanline 4s linear infinite", zIndex: 1, pointerEvents: "none",
      boxShadow: "0 0 8px #00ffcc"
    }} />
  );
}

function MilestoneBadge({ day5Complete }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", display: "inline-flex", alignItems: "center", gap: "10px",
        padding: "10px 20px", cursor: "default",
        border: `1px solid ${day5Complete ? "#00ffcc" : "rgba(0,255,204,0.25)"}`,
        background: hovered
          ? "linear-gradient(135deg, rgba(0,255,204,0.18), rgba(59,130,246,0.12))"
          : day5Complete
          ? "linear-gradient(135deg, rgba(0,255,204,0.08), rgba(0,255,204,0.03))"
          : "rgba(0,255,204,0.03)",
        clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
        transition: "all 0.3s ease",
        boxShadow: hovered
          ? "0 0 32px rgba(0,255,204,0.5), 0 0 64px rgba(0,255,204,0.2), inset 0 0 20px rgba(0,255,204,0.08)"
          : day5Complete
          ? "0 0 12px rgba(0,255,204,0.2)"
          : "none",
      }}
    >
      {/* Animated ping on hover */}
      {hovered && (
        <div style={{
          position: "absolute", inset: 0,
          border: "1px solid #00ffcc",
          clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
          animation: "badgeping 1s ease-out infinite",
          pointerEvents: "none"
        }} />
      )}
      <div style={{
        fontSize: "20px",
        filter: hovered ? "drop-shadow(0 0 8px #00ffcc)" : "none",
        transition: "filter 0.3s"
      }}>🌐</div>
      <div>
        <div style={{
          color: hovered ? "#ffffff" : day5Complete ? "#00ffcc" : "rgba(0,255,204,0.5)",
          fontSize: "11px", fontWeight: "bold", letterSpacing: "3px", fontFamily: "monospace",
          textShadow: hovered ? "0 0 12px #00ffcc" : "none",
          transition: "all 0.3s"
        }}>DAY 5 MILESTONE</div>
        <div style={{
          color: hovered ? "rgba(0,255,204,0.8)" : "rgba(255,255,255,0.3)",
          fontSize: "9px", letterSpacing: "2px", fontFamily: "monospace", marginTop: "2px",
          transition: "color 0.3s"
        }}>{day5Complete ? "✓ DEPLOYED TO THE WEB" : "DEPLOY YOUR APP LIVE"}</div>
      </div>
      <div style={{
        marginLeft: "6px",
        width: "8px", height: "8px", borderRadius: "50%",
        background: day5Complete ? "#00ffcc" : "rgba(0,255,204,0.2)",
        boxShadow: hovered ? "0 0 12px #00ffcc, 0 0 24px #00ffcc" : day5Complete ? "0 0 6px #00ffcc" : "none",
        animation: day5Complete ? "pulse 2s infinite" : "none",
        transition: "all 0.3s"
      }} />
    </div>
  );
}

function ProgressBar({ percent }) {
  const segments = 30;
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ color: "#00ffcc", fontSize: "11px", letterSpacing: "3px", fontFamily: "monospace" }}>MISSION PROGRESS</span>
        <span style={{ color: "#00ffcc", fontSize: "11px", fontFamily: "monospace" }}>{Math.round(percent)}%</span>
      </div>
      <div style={{ display: "flex", gap: "3px" }}>
        {Array.from({ length: segments }).map((_, i) => {
          const filled = (i / segments) * 100 < percent;
          return (
            <div key={i} style={{
              flex: 1, height: "16px",
              background: filled ? "linear-gradient(180deg, #00ffcc, #00aa88)" : "rgba(0,255,204,0.08)",
              border: `1px solid ${filled ? "#00ffcc" : "rgba(0,255,204,0.2)"}`,
              boxShadow: filled ? "0 0 6px #00ffcc44" : "none",
              transition: "all 0.3s ease",
              clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)"
            }} />
          );
        })}
      </div>
    </div>
  );
}

function StatBlock({ label, value, color = "#00ffcc" }) {
  return (
    <div style={{
      background: "rgba(0,255,204,0.04)", border: `1px solid ${color}33`,
      padding: "12px 18px", clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
      textAlign: "center", minWidth: "100px"
    }}>
      <div style={{ color, fontSize: "22px", fontWeight: "bold", fontFamily: "monospace", textShadow: `0 0 10px ${color}` }}>{value}</div>
      <div style={{ color: `${color}88`, fontSize: "10px", letterSpacing: "2px", marginTop: "2px" }}>{label}</div>
    </div>
  );
}

function WeekDivider({ week }) {
  const color = WEEK_COLORS[week];
  return (
    <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: "16px", margin: "8px 0 4px" }}>
      <div style={{ height: "1px", flex: 1, background: `linear-gradient(90deg, ${color}66, transparent)` }} />
      <span style={{ color, fontSize: "10px", letterSpacing: "3px", fontFamily: "monospace", whiteSpace: "nowrap" }}>◈ {WEEK_LABELS[week]}</span>
      <div style={{ height: "1px", flex: 1, background: `linear-gradient(270deg, ${color}66, transparent)` }} />
    </div>
  );
}

function MissionCard({ mission, index, data, onToggleComplete, onSign, onSetTool }) {
  const isComplete = data.complete;
  const isSigned = data.signed;
  const tool = data.tool || "CLAUDE";
  const weekColor = WEEK_COLORS[mission.week];

  return (
    <div style={{
      background: isComplete ? `linear-gradient(135deg, ${weekColor}11, ${weekColor}05)` : "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
      border: isComplete ? `1px solid ${weekColor}66` : "1px solid rgba(0,255,204,0.15)",
      borderRadius: "2px", padding: "20px", position: "relative", overflow: "hidden",
      transition: "all 0.4s ease",
      boxShadow: isComplete ? `0 0 20px ${weekColor}11, inset 0 0 20px ${weekColor}05` : "none",
      clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))"
    }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: "16px", height: "16px", borderBottom: "16px solid transparent", borderLeft: `16px solid ${isComplete ? weekColor + "66" : "rgba(0,255,204,0.1)"}`, transform: "rotate(90deg)" }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center",
            border: `2px solid ${isComplete ? weekColor : weekColor + "44"}`,
            color: isComplete ? weekColor : weekColor + "66",
            fontSize: "13px", fontFamily: "monospace", fontWeight: "bold",
            clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
            background: isComplete ? weekColor + "22" : "transparent", flexShrink: 0
          }}>{String(mission.day).padStart(2, "0")}</div>
          <div>
            <div style={{ color: isComplete ? weekColor : weekColor + "66", fontSize: "10px", letterSpacing: "3px", marginBottom: "2px" }}>DAY {mission.day}</div>
            <div style={{ color: isComplete ? "#ffffff" : "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: "bold", letterSpacing: "2px", fontFamily: "monospace" }}>{mission.title}</div>
          </div>
        </div>
        <div style={{ background: isComplete ? weekColor + "22" : "rgba(255,255,255,0.05)", border: `1px solid ${isComplete ? weekColor + "44" : "rgba(255,255,255,0.1)"}`, padding: "3px 8px", fontSize: "10px", letterSpacing: "1px", color: isComplete ? weekColor : "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>+{mission.xp} XP</div>
      </div>

      <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "12px", lineHeight: "1.6", marginBottom: "16px", fontFamily: "monospace" }}>{mission.mission}</p>

      <div style={{ marginBottom: "14px" }}>
        <div style={{ color: "rgba(0,255,204,0.4)", fontSize: "9px", letterSpacing: "2px", marginBottom: "6px" }}>TOOL USED</div>
        <div style={{ display: "flex", gap: "6px" }}>
          {TOOLS.map(t => (
            <button key={t} onClick={() => onSetTool(index, t)} style={{
              flex: 1, padding: "5px 0", fontSize: "9px", letterSpacing: "1px",
              border: `1px solid ${tool === t ? TOOL_COLORS[t] : "rgba(255,255,255,0.1)"}`,
              background: tool === t ? `${TOOL_COLORS[t]}22` : "transparent",
              color: tool === t ? TOOL_COLORS[t] : "rgba(255,255,255,0.3)",
              cursor: "pointer", fontFamily: "monospace", transition: "all 0.2s",
              boxShadow: tool === t ? `0 0 8px ${TOOL_COLORS[t]}44` : "none"
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={() => onToggleComplete(index)} style={{
          flex: 1, padding: "8px", fontSize: "10px", letterSpacing: "2px",
          border: `1px solid ${isComplete ? weekColor : weekColor + "44"}`,
          background: isComplete ? weekColor + "22" : "transparent",
          color: isComplete ? weekColor : weekColor + "66",
          cursor: "pointer", fontFamily: "monospace", transition: "all 0.2s", fontWeight: "bold"
        }}>{isComplete ? "✓ COMPLETE" : "MARK DONE"}</button>
        <button onClick={() => onSign(index)} disabled={!isComplete} style={{
          flex: 1, padding: "8px", fontSize: "10px", letterSpacing: "2px",
          border: `1px solid ${isSigned ? "#f97316" : isComplete ? "rgba(249,115,22,0.4)" : "rgba(255,255,255,0.1)"}`,
          background: isSigned ? "rgba(249,115,22,0.15)" : "transparent",
          color: isSigned ? "#f97316" : isComplete ? "rgba(249,115,22,0.5)" : "rgba(255,255,255,0.2)",
          cursor: isComplete ? "pointer" : "not-allowed", fontFamily: "monospace", transition: "all 0.2s",
          boxShadow: isSigned ? "0 0 10px rgba(249,115,22,0.3)" : "none"
        }}>{isSigned ? "✍ SIGNED" : "PARENT SIG"}</button>
      </div>
    </div>
  );
}

export default function App() {
  const [cards, setCards] = useState(() => {
    const saved = loadFromStorage();
    return saved || MISSIONS.map(() => ({ complete: false, signed: false, tool: "CLAUDE" }));
  });
  const [saveIndicator, setSaveIndicator] = useState(false);

  useEffect(() => {
    saveToStorage(cards);
    setSaveIndicator(true);
    const t = setTimeout(() => setSaveIndicator(false), 1500);
    return () => clearTimeout(t);
  }, [cards]);

  const completed = cards.filter(c => c.complete).length;
  const signed = cards.filter(c => c.signed).length;
  const xpEarned = cards.reduce((sum, c, i) => c.complete ? sum + MISSIONS[i].xp : sum, 0);
  const totalXP = MISSIONS.reduce((sum, m) => sum + m.xp, 0);
  const progress = (completed / 15) * 100;
  const toolCounts = TOOLS.reduce((acc, t) => { acc[t] = cards.filter((c, i) => c.complete && c.tool === t).length; return acc; }, {});
  const day5Complete = cards[4]?.complete;

  const onToggleComplete = (i) => setCards(prev => prev.map((c, idx) => idx === i ? { ...c, complete: !c.complete, signed: !c.complete ? c.signed : false } : c));
  const onSign = (i) => setCards(prev => prev.map((c, idx) => idx === i && c.complete ? { ...c, signed: !c.signed } : c));
  const onSetTool = (i, tool) => setCards(prev => prev.map((c, idx) => idx === i ? { ...c, tool } : c));

  const now = new Date();
  const timeStr = now.toTimeString().split(" ")[0];
  const dateStr = now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase();
  const rank = completed < 5 ? "INITIATE" : completed < 10 ? "OPERATIVE" : completed < 15 ? "SPECIALIST" : "ELITE";
  const rankColor = completed < 5 ? "#888" : completed < 10 ? "#3b82f6" : completed < 15 ? "#f97316" : "#00ffcc";

  return (
    <div style={{ minHeight: "100vh", background: "#050a0e", color: "#fff", fontFamily: "'Courier New', monospace", position: "relative", overflowX: "hidden" }}>
      <style>{`
        @keyframes scanline { 0% { top: -2px } 100% { top: 100vh } }
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } }
        @keyframes fadein { from { opacity:0; transform: translateY(8px) } to { opacity:1; transform: translateY(0) } }
        @keyframes badgeping { 0% { opacity:0.8; transform: scale(1) } 100% { opacity:0; transform: scale(1.15) } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050a0e; }
        ::-webkit-scrollbar-thumb { background: #00ffcc33; }
        button:hover { filter: brightness(1.2); }
      `}</style>

      <HexGrid />
      <ScanLine />
      <div style={{ position: "fixed", top: "-20%", left: "-10%", width: "50vw", height: "50vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,204,0.04) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-20%", right: "-10%", width: "40vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {saveIndicator && (
        <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 100, background: "rgba(0,255,204,0.1)", border: "1px solid #00ffcc44", padding: "8px 16px", fontSize: "10px", letterSpacing: "2px", color: "#00ffcc", fontFamily: "monospace", animation: "fadein 0.3s ease" }}>
          ✓ PROGRESS SAVED
        </div>
      )}

      <div style={{ position: "relative", zIndex: 2, maxWidth: "1400px", margin: "0 auto", padding: "24px 20px" }}>

        {/* Header */}
        <div style={{ marginBottom: "32px", borderBottom: "1px solid rgba(0,255,204,0.15)", paddingBottom: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div style={{ color: "rgba(0,255,204,0.5)", fontSize: "10px", letterSpacing: "4px", marginBottom: "6px" }}>◈ AI BOOTCAMP MISSION CONTROL</div>
              <h1 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: "900", letterSpacing: "4px", margin: 0, background: "linear-gradient(90deg, #00ffcc, #3b82f6, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>PRO-BUILDER TRACKER</h1>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "3px", marginTop: "4px" }}>15-DAY AI ACCELERATION PROGRAM</div>
              {/* Day 5 Milestone Badge */}
              <div style={{ marginTop: "14px" }}>
                <MilestoneBadge day5Complete={day5Complete} />
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#00ffcc", fontSize: "22px", fontFamily: "monospace", fontWeight: "bold" }}>{timeStr}</div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", letterSpacing: "2px" }}>{dateStr}</div>
              <div style={{ marginTop: "6px", display: "inline-block", padding: "3px 10px", border: `1px solid ${rankColor}`, color: rankColor, fontSize: "10px", letterSpacing: "2px", background: `${rankColor}11` }}>RANK: {rank}</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "28px", flexWrap: "wrap" }}>
          <StatBlock label="MISSIONS DONE" value={`${completed}/15`} color="#00ffcc" />
          <StatBlock label="SIGNED OFF" value={`${signed}/15`} color="#f97316" />
          <StatBlock label="XP EARNED" value={xpEarned.toLocaleString()} color="#3b82f6" />
          <StatBlock label="TOTAL XP" value={totalXP.toLocaleString()} color="#a855f7" />
          {TOOLS.map(t => <StatBlock key={t} label={`${t} USES`} value={toolCounts[t]} color={TOOL_COLORS[t]} />)}
        </div>

        {/* Progress bar */}
        <div style={{ background: "rgba(0,255,204,0.03)", border: "1px solid rgba(0,255,204,0.1)", padding: "20px", marginBottom: "32px", clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))" }}>
          <ProgressBar percent={progress} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            {["START", "WK 1", "WK 2", "WK 3", "GRAD"].map((l, i) => (
              <span key={i} style={{ color: progress >= i * 25 ? "#00ffcc88" : "rgba(255,255,255,0.2)", fontSize: "9px", letterSpacing: "1px" }}>{l}</span>
            ))}
          </div>
        </div>

        {/* Mission grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
          {[1, 2, 3].map(week => (
            <>
              <WeekDivider key={`week-${week}`} week={week} />
              {MISSIONS.filter(m => m.week === week).map((m) => {
                const globalIndex = MISSIONS.findIndex(x => x.day === m.day);
                return <MissionCard key={m.day} mission={m} index={globalIndex} data={cards[globalIndex]} onToggleComplete={onToggleComplete} onSign={onSign} onSetTool={onSetTool} />;
              })}
            </>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: "40px", borderTop: "1px solid rgba(0,255,204,0.1)", paddingTop: "16px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
          <span style={{ color: "rgba(0,255,204,0.3)", fontSize: "10px", letterSpacing: "2px" }}>◈ AUTO-SAVE ENABLED</span>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "10px", letterSpacing: "1px" }}>AI BOOTCAMP — MISSION CONTROL</span>
          <span style={{ color: "rgba(0,255,204,0.3)", fontSize: "10px", letterSpacing: "2px", animation: "pulse 2s infinite" }}>● LIVE</span>
        </div>
      </div>
    </div>
  );
}
