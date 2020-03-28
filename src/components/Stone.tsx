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
    opacity: 0.4,
    borderRadius: '50%',
    height: '70%',
    width: '70%',
}));

const Container = styled.div({
    width: '70%',
    height: '70%',
    perspective: 1000,
});

const AnimationCircle = posed.div({
    black: {
        transform: 'rotateY(0deg)',
        transition: {
            duration: 1000,
        }
    },
    white: {
        transform: 'rotateY(180deg)',
        transition: {
            duration: 1000,
        }
    }
});

const Circle = styled(AnimationCircle)({
    position: 'relative',
    height: '100%',
    width: '100%',
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