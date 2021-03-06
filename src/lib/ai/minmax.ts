import { AI } from './ai'
import * as Simulator from '../othello/simulator'
import { Stone } from '../othello/stone'
import { Cell } from '../othello/cell'

export class MinMax extends AI {

  constructor(stone: Stone, level: number) {
    super('js', stone, level);
  }

  choiceNextPosition(cells: Cell[], stone: Stone) {
    const availablePositions = Simulator.getAvailablePositions(cells, stone)

    let maxScore = Number.NEGATIVE_INFINITY
    let nextPosition = -1
    for(let position of availablePositions) {
      const score = this.scoreNextPosition(cells, stone, stone, position, this._level -1 )
      if(score > maxScore) {
        maxScore = score
        nextPosition = position
      }
    }

    if(nextPosition === -1) {
      alert('置く場所が見つかりませんでした。')
      throw new Error('置く場所が見つかりませんでした')
    }

    return nextPosition
  }

  /**
   * 盤面における打ち手の得点を計算する
   */
  private scoreNextPosition(cells: Cell[], player: Stone, stone: Stone, nextIdx: number, depth = 0) {
    const nextCells = Simulator.flipStones(cells, nextIdx, stone)

    if(depth === 0) {
      return this.evaluate(nextCells, player)
    } else {
      const nextStone = (stone === Stone.WHITE) ? Stone.BLACK : Stone.WHITE
      const availablePositions = Simulator.getAvailablePositions(nextCells, nextStone)

      // 打つ場所が無い時は探索を打ち切り盤面の評価得点を返す
      if(availablePositions.length === 0) {
        return this.evaluate(nextCells, player)
      }

      if(player === nextStone) {
        let maxScore = Number.NEGATIVE_INFINITY
        for(let position of availablePositions) {
          const score = this.scoreNextPosition(nextCells, player, nextStone, position, depth - 1)
          maxScore = (score > maxScore) ? score : maxScore
        }
        return maxScore
      } else {
        let minScore = Number.POSITIVE_INFINITY
        for(let position of availablePositions) {
          const score = this.scoreNextPosition(nextCells, player, nextStone, position, depth - 1)
          minScore = (score < minScore) ? score : minScore
        }
        return minScore
      }
    }
  }

  private evaluate(cells: Cell[], stone: Stone) {
    let score = 0

    if(cells.filter((cell) => cell === Cell.EMPTY).length > 32) {
      // 中盤までは石の数を少なく取るようにする
      // 相手の石が多い方が得点が高い
      score += cells.filter((cell) => cell as number !== stone as number).length
    } else {
      // 後半はたくさん石を取れるようにする
      score += cells.filter((cell) => cell as number === stone as number).length
    }

    // 自分の石が角にある
    score += ( cells[0] !== Cell.EMPTY && cells[0] as number === stone as number) ? 500 : 0
    score += ( cells[7] !== Cell.EMPTY && cells[7] as number === stone as number) ? 500 : 0
    score += ( cells[56] !== Cell.EMPTY && cells[56] as number === stone as number) ? 500 : 0
    score += ( cells[63] !== Cell.EMPTY && cells[63] as number === stone as number) ? 500 : 0

    // 相手の石が角にある
    score += ( cells[0] !== Cell.EMPTY && cells[0] as number !== stone as number) ? -500 : 0
    score += ( cells[7] !== Cell.EMPTY && cells[7] as number !== stone as number) ? -500 : 0
    score += ( cells[56] !== Cell.EMPTY && cells[56] as number !== stone as number) ? -500 : 0
    score += ( cells[63] !== Cell.EMPTY && cells[63] as number !== stone as number) ? -500 : 0

    // 自分の石が角の上下にある
    score += ( cells[1] !== Cell.EMPTY && cells[1] as number === stone as number) ? -30 : 0
    score += ( cells[6] !== Cell.EMPTY && cells[6] as number === stone as number) ? -30 : 0
    score += ( cells[8] !== Cell.EMPTY && cells[8] as number === stone as number) ? -30 : 0
    score += ( cells[15] !== Cell.EMPTY && cells[15] as number === stone as number) ? -30 : 0
    score += ( cells[48] !== Cell.EMPTY && cells[48] as number === stone as number) ? -30 : 0
    score += ( cells[55] !== Cell.EMPTY && cells[55] as number === stone as number) ? -30 : 0
    score += ( cells[57] !== Cell.EMPTY && cells[57] as number === stone as number) ? -30 : 0
    score += ( cells[62] !== Cell.EMPTY && cells[62] as number === stone as number) ? -30 : 0

    // 相手の石が角の上下にある
    score += ( cells[1] !== Cell.EMPTY && cells[1] as number !== stone as number) ? 30 : 0
    score += ( cells[6] !== Cell.EMPTY && cells[6] as number !== stone as number) ? 30 : 0
    score += ( cells[8] !== Cell.EMPTY && cells[8] as number !== stone as number) ? 30 : 0
    score += ( cells[15] !== Cell.EMPTY && cells[15] as number !== stone as number) ? 30 : 0
    score += ( cells[48] !== Cell.EMPTY && cells[48] as number !== stone as number) ? 30 : 0
    score += ( cells[55] !== Cell.EMPTY && cells[55] as number !== stone as number) ? 30 : 0
    score += ( cells[57] !== Cell.EMPTY && cells[57] as number !== stone as number) ? 30 : 0
    score += ( cells[62] !== Cell.EMPTY && cells[62] as number !== stone as number) ? 30 : 0

    // 自分の石が角の斜めにある
    score += ( cells[9] !== Cell.EMPTY && cells[9] as number === stone as number) ? -100 : 0
    score += ( cells[14] !== Cell.EMPTY && cells[14] as number === stone as number) ? -100 : 0
    score += ( cells[49] !== Cell.EMPTY && cells[49] as number === stone as number) ? -100 : 0
    score += ( cells[54] !== Cell.EMPTY && cells[54] as number === stone as number) ? -100 : 0

    // 相手の石が角の斜めにある
    score += ( cells[9] !== Cell.EMPTY && cells[9] as number !== stone as number) ? 100 : 0
    score += ( cells[14] !== Cell.EMPTY && cells[14] as number !== stone as number) ? 100 : 0
    score += ( cells[49] !== Cell.EMPTY && cells[49] as number !== stone as number) ? 100 : 0
    score += ( cells[54] !== Cell.EMPTY && cells[54] as number !== stone as number) ? 100 : 0

    return score
  }
}