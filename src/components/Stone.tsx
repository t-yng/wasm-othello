import { FC } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import * as othello from "../lib/othello";
import { colors } from "../style/colors";
import {
  useAnimationContext,
} from "./hooks/context/AnimationContext";

export interface StoneProps {
  stone: othello.Stone;
  ghost: boolean;
}

interface GhostCircleProps {
  color: string;
}

const GhostCircle = styled.div((props: GhostCircleProps) => ({
  backgroundColor: props.color,
  opacity: 0.25,
  borderRadius: "50%",
  height: "70%",
  width: "70%",
  border: `2px solid ${props.color}`,
}));

const Container = styled.div({
  width: "70%",
  height: "70%",
});

const stoneVariants = {
  black: { rotateY: 0 },
  white: { rotateY: 180 },
};

const Circle = styled(motion.div)({
  position: "relative",
  height: "101%",
  width: "101%",
  transformStyle: "preserve-3d",
});

const Front = styled.div({
  background: "radial-gradient(circle at 35% 35%, #3D3D5C, #0F0F1E)",
  position: "absolute",
  borderRadius: "50%",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.1)",
});

const Back = styled.div({
  background: "radial-gradient(circle at 35% 35%, #FFFFFF, #C8D3DC)",
  position: "absolute",
  borderRadius: "50%",
  width: "100%",
  height: "100%",
  transform: "rotateY(180deg)",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.8)",
});

export const Stone: FC<StoneProps> = ({ stone, ghost }) => {
  const animation = useAnimationContext();

  if (ghost) {
    return (
      <GhostCircle
        color={stone === othello.Stone.BLACK ? "rgba(15,15,30,0.8)" : "rgba(248,250,252,0.8)"}
      />
    );
  }

  return (
    <Container>
      <Circle
        variants={stoneVariants}
        animate={stone === othello.Stone.BLACK ? "black" : "white"}
        transition={{ duration: animation.flipTime / 1000 }}
      >
        <Front />
        <Back />
      </Circle>
    </Container>
  );
};
