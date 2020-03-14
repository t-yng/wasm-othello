use crate::cell::Stone;
use crate::cell::Cell;
use crate::simulator::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct MinMax {
    pub search_depth: i8
}

#[wasm_bindgen]
impl MinMax {
    pub fn choice_next_position(&self, values: JsValue, stone: Stone) -> i8 {
        let cells: Vec<Cell> = values.into_serde().unwrap();
        let available_idxes: Vec<usize> = get_available_positions(&values, stone).into_serde().unwrap();

        let mut max_score = i32::min_value();
        let mut next_idx: Option<usize> = None;
        for idx in available_idxes {
            let score = MinMax::score_next_idx(&cells, stone, stone, idx, self.search_depth - 1);
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
    fn score_next_idx(cells: &Vec<Cell>, player: Stone, stone: Stone, idx: usize, depth: i8) -> i32 {
        let next_cells = flip_stones(cells, idx, stone);
        let next_cells_jsvalue = JsValue::from_serde(&next_cells).unwrap();

        if depth == 0 {
            return MinMax::evaluate(&next_cells, stone);
        }

        let next_stone = if stone == Stone::WHITE { Stone::BLACK } else { Stone::WHITE };
        let available_idxes: Vec<usize> = get_available_positions(&next_cells_jsvalue, next_stone).into_serde().unwrap();

        // 打つ場所が無い時は探索を打ち切り盤面の評価得点を返す
        if available_idxes.len() == 0 {
            return MinMax::evaluate(&next_cells, stone);
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
                let score = MinMax::score_next_idx(&next_cells, player, stone, idx, depth - 1);
                min_score = if score < min_score { score } else { min_score };
            }

            return min_score;
         }
    }

    fn evaluate(cells: &Vec<Cell>, stone: Stone) -> i32 {
        let mut score: i32 = 0;
        let empty_count: usize = cells.iter()
                                .filter(|&&cell| cell == Cell::EMPTY)
                                .collect::<Vec<&Cell>>()
                                .len();

        score += if empty_count > 32 {
            // 中盤までは石の数を少なく取るようにする
            // 相手の石が多い方が得点が高い
            cells.iter().filter(|&&cell| cell as i8 != stone as i8).collect::<Vec<&Cell>>().len() as i32
        } else {
           // 後半はたくさん石を取れるようにする
            cells.iter().filter(|&&cell| cell as i8 == stone as i8).collect::<Vec<&Cell>>().len() as i32
        };

        // 自分の石が角にある
        score += if cells[0] as i8 == stone as i8 { 200 } else { 0 };
        score += if cells[7] as i8 == stone as i8 { 200 } else { 0 };
        score += if cells[56] as i8 == stone as i8 { 200 } else { 0 };
        score += if cells[63] as i8 == stone as i8 { 200 } else { 0 };

        // 相手の石が角にある
        score += if cells[0] as i8 != stone as i8 { -200 } else { 0 };
        score += if cells[7] as i8 != stone as i8 { -200 } else { 0 };
        score += if cells[56] as i8 != stone as i8 { -200 } else { 0 };
        score += if cells[63] as i8 != stone as i8 { -200 } else { 0 };

        // 角の上下に石がある
        score += if cells[1] as i8 == stone as i8 { -30 } else { 0 };
        score += if cells[6] as i8 == stone as i8 { -30 } else { 0 };
        score += if cells[8] as i8 == stone as i8 { -30 } else { 0 };
        score += if cells[15] as i8 == stone as i8 { -30 } else { 0 };
        score += if cells[48] as i8 == stone as i8 { -30 } else { 0 };
        score += if cells[55] as i8 == stone as i8 { -30 } else { 0 };
        score += if cells[57] as i8 == stone as i8 { -30 } else { 0 };
        score += if cells[62] as i8 == stone as i8 { -30 } else { 0 };

        // 自分の石が角の斜めにある
        score += if cells[9] as i8 == stone as i8 { -100 } else { 0 };
        score += if cells[14] as i8 == stone as i8 { -100 } else { 0 };
        score += if cells[49] as i8 == stone as i8 { -100 } else { 0 };
        score += if cells[54] as i8 == stone as i8 { -100 } else { 0 };

        // 相手の石が角の斜めにある
        score += if cells[9] as i8 != stone as i8 { 100 } else { 0 };
        score += if cells[14] as i8 != stone as i8 { 100 } else { 0 };
        score += if cells[49] as i8 != stone as i8 { 100 } else { 0 };
        score += if cells[54] as i8 != stone as i8 { 100 } else { 0 };

        score
    }
}
