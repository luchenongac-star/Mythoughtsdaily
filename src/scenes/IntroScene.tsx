import React from "react";
import { AbsoluteFill, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { EPISODE } from "../data/day01";
import { C, FONT_BODY, FONT_DISPLAY, outlined } from "../theme";
import { Pokeball } from "../components/Pokeball";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = spring({ frame: frame - 6, fps, config: { damping: 10, stiffness: 150, mass: 0.9 } });
  const b = spring({ frame: frame - 16, fps, config: { damping: 12, stiffness: 140 } });
  const c = spring({ frame: frame - 28, fps, config: { damping: 14, stiffness: 120 } });
  const flash = interpolate(frame, [0, 6], [0.9, 0], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: C.dark }}>
      <OffthreadVideo src={staticFile("clip/backdrop.mp4")} muted playbackRate={0.8} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(10,12,30,.7) 0%, rgba(10,12,30,.05) 38%, rgba(10,12,30,0) 62%, rgba(10,12,30,.8) 100%)" }} />
      <div style={{ position: "absolute", top: 150, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ ...outlined(190), transform: `scale(${0.4 + 0.6 * a}) rotate(${(1 - a) * -6}deg)`, opacity: a }}>POKÉMON</div>
        <div
          style={{
            fontFamily: FONT_DISPLAY, fontSize: 250, lineHeight: 0.9, color: "#5BC0EB", WebkitTextStroke: "26px #fff", paintOrder: "stroke fill",
            textShadow: `0 16px 0 ${C.blue}`, transform: `scale(${0.4 + 0.6 * b})`, opacity: b, marginTop: -10,
          }}
        >
          RUN
        </div>
        <div style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 52, letterSpacing: 8, color: "#fff", background: C.blue, padding: "6px 34px", borderRadius: 14, opacity: b, marginTop: 6 }}>
          {EPISODE.place}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 360, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: c, transform: `translateY(${(1 - c) * 60}px)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, background: C.red, borderRadius: 60, padding: "10px 40px 10px 20px", border: "6px solid #fff" }}>
          <Pokeball size={64} />
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 72, color: "#fff" }}>DAY {String(EPISODE.day).padStart(2, "0")}</span>
        </div>
        <div style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 44, color: "#fff", textShadow: "0 3px 10px rgba(0,0,0,.8)", textAlign: "center" }}>
          {EPISODE.edition} · {EPISODE.where}
          <br />
          {EPISODE.date}
        </div>
      </div>
      <AbsoluteFill style={{ background: "#fff", opacity: flash }} />
    </AbsoluteFill>
  );
};
