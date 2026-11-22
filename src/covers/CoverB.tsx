import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { C, FONT_DISPLAY } from "../theme";
import { ZH } from "./coverFonts";

/** 小红书封面 B (3:4): medal close-up on yellow. */
export const CoverB: React.FC = () => (
  <AbsoluteFill style={{ background: `repeating-linear-gradient(115deg, ${C.yellow} 0 90px, #FFD83A 90px 180px)` }}>
    {/* headline */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 50, textAlign: "center" }}>
      <div style={{ fontFamily: ZH, fontSize: 118, lineHeight: 1.05, color: "#fff", WebkitTextStroke: `18px ${C.blue}`, paintOrder: "stroke fill", textShadow: `0 8px 0 ${C.blue}` }}>跑完真的</div>
      <div style={{ display: "inline-block", marginTop: 10, background: C.blue, transform: "skewX(-8deg) rotate(-1.5deg)", padding: "2px 40px", borderRadius: 14, boxShadow: "0 10px 0 rgba(0,0,0,.25)" }}>
        <span style={{ fontFamily: ZH, fontSize: 122, lineHeight: 1.1, color: C.yellow, display: "inline-block", transform: "skewX(8deg)" }}>拿到道馆徽章！</span>
      </div>
    </div>
    {/* photo card */}
    <div style={{ position: "absolute", left: 190, top: 450, width: 700, height: 900, border: "16px solid #fff", borderRadius: 30, overflow: "hidden", transform: "rotate(3deg)", boxShadow: "0 30px 70px rgba(0,0,0,.45)", boxSizing: "content-box" }}>
      <Img src={staticFile("photos/24-medal.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 58%" }} />
    </div>
    {/* sticker */}
    <div style={{ position: "absolute", right: 56, top: 400, width: 210, height: 210, borderRadius: 105, background: C.red, border: "9px solid #fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: "rotate(10deg)", boxShadow: "0 8px 0 rgba(0,0,0,.3)" }}>
      <div style={{ fontFamily: ZH, fontSize: 86, lineHeight: 1, color: "#fff" }}>8只</div>
      <div style={{ fontFamily: ZH, fontSize: 46, color: C.yellow }}>集齐！</div>
    </div>
    {/* bottom ribbon */}
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 38, display: "flex", justifyContent: "center" }}>
      <div style={{ fontFamily: ZH, fontSize: 52, color: "#fff", background: C.red, border: "6px solid #fff", borderRadius: 20, padding: "6px 34px", transform: "rotate(-2.5deg)", boxShadow: "0 8px 0 rgba(0,0,0,.3)" }}>宝可梦30周年路跑｜KLCC</div>
    </div>
  </AbsoluteFill>
);
