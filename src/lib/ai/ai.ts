import { Stone } from "../othello/stone"
import { Cell } from "../othello/cell";
import { Player } from "../othello/player";

export abstract class AI extends Player {
    protected _level: number;
    private _times: number[];

    constructor (stone: Stone, level: number) {
      super(stone);
      this._level = level;
      this._times = [];
    }

    get times() {
      return this._times
    }

    putStone(cells: Cell[], stone: Stone) {
      const start = performance.now();
      const idx = this.choiceNextPosition(cells, stone);
      const end = performance.now();
      this._times.push(end-start);
      this.select(idx);
    }

    abstract choiceNextPosition(cells: Cell[], stone: Stone): number;
}