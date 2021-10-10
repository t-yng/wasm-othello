import { FC } from "react";
import { css } from "@emotion/css";
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
  borderLeft: `1px solid ${colors.black2}`,
  borderBottom: `1px solid ${colors.black2}`,
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: 37.5,
  maxWidth: 68,
  width: "calc(100vw*0.11)",
  minHeight: 37.5,
  maxHeight: 68,
  height: "calc(100vw*0.11)",
  position: "relative",
});

const LastIndexHighlight = styled.div({
  backgroundColor: colors.red2,
  borderRadius: "50%",
  width: "20%",
  height: "20%",
  position: "absolute",
});

export const Cell: FC<CellProps> = ({
  idx,
  cell,
  player,
  available,
  handleClick,
}) => {
  const getPutStone = () => {
    return cell === othello.Cell.BLACK
      ? othello.Stone.BLACK
      : othello.Stone.WHITE;
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
    <div className={style} onClick={() => handleClick(idx)}>
      {renderStone()}
    </div>
  );
};
