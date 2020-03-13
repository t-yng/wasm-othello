import { Stone } from "./stone";

type HandleSelect = (idx: number, stone: Stone) => void;

export class Player {
    private _onSelect?: HandleSelect;
    private _stone: Stone;

    constructor (stone: Stone) {
        this._stone = stone;
    }

    get stone() { return this._stone }

    select(idx: number) {
        if (this._onSelect == null) return;
        this._onSelect(idx, this._stone);
    }

    onSelect(fn: HandleSelect) {
        this._onSelect = fn;
    }
}