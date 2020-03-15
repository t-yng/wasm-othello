extern crate wasm_bindgen;
extern crate serde;
extern crate web_sys;

#[macro_use]
extern crate serde_derive;

macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

mod cell;
mod simulator;
pub mod ai;
