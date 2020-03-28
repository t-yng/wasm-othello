import { Stone } from "./stone";
import { Player } from './player';
import { Board } from "./board";
import { AI } from '../ai/ai';
import { getAvailablePositions, canPutStone, isGameEnd } from './simulator';
import { Cell } from "./cell";

export type GameResult = {
    draw: boolean,
    winner?: Player,
    looser?: Player,
    blackCount: number,
    whiteCount: number,
}
type SwitchPlayer = (player: Player) => void;
type UpdateBoard = (board: Board, idx: number) => void;
type GameEnd = (result: GameResult) => void;

export class Game {
    private _board: Board;
    private _player?: Player | AI;
    private _players: (Player | AI)[];

    private _onSwithPlayer?: SwitchPlayer;
    private _onUpdateBoard?: UpdateBoard;
    private _onGameEnd?: GameEnd;

    constructor() {
        this._board = new Board();
        this._players = [];
    }

    get player(): Player | AI | undefined {
        return this._player;
    }

    get players() {
        return this._players;
    }

    get board() {
        return this._board
    }

    get availableIndexes () {
        if (this._player == null) return [];
        return getAvailablePositions(this._board.cells, this._player.stone);
    }

    start(players: Player[]) {
        this._board = new Board();
        this._players = players;

        this._players.forEach((player) => {
            player.onSelect((idx: number, stone: Stone) => {
                if (!canPutStone(this._board.cells, idx, stone)) return;

                this._board.putStone(idx, stone);
                if (this._onUpdateBoard) this._onUpdateBoard(this._board, idx);

                if (isGameEnd(this._board.cells)) {
                    setTimeout(() => {
                        if (this._onGameEnd) this._onGameEnd(this.judgeResult());
                    }, 0);
                    return;
                }

                this.switchPlayer();
            });
        });

        this._player = this._players[0];
    }

    onSwitchPlayer(fn: SwitchPlayer) {
        this._onSwithPlayer = fn;
    }

    onUpdateBoard(fn: UpdateBoard) {
        this._onUpdateBoard = fn;
    }

    onGameEnd(fn: GameEnd) {
        this._onGameEnd = fn;
    }

    switchPlayer() {
        this._player = this._player === this._players[0] ? this._players[1] : this._players[0];
        if (this._onSwithPlayer != null) {
            this._onSwithPlayer(this._player);
        }

        if (this.availableIndexes.length === 0) {
            this.switchPlayer();
        }
    }

    private judgeResult(): GameResult {
        const blackCount = this._board.cells.filter(cell => cell === Cell.BLACK ).length;
        const whiteCount = this._board.cells.filter(cell => cell === Cell.WHITE ).length;
        let draw = false;
        let winner: Player | undefined;
        let looser: Player | undefined;

        if (blackCount === whiteCount) {
            draw = true
        } else if (blackCount > whiteCount) {
            winner = this._players[0];
            looser = this._players[1];
        } else if (blackCount < whiteCount) {
            winner = this._players[1];
            looser = this._players[0];
        }

        return {
            draw,
            winner,
            looser,
            blackCount,
            whiteCount: whiteCount,
        }
    }
}