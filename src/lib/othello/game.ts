import { Stone } from "./stone";
import { Player } from './player';
import { Board } from "./board";
import { AI } from '../ai/ai';
import { getAvailablePositions, canPutStone } from './simulator';

type SwitchPlayer = (player: Player) => void;
type UpdateBoard = (board: Board) => void;

export class Game {
    private _board: Board;
    private _player: Player | AI;
    private _players: (Player | AI)[];

    private _onSwithPlayer: SwitchPlayer;
    private _onUpdateBoard: UpdateBoard;

    constructor(players: Player[]) {
        this._board = new Board();
        this._players = players;

        this._players.forEach((player) => {
            player.onSelect((idx: number, stone: Stone) => {
                if (!canPutStone(this._board.cells, idx, stone)) return;
                this._board.putStone(idx, stone);
                if (this._onUpdateBoard) this._onUpdateBoard(this._board);
                this.switchPlayer();
            });
        });

        this._player = this._players[0];
    }

    get player() { return this._player }
    get board() { return this._board }
    get availableIndexes () {
        return getAvailablePositions(this._board.cells, this._player.stone);
    }

    onSwitchPlayer(fn: SwitchPlayer) {
        this._onSwithPlayer = fn;
    }

    onUpdateBoard(fn: UpdateBoard) {
        this._onUpdateBoard = fn;
    }

    switchPlayer() {
        this._player = this._player === this._players[0] ? this._players[1] : this._players[0];
        if (this._onSwithPlayer != null) this._onSwithPlayer(this._player);
    }
}