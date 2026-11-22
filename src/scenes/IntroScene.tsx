import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { EPISODE } from "../data/day01";
import { C, FONT_BODY, FONT_DISPLAY, outlined } from "../theme";

/** Cold open: giant Pikachu + Petronas Towers, title anchored low so the ears stay clear. */
export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();
  const a = spring({ frame: frame - 2, fps, config: { damping: 10, stiffness: 170, mass: 0.8 } });
  const b = spring({ frame: frame - 8, fps, config: { damping: 12, stiffness: 150 } });
  const c = spring({ frame: frame - 13, fps, config: { damping: 14, stiffness: 130 } });
  const flash = interpolate(frame, [0, 5], [0.9, 0], { extrapolateRight: "clamp" });
  const t = frame / durationInFrames;
  return (
    <AbsoluteFill style={{ backgroundColor: C.dark }}>
      <Img src={staticFile("photos/20-inflatable.jpg")} style={{ width, height, objectFit: "cover", transform: `scale(${1.12 - 0.12 * t})`, transformOrigin: "50% 45%" }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(10,12,30,.35) 0%, rgba(10,12,30,0) 25%, rgba(10,12,30,0) 52%, rgba(10,12,30,.85) 80%, rgba(10,12,30,.9) 100%)" }} />
      <div style={{ position: "absolute", top: 1190, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 20, transform: `scale(${0.5 + 0.5 * a})`, opacity: a }}>
          <span style={outlined(118)}>POKÉMON</span>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 134, lineHeight: 1, color: "#5BC0EB", WebkitTextStroke: "14px #fff", paintOrder: "stroke fill", textShadow: `0 10px 0 ${C.blue}` }}>RUN</span>
        </div>
        <div style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 52, letterSpacing: 8, color: "#fff", background: C.blue, padding: "6px 34px", borderRadius: 14, opacity: b, transform: `translateY(${(1 - b) * 30}px)` }}>
          {EPISODE.place}
        </div>
        <div style={{ marginTop: 10, fontFamily: FONT_BODY, fontWeight: 800, fontSize: 38, lineHeight: 1.35, color: "#fff", textShadow: "0 3px 10px rgba(0,0,0,.8)", textAlign: "center", opacity: c, transform: `translateY(${(1 - c) * 30}px)` }}>
          {EPISODE.edition} · {EPISODE.where}
          <br />
          {EPISODE.date}
        </div>
      </div>
      <AbsoluteFill style={{ background: "#fff", opacity: flash }} />
    </AbsoluteFill>
  );
};
