import React from "react";
import { Composition } from "remotion";
import { DayVlog } from "./DayVlog";
import { FPS, TIMELINE } from "./data/day01";

export const Root: React.FC = () => (
  <Composition id="DayVlog" component={DayVlog} durationInFrames={TIMELINE.total} fps={FPS} width={1080} height={1920} />
);
