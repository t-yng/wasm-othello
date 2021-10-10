import { css, cx } from "@emotion/css";
import { Line } from "react-chartjs-2";
import { Props as ChartProps } from "react-chartjs-2/dist/types";
// import { Props as LinearComponentProps } from "react-chartjs-2/dist";
import { FC } from "react";
import { AI } from "../../lib/ai/ai";
import { Stone } from "../../lib/othello";
import { colors } from "../../style/colors";

export interface TimeLineChartProps {
  players: AI[];
}

const ChartContainerStyle = css({
  width: "100%",
  maxHeight: 500,
  minHeight: 300,
  height: "calc(100vw*0.52)",
  backgroundColor: colors.green,
});

export const TimeLineChart: FC<TimeLineChartProps> = ({ players }) => {
  const getDatasets = () => {
    const borderColors = {
      [Stone.BLACK]: colors.black1,
      [Stone.WHITE]: colors.white,
    };

    return players.map((player, i) => ({
      label: `${player.stoneColor}_${player.name}`,
      borderColor: borderColors[player.stone],
      fill: false,
      pointHitRadius: 10,
      pointRadius: 4,
      data: player.times,
    }));
  };

  const data: ChartProps["data"] = {
    labels: players[0].times.map((_, i) => `${i + 1}手`),
    datasets: getDatasets(),
  };

  const options: ChartProps["options"] = {
    plugins: {
      legend: {
        labels: {
          color: colors.black2,
        },
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: (context) => {
            const label = context.dataset.label;
            const value = context.parsed.y;
            return `${label}: ${value}ms`;
          },
        },
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          callback: (value: any) => {
            return `${value} ms`;
          },
          color: colors.black2,
          maxTicksLimit: 10,
        },
      },
      x: {
        ticks: {
          color: colors.black2,
        },
      },
    },
  };

  return (
    <>
      <div className={ChartContainerStyle}>
        <Line
          data={data}
          options={options}
          width={undefined}
          height={undefined}
        ></Line>
      </div>
    </>
  );
};
