import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Caption, DexBadge } from "../components/Caption";
import { Hud } from "../components/Hud";
import { OV, Placed } from "../data/day01";

type P = Extract<Placed, { type: "photo" }>;

export const PhotoScene: React.FC<{ scene: P }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const src = staticFile(`photos/${scene.file}`);
  const ratio = scene.w / scene.h;
  const mode = scene.fit ?? (ratio > 0.5 && ratio < 0.62 ? "cover" : "card");
  const t = frame / scene.dur;
  const zoomIn = scene.index % 2 === 0;
  const fade = scene.index === 0 ? 1 : interpolate(frame, [0, OV], [0, 1], { extrapolateRight: "clamp" });
  const [fx, fy] = scene.focus ?? [0.5, 0.5];

  const pop = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const rot = (scene.index % 2 ? -1 : 1) * 1.2;
  const cardW = ratio >= 1 ? 1000 : 880;
  const cardH = cardW / ratio;
  const kb = zoomIn ? 1 + 0.07 * t : 1.07 - 0.07 * t;

  return (
    <AbsoluteFill style={{ opacity: fade, backgroundColor: "#14172B", overflow: "hidden" }}>
      {mode === "cover" ? (
        <AbsoluteFill style={{ overflow: "hidden" }}>
          <Img
            src={src}
            style={{
              width, height, objectFit: "cover",
              transform: `scale(${zoomIn ? 1 + 0.12 * t : 1.12 - 0.12 * t})`,
              transformOrigin: `${fx * 100}% ${fy * 100}%`,
            }}
          />
          <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(10,12,30,.55) 0%, rgba(10,12,30,0) 22%, rgba(10,12,30,0) 62%, rgba(10,12,30,.75) 100%)" }} />
        </AbsoluteFill>
      ) : (
        <>
          <Img
            src={src}
            style={{ position: "absolute", inset: 0, width, height, objectFit: "cover", filter: "blur(38px) brightness(.55) saturate(1.25)", transform: `scale(${1.35 + 0.05 * t})` }}
          />
          <div
            style={{
              position: "absolute", left: (width - cardW) / 2, top: (ratio >= 1 ? 860 : 860) - cardH / 2,
              width: cardW, height: cardH, borderRadius: 30, overflow: "hidden", border: "14px solid #fff", boxSizing: "content-box",
              marginLeft: -14, marginTop: -14,
              transform: `rotate(${rot * pop}deg) scale(${0.9 + 0.1 * pop})`,
              boxShadow: "0 30px 80px rgba(0,0,0,.6)",
            }}
          >
            <Img src={src} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${kb})`, transformOrigin: `${fx * 100}% ${fy * 100}%` }} />
          </div>
          <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(10,12,30,.5) 0%, rgba(10,12,30,0) 20%, rgba(10,12,30,0) 70%, rgba(10,12,30,.6) 100%)" }} />
        </>
      )}
      <Hud km={scene.km} prevKm={scene.prevKm} hideRoute={scene.hideRoute} />
      {scene.dex ? <DexBadge name={scene.dex} index={scene.dexIndex} total={scene.dexTotal} /> : null}
      <Caption text={scene.caption} sub={scene.sub} />
    </AbsoluteFill>
  );
};
