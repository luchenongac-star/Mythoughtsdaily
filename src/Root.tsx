import React from "react";
import { Composition } from "remotion";
import { DayVlog } from "./DayVlog";
import { FPS, TIMELINE } from "./data/day01";
import { CoverA } from "./covers/CoverA";
import { CoverB } from "./covers/CoverB";

export const Root: React.FC = () => (
  <>
    <Composition id="DayVlog" component={DayVlog} durationInFrames={TIMELINE.total} fps={FPS} width={1080} height={1920} />
    <Composition id="XhsCoverA" component={CoverA} durationInFrames={1} fps={FPS} width={1080} height={1440} />
    <Composition id="XhsCoverB" component={CoverB} durationInFrames={1} fps={FPS} width={1080} height={1440} />
  </>
);
