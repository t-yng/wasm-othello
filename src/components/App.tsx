import { Game } from "../lib/othello/game"
import { Player } from "../lib/othello/player";
import { Stone } from "../lib/othello/stone";
import { Board } from "./Board";
import { useState } from "react";

export const App = () => {
    const [ game ] = useState(new Game([new Player(Stone.BLACK), new Player(Stone.WHITE)]));
    const [ player, setPlayer ] = useState(game.player)
    const [cells, setCells] = useState(game.board.cells);
    const [availables, setAvailables] = useState(game.availableIndexes);

    game.onSwitchPlayer((player: Player) => setPlayer(player));

    const handleClickCell = (idx: number) => {
        const player = game.player;
        player.select(idx);
        setCells(game.board.cells);
        setAvailables(game.availableIndexes);
    }

    return <Board player={player} cells={cells} avalableIndexes={availables} handleClickCell={handleClickCell} />
}