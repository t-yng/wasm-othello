# ビルド

```sh
$ wasm-pack build
```

# ベンチマークの実行

ベンチマーク実行には Rust の nightly版を別途インストールする必要があります。

## 前準備
1. 一時的にwasmbindgenをコメントアウトして、Rustのネイティブ実装に変更する。
2. Cargo.tomlの crate-type を ["rlib", "dylib"] に変更

## 実行

```sh
$ rustup run nightly cargo bench
```

# ベンチマーク比較

## ツールのインストール
[BurntSushi/cargo\-benchcmp: A small utility to compare Rust micro\-benchmarks\.](https://github.com/BurntSushi/cargo-benchcmp)

```sh
$ cargo install cargo-benchcmp
```

## 実行
```sh
$ rustup run nightly cargo bench | tee before.txt
$ rustup run nightly cargo bench | tee after.txt
$ cargo benchcmp before.txt after.txt
 name                  befre.txt ns/iter  after.txt ns/iter  diff ns/iter   diff %  speedup
 choice_next_position  111,132,773        75,291,240          -35,841,533  -32.25%   x 1.48
```

# プロファイリング
## ツールのインストール
[cmyr/cargo\-instruments: A cargo plugin to generate Xcode Instruments trace files](https://github.com/cmyr/cargo-instruments)

```sh
$ cargo install cargo-instruments
```

## 実行
```sh
$ rustup run nightly cargo instruments --bench bench --open
```