mod cell;
mod simulator;

use cell::Cell;
use cell::Stone;
use simulator::flip_stones;
use wasm_bindgen::prelude::*;
use serde_json::json;

#[wasm_bindgen]
pub struct Board {
    cells: Vec<Cell>,
}

#[wasm_bindgen]
impl Board {
    pub fn new () -> Board {
        Board {
            cells: Board::initialize_cells()
        }
    }

    fn initialize_cells () -> Vec<Cell> {
        let mut cells = vec![Cell::EMPTY; 64];
        cells[27] = Cell::BLACK;
        cells[36] = Cell::BLACK;
        cells[28] = Cell::WHITE;
        cells[35] = Cell::WHITE;
        cells
    }

    pub fn put_stone (&mut self, position: usize, stone: Stone) {
        self.cells = flip_stones(&self.cells, position, stone);
    }

    pub fn get_cells_as_json (&self) -> String {
        let cells: Vec<u8> = self.cells.clone().into_iter().map(|c| c as u8).collect();
        json!(cells).to_string()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn new_board_instance () {
        let board = Board::new();
        assert_eq!(board.cells[0], Cell::EMPTY);
        assert_eq!(board.cells[27], Cell::BLACK);
        assert_eq!(board.cells[36], Cell::BLACK);
        assert_eq!(board.cells[28], Cell::WHITE);
        assert_eq!(board.cells[35], Cell::WHITE);
    }

    // #[test]
    // fn get_cells_as_json () {
    //     let board = Board::new();
    //     serde_json::from_str<a', Vec<Cell>>("{\"test\": 1}");
    // }
}