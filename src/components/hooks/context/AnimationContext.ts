import React, { useContext } from 'react';

export type AnimationContext = {
    flipTime: number;
}

export const defaultValue: AnimationContext = {
    flipTime: 800,
}

export const AnimationContext = React.createContext<AnimationContext>(defaultValue);

export const useAnimationContext = () => {
    return useContext(AnimationContext);
}