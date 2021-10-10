/** @jsxRuntime classic */
/** @jsx jsx */
import { FC } from "react";
import { css, jsx } from "@emotion/react";
import { Cell } from "./Cell";
import * as othello from "../lib/othello";
import { colors } from "../style";

const style = css({
  borderTop: `1px solid ${colors.black2}`,
  borderRight: `1px solid ${colors.black2}`,
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

export const Board: FC<BoardProps> = ({
  player,
  cells,
  avalableIndexes,
  handleClickCell,
}) => {
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

  return <div css={style}>{renderCells()}</div>;
};
