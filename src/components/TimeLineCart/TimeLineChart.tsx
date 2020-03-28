/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Line, LinearComponentProps } from 'react-chartjs-2';
import { FC } from 'react';
import { AI } from '../../lib/ai/ai';
import { Stone } from '../../lib/othello';
import { colors } from '../../style/colors';

export interface TimeLineChartProps {
    players: AI[];
}

const ChartContainerStyle = css({
    width: '100%',
    maxHeight: 500,
    minHeight: 300,
    height: 'calc(100vw*0.52)',
    backgroundColor: colors.green,
});

export const TimeLineChart: FC<TimeLineChartProps> = ({ players }) => {
    const getDatasets = () => {
        const borderColors = {
            [Stone.BLACK]: colors.black1,
            [Stone.WHITE]: colors.white,
        }

        return players.map((player, i) => ({
            label: `${player.stoneColor}_${player.name}`,
            borderColor: borderColors[player.stone],
            fill: false,
            pointHitRadius: 10,
            pointRadius: 4,
            data: player.times
        }));
    }

    const data: LinearComponentProps['data'] = {
        labels: players[0].times.map((_, i) => `${i+1}手`),
        datasets: getDatasets(),
    }

    const options: LinearComponentProps['options'] = {
        legend: {
            labels: {
                fontColor: colors.black2,
            }
        },
        maintainAspectRatio: false,
        tooltips: {
            displayColors: false,
            callbacks: {
                label: (tooltipItem: any, data: any) => {
                    const label = data.datasets[tooltipItem.datasetIndex].label;
                    const value = tooltipItem.yLabel;
                    return `${label}: ${value}ms`;
                },
            }
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        callback: (value: any) => {
                            return `${value} ms`
                        },
                        fontColor: colors.black2,
                        maxTicksLimit: 10,
                    },
                }
            ],
            xAxes: [
                {
                    ticks: {
                        fontColor: colors.black2,
                    },
                }
            ]
        }
    }

    return (
        <>
            <div css={ChartContainerStyle}>
                <Line data={data} options={options} width={undefined} height={undefined}></Line>
            </div>
        </>
    );
}