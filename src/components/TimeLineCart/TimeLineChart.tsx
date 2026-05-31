import { css } from "../../style/styles";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { FC } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
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
  backgroundColor: "rgba(26, 26, 53, 0.9)",
  borderRadius: 8,
  padding: "16px 8px 8px",
  border: "1px solid rgba(124, 58, 237, 0.2)",
});

export const TimeLineChart: FC<TimeLineChartProps> = ({ players }) => {
  const getDatasets = () => {
    const borderColors = {
      [Stone.BLACK]: "#A78BFA",
      [Stone.WHITE]: "#E2E8F0",
    };

    return players.map((player, i) => ({
      label: `${player.stoneColor}_${player.name}`,
      borderColor: borderColors[player.stone],
      backgroundColor: borderColors[player.stone],
      fill: false,
      pointHitRadius: 10,
      pointRadius: 4,
      data: player.times,
    }));
  };

  const data: ChartData<"line"> = {
    labels: players[0].times.map((_, i) => `Move ${i + 1}`),
    datasets: getDatasets(),
  };

  const options: ChartOptions<"line"> = {
    plugins: {
      legend: {
        labels: {
          color: "rgba(226, 232, 240, 0.7)",
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
          color: "rgba(226, 232, 240, 0.7)",
          maxTicksLimit: 10,
        },
      },
      x: {
        ticks: {
          color: "rgba(226, 232, 240, 0.7)",
        },
      },
    },
  };

  return (
    <>
      <div css={ChartContainerStyle}>
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
