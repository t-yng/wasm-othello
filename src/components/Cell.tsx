import { FC } from "react";
import { css } from "../style/styles";
import styled from "@emotion/styled";
import { Stone } from "./Stone";
import * as othello from "../lib/othello";
import { colors } from "../style";

export interface CellProps {
  idx: number;
  cell: othello.Cell;
  player?: othello.Player;
  available: boolean;
  handleClick: (idx: number) => void;
}

const style = css({
  background: colors.green,
  borderLeft: `1px solid ${colors.boardBorder}`,
  borderBottom: `1px solid ${colors.boardBorder}`,
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: 37.5,
  maxWidth: 64,
  width: "calc(100vw*0.11)",
  minHeight: 37.5,
  maxHeight: 64,
  height: "calc(100vw*0.11)",
  position: "relative",
  cursor: "pointer",
  transition: "background-color 0.15s ease",
  "&:hover": {
    backgroundColor: "#1A7A3E",
  },
});

const LastIndexHighlight = styled.div({
  backgroundColor: colors.red2,
  borderRadius: "50%",
  width: "20%",
  height: "20%",
  position: "absolute",
  boxShadow: "0 0 8px rgba(244, 63, 94, 0.8)",
});

export const Cell: FC<CellProps> = ({ idx, cell, player, available, handleClick }) => {
  const getPutStone = () => {
    return cell === othello.Cell.BLACK ? othello.Stone.BLACK : othello.Stone.WHITE;
  };

  const renderStone = () => {
    if (cell !== othello.Cell.EMPTY) {
      return <Stone stone={getPutStone()} ghost={available} />;
    }
    if (cell === othello.Cell.EMPTY && available && player != null) {
      return <Stone stone={player.stone} ghost={available} />;
    }

    return undefined;
  };

  return (
    <div css={style} onClick={() => handleClick(idx)}>
      {renderStone()}
    </div>
  );
};
