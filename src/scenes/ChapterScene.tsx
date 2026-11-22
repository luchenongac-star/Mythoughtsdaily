import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Pokeball } from "../components/Pokeball";
import { OV, Placed } from "../data/day01";
import { C, FONT_BODY, FONT_DISPLAY } from "../theme";

type Ch = Extract<Placed, { type: "chapter" }>;

export const ChapterScene: React.FC<{ scene: Ch }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const wipe = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const s = spring({ frame: frame - 3, fps, config: { damping: 11, stiffness: 160, mass: 0.8 } });
  const s2 = spring({ frame: frame - 9, fps, config: { damping: 14, stiffness: 140 } });
  return (
    <AbsoluteFill
      style={{
        background: `repeating-linear-gradient(115deg, ${C.yellow} 0 90px, #FFD83A 90px 180px)`,
        clipPath: `circle(${wipe * 1.5 * Math.max(width, height)}px at 50% 50%)`,
      }}
    >
      <Pokeball size={1500} style={{ position: "absolute", right: -480, bottom: -380, opacity: 0.16, transform: `rotate(${frame * 3}deg)` }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 10 }}>
        <div style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 52, letterSpacing: 10, color: C.blue, opacity: s, transform: `translateY(${(1 - s) * 40}px)` }}>
          CHAPTER {scene.n}
        </div>
        <div
          style={{
            fontFamily: FONT_DISPLAY, fontSize: scene.title.length > 9 ? 150 : 200, lineHeight: 1, color: "#fff", textAlign: "center",
            WebkitTextStroke: `16px ${C.blue}`, paintOrder: "stroke fill", textShadow: `0 14px 0 ${C.blue}`,
            transform: `scale(${0.6 + 0.4 * s}) rotate(${-3 * (1 - s)}deg)`, opacity: s,
          }}
        >
          {scene.title}
        </div>
        <div style={{ marginTop: 40, fontFamily: FONT_BODY, fontWeight: 800, fontSize: 48, color: C.dark, background: "#fff", padding: "10px 36px", borderRadius: 50, opacity: s2, transform: `translateY(${(1 - s2) * 30}px)` }}>
          {scene.sub}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
