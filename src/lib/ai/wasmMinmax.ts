import { MinMax } from 'wasm-othello';
import { AI } from './ai';
import { Cell, Stone } from '../othello';

export class WasmMinMax extends AI {
    private _minmax: MinMax;

    constructor(stone: Stone) {
        super(stone);
        this._minmax = new MinMax();
        this._minmax.search_depth = 5;
    }

    choiceNextPosition(cells: Cell[], stone: Stone): number {
        return this._minmax.choice_next_position(cells, stone);
    }

    set level(level: number) {
        this._minmax.search_depth = level;
    }
}