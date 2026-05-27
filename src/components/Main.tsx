import { useState, useEffect, useMemo } from "react";
import { css } from "../style/styles";
import * as othello from "../lib/othello";
import { AI } from "../lib/ai/ai";
import { Board } from "./Board";
import { TopPanel } from "./TopPanel";
import { TimeLineChartContainer } from "./TimeLineCart/TimeLineCartContainer";
import {
  AnimationContext,
  defaultValue as animationDefaultValue,
} from "./hooks/context/AnimationContext";

const mainStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: 40,
  paddingLeft: 10,
  paddingRight: 10,
  paddingBottom: 40,
  "@media (max-width: 576px)": {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

const contentStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: 960,
  width: "100%",
});

export const Main = () => {
  const [game] = useState(new othello.Game());
  const [player, setPlayer] = useState(game.player);
  const [cells, setCells] = useState(game.board.cells);
  const [availables, setAvailables] = useState(game.availableIndexes);

  // Time until CPU starts thinking about the next move asynchronously
  // Deliberately delayed because placing the stone instantly against a human makes it hard to follow
  const cpuWaitTime = useMemo(() => {
    let waitTime = 1000;
    if (game.players.every((player) => player instanceof AI)) {
      waitTime = 0;
    }

    return waitTime;
  }, [game.players]);

  const animation = useMemo((): AnimationContext => {
    // No animation for CPU vs CPU
    return {
      flipTime: game.players.every((player) => player instanceof AI)
        ? 0
        : animationDefaultValue.flipTime,
    };
  }, [game.players]);

  game.onUpdateBoard((board: othello.Board, _idx: number) => {
    setAvailables([]);
    setCells(board.cells);
  });

  game.onSwitchPlayer((player: othello.Player) => {
    // Wait for flip animation
    setTimeout(() => {
      setPlayer(player);
      setAvailables(game.availableIndexes);
    }, animation.flipTime);
  });

  game.onGameEnd((result: othello.GameResult) => {
    setAvailables([]);

    setTimeout(() => {
      if (result.winner == null || result.looser == null) {
        alert("An error occurred");
        return;
      }

      if (result.draw) {
        alert(
          `It's a draw!\nBlack: ${result.blackCount} vs White: ${result.whiteCount}`
        );
        return;
      }

      alert(
        `${result.winner.stoneColor} wins!\nBlack: ${result.blackCount} vs White: ${result.whiteCount}`
      );
    }, animation.flipTime + 200);
  });

  useEffect(() => {
    // Run asynchronously because rendering is blocked while waiting for CPU to think
    setTimeout(() => {
      if (player instanceof AI) {
        player.putStone(cells, player.stone);
      }
    }, cpuWaitTime);
  }, [player]);

  const onClickStart = (
    player1: othello.Player | AI,
    player2: othello.Player | AI
  ) => {
    game.start([player1, player2]);
    setPlayer(game.player);
    setCells(game.board.cells);
    setAvailables(game.availableIndexes);
  };

  const handleClickCell = (idx: number) => {
    if (game.player instanceof AI) return;
    if (game.player) game.player.select(idx);
  };

  return (
    <AnimationContext.Provider value={animation}>
      <main css={mainStyle}>
        <div css={contentStyle}>
          <TopPanel onClickStart={onClickStart} />
          <Board
            player={player}
            cells={cells}
            avalableIndexes={availables}
            handleClickCell={handleClickCell}
          />
          <TimeLineChartContainer
            players={
              game.players.filter((player) => player instanceof AI) as AI[]
            }
          />
        </div>
      </main>
    </AnimationContext.Provider>
  );
};
