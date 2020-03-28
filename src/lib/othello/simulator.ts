import { Cell } from './cell'
import { Stone } from './stone'

const LEFT_UP = -9
const UP = -8
const RIGHT_UP = -7
const LEFT = -1
const RIGHT = 1
const LEFT_DOWN = 7
const DOWN = 8
const RIGHT_DOWN = 9

// 石を反転させる方向
const directions = [
  LEFT_UP,
  UP,
  RIGHT_UP,
  LEFT,
  RIGHT,
  LEFT_DOWN,
  DOWN,
  RIGHT_DOWN
];

export const getAvailablePositions = (cells: Cell[], stone: Stone) => {
    const emptyPositions = cells
      .map((cell, index) => (cell === Cell.EMPTY) ? index : -1)
      .filter((value) => value >= 0)
    const avaliablePositions = emptyPositions.filter((index) => canPutStone(cells, index, stone))

    return avaliablePositions
}

export const canPutStone = (cells: Cell[], index: number, stone: Stone) => {
    const cell = cells[index]
    if (cell !== Cell.EMPTY) {
      return false
    }

    const flipPositions = directions.flatMap(direction => {
      return getFlipStonePositions(cells, index, direction, stone, []);
    });

    return flipPositions.length > 0;
}

export const isGameEnd = (cells: Cell[]) => {
    return (
      cells.includes(Cell.EMPTY) === false ||
      cells.filter(cell => cell === Cell.BLACK).length === 0 ||
      cells.filter(cell => cell === Cell.WHITE).length === 0
    );
}

export const flipStones = (cells: Cell[], index: number, stone: Stone): Cell[] => {
    let copyCells = cells.concat()
    copyCells[index] = stone as number;

    const flipPositions = directions.flatMap(direction => {
      return getFlipStonePositions(cells, index, direction, stone, [])
    });

    flipPositions.forEach((position) => {
      copyCells[position] = stone as number;
    })

    return copyCells
}

const getFlipStonePositions = (cells: Cell[], position: number, direction: number, stone: Stone, positions: number[] = []): number[] => {
    if (isOutOfBoard(position, direction)) return []

    const nextPostion = position + direction
    const cellState = cells[nextPostion]

    if (cellState === Cell.EMPTY) return []

    if (cellState as number !== stone as number) {
      positions.push(nextPostion)
      return getFlipStonePositions(cells, nextPostion, direction, stone, positions)
    } else {
      return positions
    }
}

const isLeftEnd = (index: number) => {
    return index % 8 === 0
}

const isRightEnd = (index: number) => {
    return index % 8 === 7
}

export const isOutOfBoard = (index: number, direction: number) => {
    let isOutOfBoard = false
    if(isLeftEnd(index)) {
      isOutOfBoard = isOutOfBoard || [LEFT_UP, LEFT, LEFT_DOWN].includes(direction)
    }

    if(isRightEnd(index)) {
      isOutOfBoard = isOutOfBoard || [RIGHT_UP, RIGHT, RIGHT_DOWN].includes(direction)
    }

    const nextPostion = index + direction
    isOutOfBoard = isOutOfBoard || nextPostion < 0 || 63 < nextPostion

    return isOutOfBoard
}
