# Build

```sh
$ wasm-pack build
```

# Running Benchmarks

Running benchmarks requires installing Rust's nightly toolchain separately.

## Prerequisites
1. Temporarily comment out wasm-bindgen and switch to a native Rust implementation.
2. Change `crate-type` in Cargo.toml to `["rlib", "dylib"]`

## Run

```sh
$ rustup run nightly cargo bench
```

# Benchmark Comparison

## Install Tool
[BurntSushi/cargo\-benchcmp: A small utility to compare Rust micro\-benchmarks\.](https://github.com/BurntSushi/cargo-benchcmp)

```sh
$ cargo install cargo-benchcmp
```

## Run
```sh
$ rustup run nightly cargo bench | tee before.txt
$ rustup run nightly cargo bench | tee after.txt
$ cargo benchcmp before.txt after.txt
 name                  befre.txt ns/iter  after.txt ns/iter  diff ns/iter   diff %  speedup
 choice_next_position  111,132,773        75,291,240          -35,841,533  -32.25%   x 1.48
```

# Profiling
## Install Tool
[cmyr/cargo\-instruments: A cargo plugin to generate Xcode Instruments trace files](https://github.com/cmyr/cargo-instruments)

```sh
$ cargo install cargo-instruments
```

## Run
```sh
$ rustup run nightly cargo instruments --bench bench --open
```
