/** @jsx jsx */
import { useState, useEffect } from "react";
import { css, jsx } from "@emotion/core";
import * as othello from '../lib/othello';
import { AI } from "../lib/ai/ai";
import { Board } from "./Board";
import { SidePanel } from "./SidePanel";

const style = css({
    maxWidth: 700,
    height: 401,
    display: 'flex'
});

export const App =　() => {
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

    return(
        <div css={style}>
            <Board player={player} cells={cells} avalableIndexes={availables} handleClickCell={handleClickCell} />
            <SidePanel onClickStart={onClickStart} />
        </div>
    );
}