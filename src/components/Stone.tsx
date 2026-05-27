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
  opacity: 0.3,
  borderRadius: "50%",
  height: "70%",
  width: "70%",
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
  backgroundColor: colors.black1,
  position: "absolute",
  borderRadius: "50%",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
});

const Back = styled.div({
  backgroundColor: colors.white,
  position: "absolute",
  borderRadius: "50%",
  width: "100%",
  height: "100%",
  transform: "rotateY(180deg)",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
});

export const Stone: FC<StoneProps> = ({ stone, ghost }) => {
  const animation = useAnimationContext();

  if (ghost) {
    return (
      <GhostCircle
        color={stone === othello.Stone.BLACK ? colors.black1 : colors.white}
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
