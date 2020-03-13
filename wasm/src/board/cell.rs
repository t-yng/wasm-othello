use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};

#[wasm_bindgen]
#[repr(u8)]
#[derive(Debug, Copy, Clone)]
pub enum Stone {
    BLACK = 1,
    WHITE = 2,
}

#[wasm_bindgen]
#[repr(u8)]
#[derive(Debug, Copy, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Cell {
    EMPTY = 0,
    BLACK = 1,
    WHITE = 2,
}

impl Cell {
    pub fn from_stone(stone: Stone) -> Cell {
        match stone {
            Stone::BLACK => Cell::BLACK,
            Stone::WHITE => Cell::WHITE,
        }
    }
}
