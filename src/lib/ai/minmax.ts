import { AI } from './ai'
import * as Simulator from '../othello/simulator'
import { Stone } from '../othello/stone'
import { Cell } from '../othello/cell'

export default class MinMax extends AI {
  get SEARCH_DEPTH() {
    return 4
  }

  choiceNextPosition(cells: Cell[], stone: Stone) {
    const availablePositions = Simulator.getAvailablePositions(cells, stone)

    let maxScore = Number.NEGATIVE_INFINITY
    let nextPosition = -1
    for(let position of availablePositions) {
      const score = this.scoreNextPosition(cells, stone, stone, position, this.SEARCH_DEPTH - 1)
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
      score += cells.filter((cell) => cell !== stone).length
    } else {
      // 後半はたくさん石を取れるようにする
      score += cells.filter((cell) => cell === stone).length
    }

    // 自分の石が角にある
    score += (cells[0] === stone) ? 200 : 0
    score += (cells[7] === stone) ? 200 : 0
    score += (cells[56] === stone) ? 200 : 0
    score += (cells[63] === stone) ? 200 : 0

    // 相手の石が角にある
    score += (cells[0] !== stone) ? -200 : 0
    score += (cells[7] !== stone) ? -200 : 0
    score += (cells[56] !== stone) ? -200 : 0
    score += (cells[63] !== stone) ? -200 : 0

    // 角の上下に石がある
    score += (cells[1] === stone) ? -30 : 0
    score += (cells[6] === stone) ? -30 : 0
    score += (cells[8] === stone) ? -30 : 0
    score += (cells[15] === stone) ? -30 : 0
    score += (cells[48] === stone) ? -30 : 0
    score += (cells[55] === stone) ? -30 : 0
    score += (cells[57] === stone) ? -30 : 0
    score += (cells[62] === stone) ? -30 : 0

    // 自分の石が角の斜めにある
    score += (cells[9] === stone) ? -100 : 0
    score += (cells[14] === stone) ? -100 : 0
    score += (cells[49] === stone) ? -100 : 0
    score += (cells[54] === stone) ? -100 : 0

    // 相手の石が角の斜めにある
    score += (cells[9] !== stone) ? 100 : 0
    score += (cells[14] !== stone) ? 100 : 0
    score += (cells[49] !== stone) ? 100 : 0
    score += (cells[54] !== stone) ? 100 : 0

    return score
  }
}