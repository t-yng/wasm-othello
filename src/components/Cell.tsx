/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Stone } from './Stone';
import { Stone as IStone } from '../lib/othello/stone';
import { FC } from 'react';
import { Cell as ICell } from '../lib/othello/cell';
import { Player } from '../lib/othello/player';

export interface CellProps {
    idx: number;
    cell: ICell;
    player: Player;
    available: boolean;
    handleClick: (idx: number) => void;
}

interface StyleProps {
    border: string;
}

const createStyle = (props: StyleProps) => css({
    background: 'green',
    borderLeft: '1px solid black',
    borderBottom: '1px solid black',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
});

export const Cell: FC<CellProps> = ({ idx, cell, player, available, handleClick }) => {

    const style = createStyle({
        border: available ? `2px solid ${player.stone === IStone.BLACK ? 'black' : 'white'}` : undefined,
    })

    const renderStone = () => {
        if (cell === ICell.EMPTY) return undefined;

        const stone = cell === ICell.BLACK ? IStone.BLACK : IStone.WHITE;
        return <Stone stone={stone} />;
    }

    return (
        <div css={style} onClick={() => handleClick(idx)}>{renderStone()}</div>
    );
}