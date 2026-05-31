import { FC } from "react";
import { css } from "../style/styles";
import styled from "@emotion/styled";
import { Cell } from "./Cell";
import * as othello from "../lib/othello";
import { colors } from "../style";

const BoardWrapper = styled.div({
  borderRadius: 8,
  overflow: "hidden",
  boxShadow: `0 0 0 4px ${colors.boardBorder}, 0 20px 60px rgba(0,0,0,0.7), 0 0 60px rgba(22, 101, 52, 0.4)`,
});

const style = css({
  borderTop: `1px solid ${colors.boardBorder}`,
  borderRight: `1px solid ${colors.boardBorder}`,
  boxSizing: "border-box",
  display: "grid",
  gridTemplateColumns: "repeat(8, auto)",
});

export interface BoardProps {
  player?: othello.Player;
  cells: othello.Cell[];
  avalableIndexes: number[];
  handleClickCell: (idx: number) => void;
}

export const Board: FC<BoardProps> = ({ player, cells, avalableIndexes, handleClickCell }) => {
  const renderCells = () => {
    return cells.map((cell, i) => {
      const avalable = avalableIndexes.includes(i);
      return (
        <Cell
          key={i}
          cell={cell}
          player={player}
          idx={i}
          available={avalable}
          handleClick={handleClickCell}
        />
      );
    });
  };

  return (
    <BoardWrapper>
      <div css={style}>{renderCells()}</div>
    </BoardWrapper>
  );
};
