import { Stone } from "./stone";

type HandleSelect = (idx: number, stone: Stone) => void;

export class Player {
    private _onSelect?: HandleSelect;
    private _stone: Stone;

    constructor (stone: Stone) {
        this._stone = stone;
    }

    get stone(): Stone {
        return this._stone
    }

    get soneColor(): string {
        return this._stone === Stone.BLACK ? '黒' : '白';
    }

    select(idx: number) {
        if (this._onSelect == null) return;
        this._onSelect(idx, this._stone);
    }

    onSelect(fn: HandleSelect) {
        this._onSelect = fn;
    }
}