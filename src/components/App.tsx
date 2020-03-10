import { Game } from "../lib/othello/game"
import { Player } from "../lib/othello/player";
import { Stone } from "../lib/othello/stone";
import { Board } from "./Board";
import { useState, useEffect } from "react";
import MinMax from "../lib/ai/minmax";
import { AI } from "../lib/ai/ai";
import { Board as IBoard } from "../lib/othello/board";

export const App = () => {
    const [ game ] = useState(new Game([new Player(Stone.BLACK), new MinMax(Stone.WHITE)]));
    const [ player, setPlayer ] = useState(game.player)
    const [cells, setCells] = useState(game.board.cells);
    const [availables, setAvailables] = useState(game.availableIndexes);

    game.onUpdateBoard((board: IBoard) => {
        setCells(board.cells);
    });

    game.onSwitchPlayer((player: Player) => {
        setPlayer(player);
        setAvailables(game.availableIndexes);
    });

    useEffect(() => {
        // CPUの思考待ちで描画がブロックされるので非同期で実行
        setTimeout(() => {
            if (player instanceof AI) {
                player.putStone(cells, player.stone);
            }
        }, 0);
    }, [player]);

    const handleClickCell = (idx: number) => {
        const player = game.player;
        player.select(idx);
    }

    return <Board player={player} cells={cells} avalableIndexes={availables} handleClickCell={handleClickCell} />
}