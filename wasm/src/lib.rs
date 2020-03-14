extern crate wasm_bindgen;
extern crate serde;

#[macro_use]
extern crate serde_derive;

mod cell;
pub mod simulator;
pub mod ai;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
