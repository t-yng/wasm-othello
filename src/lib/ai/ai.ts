import { Stone } from "../othello/stone"
import { Cell } from "../othello/cell";
import { Player } from "../othello/player";

export abstract class AI extends Player {
    putStone(cells: Cell[], stone: Stone) {
      const idx = this.choiceNextPosition(cells, stone);
      this.select(idx);
    }

    abstract choiceNextPosition(cells: Cell[], stone: Stone): number;
}