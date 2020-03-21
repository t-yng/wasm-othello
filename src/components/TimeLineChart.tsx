/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Line, LinearComponentProps } from 'react-chartjs-2';
import { FC } from 'react';
import { AI } from '../lib/ai/ai';

export interface TimeLineChartProps {
    players: AI[];
}

const ChartContainerStyle = css({
    width: '80vw',
    height: '500px',
    backgroundColor: 'green'
});

export const TimeLineChart: FC<TimeLineChartProps> = ({players}) => {
    if (players.length === 0) return <></>;

    const getDatasets = () => {
        const colors = ['black', 'white'];

        return players.map((player, i) => ({
            label: `${player.name}`,
            borderColor: colors[i],
            fill: false,
            data: player.times
        }));
    }

    console.log(getDatasets());

    const data: LinearComponentProps['data'] = {
        labels: players[0].times.map((_, i) => `${i+1}手目`),
        datasets: getDatasets(),
    }

    const options: LinearComponentProps['options'] = {
        legend: {
            labels: {
                fontColor: '#333',
            }
        },
        maintainAspectRatio: false,
        tooltips: {
            displayColors: false,
            callbacks: {
                label: (tooltipItem: any, data: any) => {
                    console.log(data.datasets[tooltipItem.datasetIndex]);
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
                        fontColor: '#333',
                    },
                }
            ],
            xAxes: [
                {
                    ticks: {
                        fontColor: '#333',
                    },
                }
            ]
        }
    }

    return (
        <>
            <h2>処理時間</h2>
            <div css={ChartContainerStyle}>
                <Line data={data} options={options} width={undefined} height={undefined}></Line>
            </div>
        </>
    );
}