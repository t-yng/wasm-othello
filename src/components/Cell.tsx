/** @jsx jsx */
import { FC } from 'react';
import { css, jsx } from '@emotion/core';
import { Stone } from './Stone';
import * as othello from '../lib/othello';
import { colors } from '../style/colors';

export interface CellProps {
    idx: number;
    cell: othello.Cell;
    player?: othello.Player;
    available: boolean;
    handleClick: (idx: number) => void;
}

const style = css({
    background: 'green',
    borderLeft: `1px solid ${colors.black2}`,
    borderBottom: `1px solid ${colors.black2}`,
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    position: 'relative',
});

export const Cell: FC<CellProps> = ({ idx, cell, player, available, handleClick }) => {

    const getPutStone = () => {
        return cell === othello.Cell.BLACK ? othello.Stone.BLACK : othello.Stone.WHITE;
    }

    const renderStone = () => {
        if (cell !== othello.Cell.EMPTY) {
            return <Stone stone={getPutStone()} ghost={available} />
        }
        if (cell === othello.Cell.EMPTY && available && player != null) {
            return <Stone stone={player.stone} ghost={available} />
        }

        return undefined;
    }

    return (
        <div css={style} onClick={() => handleClick(idx)}>
            {renderStone()}
        </div>
    );
}