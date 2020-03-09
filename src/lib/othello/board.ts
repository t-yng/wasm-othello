import { Cell } from './cell'
import * as Simulator from './simulator';
import { Stone } from './stone';

export class Board {
    private _cells: Cell[];

    constructor() {
        this._cells = this.initializeCells()
        this._cells[27] = Cell.BLACK;
        this._cells[36] = Cell.BLACK;
        this._cells[28] = Cell.WHITE;
        this._cells[35] = Cell.WHITE;
    }

    get cells () { return this._cells }

    putStone(index: number, stone: Stone) {
        this._cells = Simulator.flipStones(this._cells, index, stone)
    }

    private initializeCells() {
        return [...Array(64)].map(() => Cell.EMPTY)
    }
}