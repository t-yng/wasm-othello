/** @jsx jsx */
import { FC, useState } from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import * as othello from '../lib/othello';
import { colors } from '../style/colors';
import posed from 'react-pose';

export interface StoneProps {
    stone: othello.Stone;
    ghost: boolean;
}

interface FlipCircleProps {
    opacity: number;
}

interface GhostCircleProps {
    color: string;
}

const GhostCircle = styled.div((props: GhostCircleProps) => ({
    backgroundColor: props.color,
    opacity: 0.3,
    borderRadius: '50%',
    height: '70%',
    width: '70%',
}));

const Container = styled.div({
    width: '70%',
    height: '70%',
});

const AnimationCircle = posed.div({
    black: {
        transform: 'rotateY(0deg)',
        transition: {
            duration: 800,
        }
    },
    white: {
        transform: 'rotateY(180deg)',
        transition: {
            duration: 800,
        }
    }
});

const Circle = styled(AnimationCircle)({
    position: 'relative',
    height: '101%',
    width: '101%',
    transformStyle: 'preserve-3d',
});

const Front = styled.div({
    backgroundColor: colors.black1,
    position: 'absolute',
    borderRadius: '50%',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
});

const Back = styled.div({
    backgroundColor: colors.white,
    position: 'absolute',
    borderRadius: '50%',
    width: '100%',
    height: '100%',
    transform: 'rotateY(180deg)',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
});

export const Stone: FC<StoneProps> = ({ stone, ghost }) => {
    if (ghost) {
        return <GhostCircle color={stone === othello.Stone.BLACK ? colors.black1 : colors.white} />
    }

    return (
        <Container>
            <Circle pose={stone === othello.Stone.BLACK ? 'black' : 'white'}>
                <Front />
                <Back />
            </Circle>
        </Container>
    );
}