import { css } from "../style/styles";
import { useState, FC } from "react";
import { AI } from "../lib/ai/ai";
import { Player, Stone } from "../lib/othello";
import { MinMax } from "../lib/ai/minmax";
import { WasmMinMax } from "../lib/ai/wasmMinmax";
import { SelectMenuItem } from "evergreen-ui";
import { Select } from "./Common/Select";
import styled from "@emotion/styled";
import { colors } from "../style/colors";

export interface SidePanelProps {
  onClickStart: (player1: Player | AI, player2: Player | AI) => void;
}

type PlayerType = "human" | "js" | "wasm";

const style = css({
  background: "rgba(26, 26, 53, 0.9)",
  border: "1px solid rgba(124, 58, 237, 0.25)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(124, 58, 237, 0.1)",
  boxSizing: "border-box",
  borderRadius: 12,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: 24,
  backdropFilter: "blur(12px)",
});

const SelectWrapper = styled.div({
  marginTop: 10,
});

const StoneComponent = styled.div({
  borderRadius: "50%",
  width: 28,
  height: 28,
});

const BlackStone = styled(StoneComponent)({
  background: "radial-gradient(circle at 35% 35%, #3D3D5C, #0F0F1E)",
  boxShadow: "0 3px 10px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.1)",
});

const WhiteStone = styled(StoneComponent)({
  background: "radial-gradient(circle at 35% 35%, #FFFFFF, #C8D3DC)",
  boxShadow: "0 3px 10px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.8)",
});

const ColumnCenterContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const LeftTopContainer = styled(ColumnCenterContainer)({
  paddingRight: 20,
  "@media (max-width: 576px)": {
    paddingRight: 10,
  },
});

const VsText = styled.span({
  position: "relative",
  top: 39,
  fontFamily: "'Russo One', sans-serif",
  fontSize: 16,
  color: colors.primaryLight,
  textShadow: "0 0 12px rgba(167, 139, 250, 0.6)",
  letterSpacing: "0.1em",
  "@media (max-width: 576px)": {
    fontSize: 13,
    top: 42,
  },
});

const MiddleTopContainer = ColumnCenterContainer;

const RightTopContainer = styled(ColumnCenterContainer)({
  paddingLeft: 20,
  "@media (max-width: 576px)": {
    paddingLeft: 10,
  },
});

const TopContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  paddingTop: 16,
  paddingLeft: 60,
  paddingRight: 60,
  "@media (max-width: 576px)": {
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const BottomContainer = styled.div({
  paddingBottom: 16,
});

const Divider = styled.div({
  height: 1,
  width: "100%",
  background: "linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.4), transparent)",
  marginTop: 16,
  marginBottom: 16,
});

const WarningText = styled.div({
  width: 115,
  marginTop: 10,
  color: colors.red1,
  fontSize: 11,
  fontFamily: "'Chakra Petch', sans-serif",
  textShadow: "0 0 8px rgba(244, 63, 94, 0.5)",
});

const StartButton = styled.button({
  fontFamily: "'Russo One', sans-serif",
  fontSize: 14,
  letterSpacing: "0.1em",
  color: "#E2E8F0",
  background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
  border: "none",
  borderRadius: 6,
  padding: "10px 28px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  boxShadow: "0 4px 16px rgba(124, 58, 237, 0.4)",
  "&:hover": {
    background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
    boxShadow: "0 6px 24px rgba(124, 58, 237, 0.6)",
    transform: "translateY(-1px)",
  },
  "&:active": {
    transform: "translateY(0)",
    boxShadow: "0 2px 8px rgba(124, 58, 237, 0.4)",
  },
});

export const TopPanel: FC<SidePanelProps> = ({ onClickStart }) => {
  const options: SelectMenuItem[] = [
    {
      label: "Human",
      value: "human",
    },
    {
      label: "CPU: wasm",
      value: "wasm",
    },
    {
      label: "CPU: js",
      value: "js",
    },
  ];

  const levelOptions: SelectMenuItem[] = [...Array(6)].map((_, i) => ({
    label: `Level: ${i + 1}`,
    value: (i + 1).toString(),
  }));

  const [playerType, setPlayerType] = useState<{
    black: PlayerType;
    white: PlayerType;
  }>({
    black: "human",
    white: "wasm",
  });

  const [level, setLevel] = useState<{
    black: number;
    white: number;
  }>({
    black: 3,
    white: 6,
  });

  const getPlayer = (stone: Stone, type: PlayerType, level: number) => {
    switch (type) {
      case "human":
        return new Player(stone);
      case "js":
        return new MinMax(stone, level);
      case "wasm":
        return new WasmMinMax(stone, level);
    }
  };

  const handleClickStart = () => {
    const player1 = getPlayer(Stone.BLACK, playerType.black, level.black);
    const player2 = getPlayer(Stone.WHITE, playerType.white, level.white);
    onClickStart(player1, player2);
  };

  const shouldShowWarning = (stone: Stone) => {
    switch (stone) {
      case Stone.BLACK:
        return playerType.black === "js" && level.black === 6;
      case Stone.WHITE:
        return playerType.white === "js" && level.white === 6;
    }
  };

  return (
    <div css={style}>
      <TopContainer>
        <LeftTopContainer>
          <BlackStone />
          <SelectWrapper>
            <Select
              height={100}
              width={115}
              options={options}
              selected={playerType.black}
              onSelect={(item) =>
                setPlayerType({
                  ...playerType,
                  black: item.value as PlayerType,
                })
              }
            />
          </SelectWrapper>

          {playerType.black !== "human" && (
            <SelectWrapper>
              <Select
                text="Select Level"
                width={115}
                height={198}
                options={levelOptions}
                selected={level.black.toString()}
                onSelect={(item) =>
                  setLevel({ ...level, black: Number(item.value) })
                }
              />
            </SelectWrapper>
          )}

          {shouldShowWarning(Stone.BLACK) && (
            <WarningText>* Tab may freeze</WarningText>
          )}
        </LeftTopContainer>
        <MiddleTopContainer>
          <VsText>VS</VsText>
        </MiddleTopContainer>
        <RightTopContainer>
          <WhiteStone />
          <SelectWrapper>
            <Select
              height={100}
              width={115}
              options={options}
              selected={playerType.white}
              onSelect={(item) =>
                setPlayerType({
                  ...playerType,
                  white: item.value as PlayerType,
                })
              }
            />
          </SelectWrapper>

          {playerType.white !== "human" && (
            <SelectWrapper>
              <Select
                text="Select Level"
                width={115}
                height={198}
                options={levelOptions}
                selected={level.white.toString()}
                onSelect={(item) =>
                  setLevel({ ...level, white: Number(item.value) })
                }
              />
            </SelectWrapper>
          )}

          {shouldShowWarning(Stone.WHITE) && (
            <WarningText>* Tab may freeze</WarningText>
          )}
        </RightTopContainer>
      </TopContainer>
      <Divider />
      <BottomContainer>
        <StartButton onClick={handleClickStart}>START GAME</StartButton>
      </BottomContainer>
    </div>
  );
};
