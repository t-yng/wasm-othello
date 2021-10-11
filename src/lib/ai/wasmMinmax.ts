import { MinMax } from "../wasm/wasm_othello_bg";
import { AI } from "./ai";
import { Cell, Stone } from "../othello";

export class WasmMinMax extends AI {
  private _minmax: MinMax;

  constructor(stone: Stone, level: number) {
    super("wasm", stone, level);
    this._minmax = new MinMax(level);
  }

  choiceNextPosition(cells: Cell[], stone: Stone): number {
    return this._minmax.choice_next_position(Uint8Array.from(cells), stone);
  }
}
