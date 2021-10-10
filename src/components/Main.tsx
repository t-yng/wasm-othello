import { useState, useEffect, useMemo } from "react";
import { css } from "@emotion/css";
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

  // CPUが非同期で次の手を考え始めるまでの時間
  // 対人間の時に一瞬で石を置くと分かりにくいので、あえて遅延させている
  const cpuWaitTime = useMemo(() => {
    let waitTime = 1000;
    if (game.players.every((player) => player instanceof AI)) {
      waitTime = 0;
    }

    return waitTime;
  }, [game.players]);

  const animation = useMemo((): AnimationContext => {
    // CPU vs CPU の場合はアニメーションしない
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
    // フリップのアニメーションを待機
    setTimeout(() => {
      setPlayer(player);
      setAvailables(game.availableIndexes);
    }, animation.flipTime);
  });

  game.onGameEnd((result: othello.GameResult) => {
    setAvailables([]);

    setTimeout(() => {
      if (result.winner == null || result.looser == null) {
        alert("エラーが発生しました");
        return;
      }

      if (result.draw) {
        alert(
          `引き分けです！\n黒: ${result.blackCount} vs 白: ${result.whiteCount}`
        );
        return;
      }

      alert(
        `${result.winner.stoneColor}の勝ちです！\n黒: ${result.blackCount} vs 白: ${result.whiteCount}`
      );
    }, animation.flipTime + 200);
  });

  useEffect(() => {
    // CPUの思考待ちで描画がブロックされるので非同期で実行
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
      <main className={mainStyle}>
        <div className={contentStyle}>
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
