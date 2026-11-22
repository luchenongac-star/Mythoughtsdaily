import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT_BODY, FONT_DISPLAY } from "../theme";
import { EPISODE, ROUTE_LEN } from "../data/day01";
import { Pokeball } from "./Pokeball";

const LABELS = ["START", "1", "2", "3", "4", "FINISH"];

/** Top bar: episode tag + route progress with a Pokéball marker. */
export const Hud: React.FC<{ km?: number; prevKm: number }> = ({ km, prevKm }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const trackW = 900;
  const x0 = 90;
  const s = spring({ frame: frame - 4, fps, config: { damping: 18, stiffness: 120 } });
  const cur = km === undefined ? prevKm : prevKm + (km - prevKm) * s;
  const pct = cur / ROUTE_LEN;
  const enter = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, opacity: enter }}>
      <div
        style={{
          position: "absolute", top: 92, left: 48, display: "flex", alignItems: "center", gap: 12,
          background: "rgba(20,23,43,.72)", borderRadius: 40, padding: "10px 24px 10px 14px",
        }}
      >
        <Pokeball size={34} />
        <span style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 26, color: "#fff", opacity: 0.9 }}>
          {EPISODE.where}
        </span>
      </div>
      {km !== undefined || prevKm > 0 ? (
        <div style={{ position: "absolute", top: 196, left: 0, right: 0, height: 120 }}>
          <div style={{ position: "absolute", left: x0, top: 26, width: trackW, height: 14, borderRadius: 8, background: "rgba(255,255,255,.35)" }} />
          <div style={{ position: "absolute", left: x0, top: 26, width: trackW * pct, height: 14, borderRadius: 8, background: C.yellow, boxShadow: "0 0 14px rgba(255,203,5,.9)" }} />
          {LABELS.map((l, i) => {
            const x = x0 + (trackW * i) / (LABELS.length - 1);
            const done = cur >= i - 0.001;
            return (
              <React.Fragment key={l}>
                <div style={{ position: "absolute", left: x - 11, top: 22, width: 22, height: 22, borderRadius: 11, background: done ? C.yellow : "#fff", border: `4px solid ${C.dark}` }} />
                <div style={{ position: "absolute", left: x - 60, width: 120, top: 56, textAlign: "center", fontFamily: FONT_BODY, fontWeight: 800, fontSize: 24, color: "#fff", textShadow: "0 2px 6px rgba(0,0,0,.8)" }}>
                  {l}
                </div>
              </React.Fragment>
            );
          })}
          <Pokeball size={58} style={{ position: "absolute", left: x0 + trackW * pct - 29, top: 3, filter: "drop-shadow(0 4px 6px rgba(0,0,0,.5))", transform: `rotate(${cur * 360}deg)` }} />
        </div>
      ) : null}
    </div>
  );
};
