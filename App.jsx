import { useState, useEffect } from "react";

const MISSIONS = [
  { day: 1, title: "INITIALIZE", mission: "Set up your AI workspace & accounts. Explore your first AI tool interface.", xp: 100 },
  { day: 2, title: "RECON", mission: "Learn prompt engineering basics. Master the art of asking the right questions.", xp: 150 },
  { day: 3, title: "SYNTHESIZE", mission: "Generate your first AI-written content. Edit & refine outputs to perfection.", xp: 150 },
  { day: 4, title: "VISUALIZE", mission: "Create AI-generated images. Explore text-to-image prompting strategies.", xp: 200 },
  { day: 5, title: "AUTOMATE", mission: "Build your first AI-assisted workflow. Chain prompts for complex tasks.", xp: 200 },
  { day: 6, title: "ANALYZE", mission: "Feed data to AI. Extract insights, summaries, and patterns from documents.", xp: 250 },
  { day: 7, title: "CHECKPOINT", mission: "Review progress. Rebuild & optimize your top 3 prompts from this week.", xp: 300 },
  { day: 8, title: "CONSTRUCT", mission: "Build a mini AI-powered tool or template for a real-world use case.", xp: 250 },
  { day: 9, title: "INFILTRATE", mission: "Use AI to research a competitor, topic, or industry. Produce a brief.", xp: 200 },
  { day: 10, title: "BROADCAST", mission: "Create a full social media post series using AI from concept to caption.", xp: 200 },
  { day: 11, title: "NEGOTIATE", mission: "Use AI for writing emails, proposals, or scripts. Practice tone-switching.", xp: 250 },
  { day: 12, title: "DECODE", mission: "Have AI explain a complex topic 3 ways. Build a knowledge base entry.", xp: 250 },
  { day: 13, title: "ACCELERATE", mission: "Complete a full project in under 2 hours using AI assistance throughout.", xp: 300 },
  { day: 14, title: "TRANSMIT", mission: "Teach someone else one AI skill you've mastered. Document your method.", xp: 300 },
  { day: 15, title: "ASCEND", mission: "Final challenge: Build & present your AI Bootcamp capstone project.", xp: 500 },
];

const TOOLS = ["CLAUDE", "GEMINI", "PI"];
const TOOL_COLORS = { CLAUDE: "#f97316", GEMINI: "#3b82f6", PI: "#a855f7" };

function GlitchText({ text, className = "" }) {
  return (
    <span className={`relative inline-block ${className}`} style={{ fontFamily: "'Courier New', monospace" }}>
      {text}
    </span>
  );
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

function ProgressBar({ percent }) {
  const segments = 30;
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ color: "#00ffcc", fontSize: "11px", letterSpacing: "3px", fontFamily: "monospace" }}>MISSION PROGRESS</span>
        <span style={{ color: "#00ffcc", fontSize: "11px", fontFamily: "monospace" }}>{Math.round(percent)}%</span>
      </div>
      <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
        {Array.from({ length: segments }).map((_, i) => {
          const filled = (i / segments) * 100 < percent;
          return (
            <div key={i} style={{
              flex: 1, height: "16px",
              background: filled ? `linear-gradient(180deg, #00ffcc, #00aa88)` : "rgba(0,255,204,0.08)",
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

function MissionCard({ mission, index, data, onToggleComplete, onSign, onSetTool }) {
  const isComplete = data.complete;
  const isSigned = data.signed;
  const tool = data.tool || "CLAUDE";

  return (
    <div style={{
      background: isComplete
        ? "linear-gradient(135deg, rgba(0,255,204,0.08), rgba(0,180,140,0.04))"
        : "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
      border: isComplete ? "1px solid rgba(0,255,204,0.5)" : "1px solid rgba(0,255,204,0.15)",
      borderRadius: "2px",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
      transition: "all 0.4s ease",
      boxShadow: isComplete ? "0 0 20px rgba(0,255,204,0.08), inset 0 0 20px rgba(0,255,204,0.03)" : "none",
      clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))"
    }}>
      {/* Corner accent */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: "16px", height: "16px",
        borderBottom: "16px solid transparent",
        borderLeft: `16px solid ${isComplete ? "rgba(0,255,204,0.4)" : "rgba(0,255,204,0.1)"}`,
        transform: "rotate(90deg)"
      }} />

      {/* Day badge */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center",
            border: `2px solid ${isComplete ? "#00ffcc" : "rgba(0,255,204,0.3)"}`,
            color: isComplete ? "#00ffcc" : "rgba(0,255,204,0.5)",
            fontSize: "13px", fontFamily: "monospace", fontWeight: "bold",
            clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
            background: isComplete ? "rgba(0,255,204,0.1)" : "transparent",
            flexShrink: 0
          }}>
            {String(mission.day).padStart(2, "0")}
          </div>
          <div>
            <div style={{ color: isComplete ? "#00ffcc" : "rgba(0,255,204,0.5)", fontSize: "10px", letterSpacing: "3px", marginBottom: "2px" }}>
              DAY {mission.day}
            </div>
            <div style={{ color: isComplete ? "#ffffff" : "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: "bold", letterSpacing: "2px", fontFamily: "monospace" }}>
              {mission.title}
            </div>
          </div>
        </div>
        <div style={{
          background: isComplete ? "rgba(0,255,204,0.15)" : "rgba(255,255,255,0.05)",
          border: `1px solid ${isComplete ? "#00ffcc44" : "rgba(255,255,255,0.1)"}`,
          padding: "3px 8px", fontSize: "10px", letterSpacing: "1px",
          color: isComplete ? "#00ffcc" : "rgba(255,255,255,0.3)", fontFamily: "monospace"
        }}>
          +{mission.xp} XP
        </div>
      </div>

      {/* Mission text */}
      <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "12px", lineHeight: "1.6", marginBottom: "16px", fontFamily: "monospace" }}>
        {mission.mission}
      </p>

      {/* Tool selector */}
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

      {/* Action buttons */}
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={() => onToggleComplete(index)} style={{
          flex: 1, padding: "8px", fontSize: "10px", letterSpacing: "2px",
          border: `1px solid ${isComplete ? "#00ffcc" : "rgba(0,255,204,0.3)"}`,
          background: isComplete ? "rgba(0,255,204,0.15)" : "transparent",
          color: isComplete ? "#00ffcc" : "rgba(0,255,204,0.5)",
          cursor: "pointer", fontFamily: "monospace", transition: "all 0.2s",
          fontWeight: "bold"
        }}>
          {isComplete ? "✓ COMPLETE" : "MARK DONE"}
        </button>
        <button onClick={() => onSign(index)} disabled={!isComplete} style={{
          flex: 1, padding: "8px", fontSize: "10px", letterSpacing: "2px",
          border: `1px solid ${isSigned ? "#f97316" : isComplete ? "rgba(249,115,22,0.4)" : "rgba(255,255,255,0.1)"}`,
          background: isSigned ? "rgba(249,115,22,0.15)" : "transparent",
          color: isSigned ? "#f97316" : isComplete ? "rgba(249,115,22,0.5)" : "rgba(255,255,255,0.2)",
          cursor: isComplete ? "pointer" : "not-allowed", fontFamily: "monospace",
          transition: "all 0.2s",
          boxShadow: isSigned ? "0 0 10px rgba(249,115,22,0.3)" : "none"
        }}>
          {isSigned ? "✍ SIGNED" : "PARENT SIG"}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [cards, setCards] = useState(
    MISSIONS.map(() => ({ complete: false, signed: false, tool: "CLAUDE" }))
  );
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const completed = cards.filter(c => c.complete).length;
  const signed = cards.filter(c => c.signed).length;
  const xpEarned = cards.reduce((sum, c, i) => c.complete ? sum + MISSIONS[i].xp : sum, 0);
  const totalXP = MISSIONS.reduce((sum, m) => sum + m.xp, 0);
  const progress = (completed / 15) * 100;

  const toolCounts = TOOLS.reduce((acc, t) => {
    acc[t] = cards.filter((c, i) => c.complete && c.tool === t).length;
    return acc;
  }, {});

  const onToggleComplete = (i) => setCards(prev => prev.map((c, idx) => idx === i ? { ...c, complete: !c.complete, signed: !c.complete ? c.signed : false } : c));
  const onSign = (i) => setCards(prev => prev.map((c, idx) => idx === i && c.complete ? { ...c, signed: !c.signed } : c));
  const onSetTool = (i, tool) => setCards(prev => prev.map((c, idx) => idx === i ? { ...c, tool } : c));

  const now = new Date();
  const timeStr = now.toTimeString().split(" ")[0];
  const dateStr = now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase();

  const rank = completed < 5 ? "INITIATE" : completed < 10 ? "OPERATIVE" : completed < 15 ? "SPECIALIST" : "ELITE";
  const rankColor = completed < 5 ? "#888" : completed < 10 ? "#3b82f6" : completed < 15 ? "#f97316" : "#00ffcc";

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050a0e",
      color: "#fff",
      fontFamily: "'Courier New', monospace",
      position: "relative",
      overflowX: "hidden"
    }}>
      <style>{`
        @keyframes scanline { 0% { top: -2px } 100% { top: 100vh } }
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } }
        @keyframes flicker { 0%,98%,100% { opacity:1 } 99% { opacity:0.8 } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050a0e; }
        ::-webkit-scrollbar-thumb { background: #00ffcc33; }
        button:hover { filter: brightness(1.2); }
      `}</style>

      <HexGrid />
      <ScanLine />

      {/* Ambient glow blobs */}
      <div style={{ position: "fixed", top: "-20%", left: "-10%", width: "50vw", height: "50vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,204,0.04) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-20%", right: "-10%", width: "40vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "1400px", margin: "0 auto", padding: "24px 20px" }}>

        {/* Header */}
        <div style={{ marginBottom: "32px", borderBottom: "1px solid rgba(0,255,204,0.15)", paddingBottom: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div style={{ color: "rgba(0,255,204,0.5)", fontSize: "10px", letterSpacing: "4px", marginBottom: "6px" }}>
                ◈ ANTHROPIC BOOTCAMP SYSTEM v2.0
              </div>
              <h1 style={{
                fontSize: "clamp(22px, 4vw, 36px)", fontWeight: "900", letterSpacing: "4px", margin: 0,
                background: "linear-gradient(90deg, #00ffcc, #3b82f6, #00ffcc)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundSize: "200%",
                textShadow: "none"
              }}>
                PRO-BUILDER TRACKER
              </h1>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "3px", marginTop: "4px" }}>
                15-DAY AI ACCELERATION PROGRAM
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#00ffcc", fontSize: "22px", fontFamily: "monospace", fontWeight: "bold", animation: "flicker 8s infinite" }}>{timeStr}</div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", letterSpacing: "2px" }}>{dateStr}</div>
              <div style={{ marginTop: "6px", display: "inline-block", padding: "3px 10px", border: `1px solid ${rankColor}`, color: rankColor, fontSize: "10px", letterSpacing: "2px", background: `${rankColor}11` }}>
                RANK: {rank}
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "28px", flexWrap: "wrap" }}>
          <StatBlock label="MISSIONS DONE" value={`${completed}/15`} color="#00ffcc" />
          <StatBlock label="SIGNED OFF" value={`${signed}/15`} color="#f97316" />
          <StatBlock label="XP EARNED" value={xpEarned.toLocaleString()} color="#3b82f6" />
          <StatBlock label="TOTAL XP" value={totalXP.toLocaleString()} color="#a855f7" />
          {TOOLS.map(t => (
            <StatBlock key={t} label={`${t} USES`} value={toolCounts[t]} color={TOOL_COLORS[t]} />
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ background: "rgba(0,255,204,0.03)", border: "1px solid rgba(0,255,204,0.1)", padding: "20px", marginBottom: "32px", clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))" }}>
          <ProgressBar percent={progress} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            {[0, 25, 50, 75, 100].map(p => (
              <span key={p} style={{ color: progress >= p ? "#00ffcc88" : "rgba(255,255,255,0.2)", fontSize: "9px", letterSpacing: "1px" }}>
                {p === 0 ? "START" : p === 100 ? "ASCEND" : `${p}%`}
              </span>
            ))}
          </div>
        </div>

        {/* Mission grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
          {MISSIONS.map((m, i) => (
            <MissionCard key={i} mission={m} index={i} data={cards[i]} onToggleComplete={onToggleComplete} onSign={onSign} onSetTool={onSetTool} />
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: "40px", borderTop: "1px solid rgba(0,255,204,0.1)", paddingTop: "16px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
          <span style={{ color: "rgba(0,255,204,0.3)", fontSize: "10px", letterSpacing: "2px" }}>◈ SYSTEM OPERATIONAL</span>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "10px", letterSpacing: "1px" }}>AI BOOTCAMP — MISSION CONTROL</span>
          <span style={{ color: "rgba(0,255,204,0.3)", fontSize: "10px", letterSpacing: "2px", animation: "pulse 2s infinite" }}>● LIVE</span>
        </div>
      </div>
    </div>
  );
}
