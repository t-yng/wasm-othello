/** @jsx jsx */
import { useState, useEffect } from "react";
import { css, jsx } from "@emotion/core";
import * as othello from '../lib/othello';
import { AI } from "../lib/ai/ai";
import { Board } from "./Board";
import { TopPanel } from "./TopPanel";
import { TimeLineChart } from "./TimeLineChart";

const mainStyle = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const contentStyle = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 576,
    width: 576,
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 20,
});

export const Main = () => {
    const [game] = useState(new othello.Game());
    const [ player, setPlayer ] = useState(game.player)
    const [cells, setCells] = useState(game.board.cells);
    const [availables, setAvailables] = useState(game.availableIndexes);

    game.onUpdateBoard((board: othello.Board) => {
        setCells(board.cells);
    });

    game.onSwitchPlayer((player: othello.Player) => {
        setPlayer(player);
        setAvailables([]);
        setTimeout(() => setAvailables(game.availableIndexes), 500);
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

        alert(`${result.winner.soneColor}の勝ちです！\n黒: ${result.blackCount} vs 白: ${result.whiteCount}`);
    });

    useEffect(() => {
        // CPUの思考待ちで描画がブロックされるので非同期で実行
        setTimeout(() => {
            if (player instanceof AI) {
                player.putStone(cells, player.stone);
            }
        }, 2000);
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
                <div>
                    <TimeLineChart players={game.players.filter(player => player instanceof AI ) as AI[]} />
                </div>
            </div>
        </main>
    )
}