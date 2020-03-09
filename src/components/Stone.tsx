/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Stone as IStone } from '../lib/othello/stone';
import { FC } from 'react';

export interface StoneProps {
    stone: IStone;
}

interface StyleProps {
    color: string;
}

const createStyle = (props: StyleProps) => css({
    backgroundColor: props.color,
    borderRadius: '50%',
    height: '70%',
    width: '70%'
});

export const Stone: FC<StoneProps> = ({ stone }) => {
    const style = createStyle({
        color: stone === IStone.BLACK ? 'black' : 'white',
    });

    return <div css={style} />
}