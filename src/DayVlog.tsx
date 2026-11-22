import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import "./fonts";
import { EPISODE, TIMELINE } from "./data/day01";
import { ChapterScene } from "./scenes/ChapterScene";
import { IntroScene } from "./scenes/IntroScene";
import { PhotoScene } from "./scenes/PhotoScene";

export const DayVlog: React.FC = () => {
  const { durationInFrames, fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const endFade = interpolate(frame, [durationInFrames - 12, durationInFrames - 1], [0, 1], { extrapolateLeft: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: "#14172B" }}>
      <Audio
        src={staticFile(EPISODE.music)}
        volume={(f) => interpolate(f, [0, fps * 0.6, durationInFrames - fps * 2.5, durationInFrames], [0, 0.85, 0.85, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
      {TIMELINE.placed.map((s) => (
        <Sequence key={s.index} from={s.start} durationInFrames={s.dur} premountFor={fps}>
          {s.type === "intro" ? <IntroScene /> : s.type === "chapter" ? <ChapterScene scene={s} /> : <PhotoScene scene={s} />}
        </Sequence>
      ))}
      <AbsoluteFill style={{ backgroundColor: "#000", opacity: endFade }} />
    </AbsoluteFill>
  );
};
