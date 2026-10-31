import React from "react";
import { css } from "../../style/styles";
import { FC } from "react";
import { AI } from "../../lib/ai/ai";
import dynamic from "next/dynamic";

// chart.js is only needed once a CPU player exists, so keep it out of the initial bundle
const TimeLineChart = dynamic(
  () => import("./TimeLineChart").then((m) => m.TimeLineChart),
  { ssr: false },
);

export interface TimeLineChartContainerProps {
  players: AI[];
}

const style = css({
  width: "100%",
  marginTop: 24,
});

const headingStyle = css({
  fontFamily: "'Russo One', sans-serif",
  color: "#E2E8F0",
  fontSize: "1.25rem",
  letterSpacing: "0.05em",
  marginBottom: 12,
});

export const TimeLineChartContainer: FC<TimeLineChartContainerProps> = ({
  players,
}) => {
  if (players.length === 0) return <React.Fragment></React.Fragment>;

  return (
    <div css={style}>
      <h2 css={headingStyle}>Processing Time</h2>
      <TimeLineChart players={players} />
    </div>
  );
};
