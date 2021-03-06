/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Line, LinearComponentProps } from 'react-chartjs-2';
import { FC } from 'react';
import { AI } from '../../lib/ai/ai';
import { Stone } from '../../lib/othello';
import { colors } from '../../style/colors';
import { TimeLineChart } from './TimeLineChart';

export interface TimeLineChartContainerProps {
    players: AI[];
}

const style = css({
    width: '100%',
})

export const TimeLineChartContainer:FC<TimeLineChartContainerProps> = ({ players }) => {
    if (players.length === 0) return <></>;

    return(
        <div css={style}>
            <h2>処理時間</h2>
            <TimeLineChart players={players} />
        </div>
    )
}