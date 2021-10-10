import React from "react";
import { css } from "@emotion/css";
import { FC } from "react";
import { AI } from "../../lib/ai/ai";
import { TimeLineChart } from "./TimeLineChart";

export interface TimeLineChartContainerProps {
  players: AI[];
}

const style = css({
  width: "100%",
});

export const TimeLineChartContainer: FC<TimeLineChartContainerProps> = ({
  players,
}) => {
  if (players.length === 0) return <React.Fragment></React.Fragment>;

  return (
    <div className={style}>
      <h2>処理時間</h2>
      <TimeLineChart players={players} />
    </div>
  );
};
