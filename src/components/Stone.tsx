/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Stone as IStone } from '../lib/othello/stone';
import { FC } from 'react';
import { colors } from '../style/colors';

export interface StoneProps {
    stone: IStone;
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
        color: stone === IStone.BLACK ? colors.black1 : colors.white,
        opacity: ghost ? 0.4 : 1,
    });

    return <div css={style} />
}