use crate::cell::Stone;
use crate::cell::Cell;
use crate::simulator::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct MinMax {
    pub level: usize
}

#[wasm_bindgen]
impl MinMax {
    #[wasm_bindgen(constructor)]
    pub fn new(level: usize) -> MinMax {
        MinMax {
            level: level,
        }
    }

    pub fn choice_next_position(&self, values: Vec<u8>, stone: Stone) -> i8 {
        let cells: Vec<Cell> = values.iter().map(|&v| Cell::from_u8(v)).collect();
        let available_idxes: Vec<usize> = get_available_positions(&cells, stone);

        let mut max_score = i32::min_value();
        let mut next_idx: Option<usize> = None;
        for idx in available_idxes {
            let score = MinMax::score_next_idx(&cells, stone, stone, idx, self.level - 1);
            if score > max_score {
                max_score = score;
                next_idx = Some(idx);
            }
        }

        match next_idx {
            Some(x) => x as i8,
            None => -1,
        }
    }

    /**
     * 盤面における打ち手の得点を計算する
     */
    fn score_next_idx(cells: &Vec<Cell>, player: Stone, stone: Stone, idx: usize, depth: usize) -> i32 {
        let next_cells = flip_stones(cells, idx, stone);

        if depth == 0 {
            return MinMax::evaluate(&next_cells, player);
        }

        let next_stone = if stone == Stone::WHITE { Stone::BLACK } else { Stone::WHITE };
        let available_idxes: Vec<usize> = get_available_positions(&next_cells, next_stone);

        // 打つ場所が無い時は探索を打ち切り盤面の評価得点を返す
        if available_idxes.len() == 0 {
            return MinMax::evaluate(&next_cells, player);
        }

        if player == next_stone {
            let mut max_score = i32::min_value();
            for idx in available_idxes {
                let score = MinMax::score_next_idx(&next_cells, player, next_stone, idx, depth - 1);
                max_score = if score > max_score { score } else { max_score };
            }

            return max_score;
         } else {
            let mut min_score = i32::max_value();
            for idx in available_idxes {
                let score = MinMax::score_next_idx(&next_cells, player, next_stone, idx, depth - 1);
                min_score = if score < min_score { score } else { min_score };
            }

            return min_score;
         }
    }

    fn evaluate(cells: &Vec<Cell>, stone: Stone) -> i32 {
        let mut score: i32 = 0;
        let mut empty_count = 0;
        for cell in cells.iter() {
            empty_count += if *cell == Cell::EMPTY { 1 } else { 0 };
        }

        score += if empty_count > 32 {
            // 中盤までは石の数を少なく取るようにする
            // 相手の石が多い方が得点が高い
            let mut count = 0;
            for cell in cells.iter() {
                count += if *cell as u8 != stone as u8 { 1 } else { 0 };
            }
            count
        } else {
            // 後半はたくさん石を取れるようにする
            let mut count = 0;
            for cell in cells.iter() {
                count += if *cell as u8 == stone as u8 { 1 } else { 0 };
            }
            count
        };

        // 自分の石が角にある
        score += if cells[0] != Cell::EMPTY && cells[0] as u8 == stone as u8 { 500 } else { 0 };
        score += if cells[7] != Cell::EMPTY && cells[7] as u8 == stone as u8 { 500 } else { 0 };
        score += if cells[56] != Cell::EMPTY && cells[56] as u8 == stone as u8 { 500 } else { 0 };
        score += if cells[63] != Cell::EMPTY && cells[63] as u8 == stone as u8 { 500 } else { 0 };

        // 相手の石が角にある
        score += if cells[0] != Cell::EMPTY && cells[0] as u8 != stone as u8 { -500 } else { 0 };
        score += if cells[7] != Cell::EMPTY && cells[7] as u8 != stone as u8 { -500 } else { 0 };
        score += if cells[56] != Cell::EMPTY && cells[56] as u8 != stone as u8 { -500 } else { 0 };
        score += if cells[63] != Cell::EMPTY && cells[63] as u8 != stone as u8 { -500 } else { 0 };

        // 自分の石が角の上下にある
        score += if cells[1] != Cell::EMPTY && cells[1] as u8 == stone as u8 { -30 } else { 0 };
        score += if cells[6] != Cell::EMPTY && cells[6] as u8 == stone as u8 { -30 } else { 0 };
        score += if cells[8] != Cell::EMPTY && cells[8] as u8 == stone as u8 { -30 } else { 0 };
        score += if cells[15] != Cell::EMPTY && cells[15] as u8 == stone as u8 { -30 } else { 0 };
        score += if cells[48] != Cell::EMPTY && cells[48] as u8 == stone as u8 { -30 } else { 0 };
        score += if cells[55] != Cell::EMPTY && cells[55] as u8 == stone as u8 { -30 } else { 0 };
        score += if cells[57] != Cell::EMPTY && cells[57] as u8 == stone as u8 { -30 } else { 0 };
        score += if cells[62] != Cell::EMPTY && cells[62] as u8 == stone as u8 { -30 } else { 0 };

        // 相手の石が角の上下にある
        score += if cells[1] != Cell::EMPTY && cells[1] as u8 != stone as u8 { 30 } else { 0 };
        score += if cells[6] != Cell::EMPTY && cells[6] as u8 != stone as u8 { 30 } else { 0 };
        score += if cells[8] != Cell::EMPTY && cells[8] as u8 != stone as u8 { 30 } else { 0 };
        score += if cells[15] != Cell::EMPTY && cells[15] as u8 != stone as u8 { 30 } else { 0 };
        score += if cells[48] != Cell::EMPTY && cells[48] as u8 != stone as u8 { 30 } else { 0 };
        score += if cells[55] != Cell::EMPTY && cells[55] as u8 != stone as u8 { 30 } else { 0 };
        score += if cells[57] != Cell::EMPTY && cells[57] as u8 != stone as u8 { 30 } else { 0 };
        score += if cells[62] != Cell::EMPTY && cells[62] as u8 != stone as u8 { 30 } else { 0 };

        // 自分の石が角の斜めにある
        score += if cells[9] != Cell::EMPTY && cells[9] as u8 == stone as u8 { -100 } else { 0 };
        score += if cells[14] != Cell::EMPTY && cells[14] as u8 == stone as u8 { -100 } else { 0 };
        score += if cells[49] != Cell::EMPTY && cells[49] as u8 == stone as u8 { -100 } else { 0 };
        score += if cells[54] != Cell::EMPTY && cells[54] as u8 == stone as u8 { -100 } else { 0 };

        // 相手の石が角の斜めにある
        score += if cells[9] != Cell::EMPTY && cells[9] as u8 != stone as u8 { 100 } else { 0 };
        score += if cells[14] != Cell::EMPTY && cells[14] as u8 != stone as u8 { 100 } else { 0 };
        score += if cells[49] != Cell::EMPTY && cells[49] as u8 != stone as u8 { 100 } else { 0 };
        score += if cells[54] != Cell::EMPTY && cells[54] as u8 != stone as u8 { 100 } else { 0 };

        score
    }
}
