/** @jsx jsx */
import { useState, useEffect, useMemo } from "react";
import { css, jsx } from "@emotion/core";
import * as othello from '../lib/othello';
import { AI } from "../lib/ai/ai";
import { Board } from "./Board";
import { TopPanel } from "./TopPanel";
import { TimeLineChartContainer } from "./TimeLineCart/TimeLineCartContainer";

const mainStyle = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 40,
    '@media (max-width: 576px)': {
        paddingTop: 20,
        paddingBottom: 20,
    }
});

const contentStyle = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 960,
    width: '100%',
});

export const Main = () => {
    const [game] = useState(new othello.Game());
    const [ player, setPlayer ] = useState(game.player)
    const [cells, setCells] = useState(game.board.cells);
    const [availables, setAvailables] = useState(game.availableIndexes);

    // CPUが非同期で次の手を考え始めるまでの時間
    // 対人間の時に一瞬で石を置くと分かりにくいので、あえて遅延させている
    const waitTime = useMemo(() => {
        let waitTime = 1000;
        if(game.players.every(player => player instanceof AI)) {
            waitTime = 0;
        }

        return waitTime;
    }, [game.players]);

    game.onUpdateBoard((board: othello.Board) => {
        setCells(board.cells);
    });

    game.onSwitchPlayer((player: othello.Player) => {
        setPlayer(player);
        setAvailables(game.availableIndexes);
    });

    game.onGameEnd((result: othello.GameResult) => {
        setAvailables([]);
        if (result.draw) {
            alert('引き分け');
            return;
        }

        if (result.winner == null || result.looser == null) {
            alert('エラーが発生しました');
            return;
        }

        alert(`${result.winner.stoneColor}の勝ちです！\n黒: ${result.blackCount} vs 白: ${result.whiteCount}`);
    });

    useEffect(() => {
        // CPUの思考待ちで描画がブロックされるので非同期で実行
        setTimeout(() => {
            if (player instanceof AI) {
                player.putStone(cells, player.stone);
            }
        }, waitTime);
    }, [player]);

    const onClickStart = (player1: othello.Player|AI, player2: othello.Player|AI) => {
        game.start([player1, player2]);
        setPlayer(game.player);
        setCells(game.board.cells);
        setAvailables(game.availableIndexes);
    }

    const handleClickCell = (idx: number) => {
        if (game.player) game.player.select(idx);
    }

    return (
        <main css={mainStyle}>
            <div css={contentStyle}>
                <TopPanel onClickStart={onClickStart} />
                <Board player={player} cells={cells} avalableIndexes={availables} handleClickCell={handleClickCell} />
                <TimeLineChartContainer players={game.players.filter(player => player instanceof AI ) as AI[]} />
            </div>
        </main>
    )
}