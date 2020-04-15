#![feature(test)]

extern crate test;
extern crate wasm_othello;

use wasm_othello::ai::minmax::MinMax;
use wasm_othello::cell::Stone;

#[bench]
fn choice_next_position(b: &mut test::Bencher) {
    let minmax = MinMax::new(6);
    let cells: Vec<u8> = vec![
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 1, 1, 0, 0, 0,
        0, 0, 0, 2, 2, 2, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
    ];

    b.iter(|| {
        minmax.choice_next_position(&cells, Stone::WHITE);
    });
}