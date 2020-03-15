import { MinMax } from 'wasm-othello';
import { AI } from './ai';
import { Cell, Stone } from '../othello';

export class WasmMinMax extends AI {
    private _minmax: MinMax;

    constructor(stone: Stone, level: number = 5) {
        super(stone);
        this._minmax = new MinMax(level);
    }

    choiceNextPosition(cells: Cell[], stone: Stone): number {
        console.log(cells, stone);
        return this._minmax.choice_next_position(cells, stone);
    }

    set level(level: number) {
        this._minmax.level = level;
    }
}