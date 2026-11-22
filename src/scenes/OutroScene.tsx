import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Pokeball } from "../components/Pokeball";
import { EPISODE, OV, TIMELINE } from "../data/day01";
import { C, FONT_BODY, FONT_DISPLAY, outlined } from "../theme";

const Tick: React.FC = () => (
  <svg width="54" height="54" viewBox="0 0 54 54">
    <circle cx="27" cy="27" r="25" fill="#2FBF71" stroke="#fff" strokeWidth="4" />
    <path d="M15 28l8 8 17-18" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fade = interpolate(frame, [0, OV], [0, 1], { extrapolateRight: "clamp" });
  const items = [
    "Finish line crossed",
    `${TIMELINE.dexTotal} Pokémon spotted`,
    "Gym Badge + medal earned",
    "Cards + plush collected",
  ];
  const title = spring({ frame: frame - 2, fps, config: { damping: 11, stiffness: 150 } });
  const next = spring({ frame: frame - 14 - items.length * 9, fps, config: { damping: 12, stiffness: 130 } });
  return (
    <AbsoluteFill style={{ opacity: fade, background: `linear-gradient(160deg, ${C.yellow}, ${C.orange})` }}>
      <Pokeball size={1500} style={{ position: "absolute", left: -600, bottom: -500, opacity: 0.15, transform: `rotate(${-frame * 2}deg)` }} />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 290 }}>
        <div style={{ ...outlined(150), color: "#fff", textAlign: "center", transform: `scale(${0.5 + 0.5 * title})`, opacity: title }}>
          DAY {String(EPISODE.day).padStart(2, "0")}
          <br />
          COMPLETE
        </div>
        <div style={{ marginTop: 70, display: "flex", flexDirection: "column", gap: 26 }}>
          {items.map((it, i) => {
            const s = spring({ frame: frame - 12 - i * 9, fps, config: { damping: 13, stiffness: 150 } });
            return (
              <div key={it} style={{ display: "flex", alignItems: "center", gap: 22, background: "#fff", borderRadius: 40, padding: "16px 40px 16px 20px", transform: `translateX(${(1 - s) * 900}px)`, boxShadow: "0 8px 0 rgba(42,59,153,.5)" }}>
                <Tick />
                <span style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 48, color: C.dark }}>{it}</span>
              </div>
            );
          })}
        </div>
        <div style={{ position: "absolute", bottom: 360, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: next, transform: `scale(${0.8 + 0.2 * next})` }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 84, color: C.blue }}>SEE YOU TOMORROW</div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, background: C.blue, color: "#fff", borderRadius: 50, padding: "10px 40px 10px 20px", fontFamily: FONT_DISPLAY, fontSize: 64 }}>
            <Pokeball size={64} /> DAY {String(EPISODE.day + 1).padStart(2, "0")} →
          </div>
          <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 24, color: C.dark, opacity: 0.7, textAlign: "center", marginTop: 20 }}>
            Fan-made vlog · Pokémon © Nintendo / Creatures Inc. / GAME FREAK inc.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
