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
  ChartDataset,
} from "chart.js";
import { FC } from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
import { AI } from "../../lib/ai/ai";
import { Stone } from "../../lib/othello";

export interface TimeLineChartProps {
  players: AI[];
}

// Medium slate background so both black (#0F172A) and white (#FFFFFF) lines are visible
const CHART_BG = "#78909C";

const ChartContainerStyle = css({
  width: "100%",
  maxHeight: 500,
  minHeight: 300,
  height: "calc(100vw*0.52)",
  backgroundColor: CHART_BG,
  borderRadius: 8,
  padding: "16px 8px 8px",
  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.3)",
});

export const TimeLineChart: FC<TimeLineChartProps> = ({ players }) => {
  const getDatasets = (): ChartDataset<"line">[] => {
    return players.map((player) => {
      const isBlack = player.stone === Stone.BLACK;
      return {
        label: `${player.stoneColor}_${player.name}`,
        borderColor: isBlack ? "#0F172A" : "#FFFFFF",
        backgroundColor: isBlack ? "#0F172A" : "#FFFFFF",
        pointBorderColor: isBlack ? "#475569" : "#CBD5E1",
        pointBorderWidth: 1.5,
        borderWidth: 2.5,
        fill: false,
        pointHitRadius: 10,
        pointRadius: 4,
        data: player.times,
      };
    });
  };

  const data: ChartData<"line"> = {
    labels: players[0].times.map((_, i) => `Move ${i + 1}`),
    datasets: getDatasets(),
  };

  const options: ChartOptions<"line"> = {
    plugins: {
      legend: {
        labels: {
          color: "#F1F5F9",
          boxWidth: 20,
          padding: 16,
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
          color: "#F1F5F9",
          maxTicksLimit: 10,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.15)",
        },
      },
      x: {
        ticks: {
          color: "#F1F5F9",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.15)",
        },
      },
    },
  };

  return (
    <>
      <div css={ChartContainerStyle}>
        <Line data={data} options={options} width={undefined} height={undefined}></Line>
      </div>
    </>
  );
};
