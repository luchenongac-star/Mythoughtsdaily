import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT_BODY, outlined } from "../theme";

export const Caption: React.FC<{ text: string; sub?: string; delay?: number; bottom?: number }> = ({ text, sub, delay = 6, bottom = 330 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 170, mass: 0.7 } });
  const size = text.length > 22 ? 78 : text.length > 14 ? 96 : 118;
  return (
    <div
      style={{
        position: "absolute", left: 40, right: 40, bottom, display: "flex", flexDirection: "column",
        alignItems: "center", gap: 18, transform: `translateY(${(1 - s) * 140}px) scale(${0.85 + 0.15 * s})`,
        opacity: interpolate(s, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }),
      }}
    >
      <div style={{ ...outlined(size), textAlign: "center", textTransform: "uppercase" }}>{text}</div>
      {sub ? (
        <div style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 40, color: "#fff", background: "rgba(20,23,43,.72)", padding: "10px 30px", borderRadius: 40, textAlign: "center" }}>
          {sub}
        </div>
      ) : null}
    </div>
  );
};

export const DexBadge: React.FC<{ name: string; index: number; total: number }> = ({ name, index, total }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 12, fps, config: { damping: 13, stiffness: 150 } });
  return (
    <div
      style={{
        position: "absolute", left: 48, top: 350, display: "flex", alignItems: "center", gap: 14,
        transform: `translateX(${(1 - s) * -520}px)`, background: C.red, color: "#fff", borderRadius: 18,
        padding: "12px 26px", fontFamily: FONT_BODY, fontWeight: 800, border: "5px solid #fff", boxShadow: "0 8px 24px rgba(0,0,0,.45)",
      }}
    >
      <span style={{ fontSize: 24, letterSpacing: 2, opacity: 0.95 }}>POKÉDEX</span>
      <span style={{ fontSize: 40, fontFamily: "'Lilita One', sans-serif" }}>{name}</span>
      <span style={{ fontSize: 26, background: "#fff", color: C.red, borderRadius: 14, padding: "2px 12px" }}>
        {index}/{total}
      </span>
    </div>
  );
};
