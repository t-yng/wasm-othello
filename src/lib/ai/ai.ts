import { Stone } from "../othello/stone"
import { Cell } from "../othello/cell";
import { Player } from "../othello/player";

export abstract class AI extends Player {
    protected _level: number;

    constructor (stone: Stone, level: number) {
      super(stone);
      this._level = level;
    }

    putStone(cells: Cell[], stone: Stone) {
      const idx = this.choiceNextPosition(cells, stone);
      this.select(idx);
    }

    abstract choiceNextPosition(cells: Cell[], stone: Stone): number;
}