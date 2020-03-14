/** @jsx jsx */
import { FC } from 'react';
import { css, jsx } from '@emotion/core';
import * as othello from '../lib/othello';
import { colors } from '../style/colors';

export interface StoneProps {
    stone: othello.Stone;
    ghost: boolean;
}

interface StyleProps {
    color: string;
    opacity: number;
}

const createStyle = (props: StyleProps) => css({
    backgroundColor: props.color,
    opacity: props.opacity,
    borderRadius: '50%',
    height: '70%',
    width: '70%',
});

export const Stone: FC<StoneProps> = ({ stone, ghost }) => {
    const style = createStyle({
        color: stone === othello.Stone.BLACK ? colors.black1 : colors.white,
        opacity: ghost ? 0.4 : 1,
    });

    return <div css={style} />
}