import { Stone } from './stone';

export type Cell = 0 | Stone;

export const Cell = {
    EMPTY: 0 as const,
    BLACK: Stone.BLACK,
    WHITE: Stone.WHITE ,
}