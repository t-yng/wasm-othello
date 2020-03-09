/** @jsx jsx */
import { FC } from 'react';
import { css, jsx } from '@emotion/core';
import { Cell } from './Cell';
import { Player } from '../lib/othello/player';
import { Board as IBoard } from '../lib/othello/board';
import { Cell as ICell } from '../lib/othello/cell';

const style = css({
    borderTop: '1px solid black',
    borderRight: '1px solid black',
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 50px)',
    width: 400,
});

export interface BoardProps {
    player: Player;
    cells: ICell[];
    avalableIndexes: number[];
    handleClickCell: (idx: number) => void;
}

export const Board: FC<BoardProps> = ({ player, cells, avalableIndexes, handleClickCell }) => {
    const renderCells = () => {
        return cells.map((cell, i) => {
            const avalable = avalableIndexes.includes(i);
            return  (
                <Cell key={i} cell={cell} player={player} idx={i} available={avalable} handleClick={handleClickCell} />
            )
        })
    }

    return (
        <div css={style}>
            { renderCells() }
        </div>
    );
}