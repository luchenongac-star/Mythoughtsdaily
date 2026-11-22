import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { C, FONT_DISPLAY } from "../theme";
import { ZH } from "./coverFonts";

const stroke = (px: number): React.CSSProperties => ({
  fontFamily: ZH, lineHeight: 1.05, WebkitTextStroke: `${px}px ${C.blue}`, paintOrder: "stroke fill",
  textShadow: `0 8px 0 ${C.blue}, 0 14px 30px rgba(0,0,0,.5)`,
});

/** 小红书封面 A (3:4): giant Pikachu + big headline. */
export const CoverA: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.dark }}>
    <Img src={staticFile("photos/20-inflatable.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 36%" }} />
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(10,12,30,.35) 0%, rgba(10,12,30,0) 22%, rgba(10,12,30,0) 48%, rgba(10,12,30,.88) 100%)" }} />

    {/* top-left sticker */}
    <div style={{ position: "absolute", left: 44, top: 52, transform: "rotate(-4deg)", display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>
      <div style={{ fontFamily: ZH, fontSize: 56, color: "#fff", background: C.red, border: "6px solid #fff", borderRadius: 18, padding: "6px 26px", boxShadow: "0 8px 0 rgba(0,0,0,.35)" }}>宝可梦30周年路跑</div>
      <div style={{ fontFamily: ZH, fontSize: 38, color: C.dark, background: C.yellow, borderRadius: 14, padding: "2px 20px" }}>KLCC · 吉隆坡</div>
    </div>
    {/* top-right 30 badge */}
    <div style={{ position: "absolute", right: 44, top: 44, width: 170, height: 170, borderRadius: 85, background: C.yellow, border: "8px solid #fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: "rotate(8deg)", boxShadow: "0 8px 0 rgba(0,0,0,.35)" }}>
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: 86, lineHeight: 0.9, color: C.blue }}>30</div>
      <div style={{ fontFamily: ZH, fontSize: 34, color: C.red }}>周年</div>
    </div>

    {/* headline */}
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 80, textAlign: "center", transform: "rotate(-2deg)" }}>
      <div style={{ ...stroke(18), fontSize: 128, color: "#fff" }}>吉隆坡被</div>
      <div style={{ ...stroke(20), fontSize: 138, color: C.yellow, marginTop: 4 }}>皮卡丘淹没了！</div>
    </div>
  </AbsoluteFill>
);
