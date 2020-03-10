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

    const renderStone = () => {
        if (cell === ICell.EMPTY) return undefined;

        const stone = cell === ICell.BLACK ? IStone.BLACK : IStone.WHITE;
        return <Stone stone={stone} />;
    }

    const renderHighlight = () => {
        const style = createHighlightStyle({
            border: available ? `2px solid ${player.stone === IStone.BLACK ? colors.black1 : colors.white}` : undefined,
        })

        return <div css={style}></div>
    }

    return (
        <div css={style} onClick={() => handleClick(idx)}>
            {renderStone()}
            {renderHighlight()}
        </div>
    );
}