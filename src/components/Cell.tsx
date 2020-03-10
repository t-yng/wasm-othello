/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Stone } from './Stone';
import { Stone as IStone } from '../lib/othello/stone';
import { FC } from 'react';
import { Cell as ICell } from '../lib/othello/cell';
import { Player } from '../lib/othello/player';
import { colors } from '../style/colors';

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

const createHighlightStyle = (props: StyleProps) => css({
    width: 47,
    height: 47,
    border: props.border,
    position: 'absolute',
    top: -1,
    left: -1,
    zIndex: 10,
})

export const Cell: FC<CellProps> = ({ idx, cell, player, available, handleClick }) => {

    const getPutStone = () => {
        return cell === ICell.BLACK ? IStone.BLACK : IStone.WHITE;
    }

    const getGhostStone = () => {
        return player.stone;
    }

    const renderStone = () => {
        if (cell === ICell.EMPTY && !available) return undefined;

        let stone = cell !== ICell.EMPTY ? getPutStone() : getGhostStone();
        return <Stone stone={stone} ghost={available} />;
    }

    return (
        <div css={style} onClick={() => handleClick(idx)}>
            {renderStone()}
        </div>
    );
}