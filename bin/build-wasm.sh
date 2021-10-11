#!/bin/bash

# Rustが存在しないならインストール
if !(type "rustc" > /dev/null 2>&1); then
    echo "⏬ install rust"
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    . $HOME/.cargo/env
else
    echo "👍 rust is already installed"
fi

# wasm-packが存在しないならインストール
if !(type "wasm-pack" > /dev/null 2>&1); then
    echo "⏬ install wasm-pack"
    curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
else
    echo "👍 wasm-pack is already installed"
fi

# wasmのビルド
echo "🛠 build wasm"
wasm-pack build wasm -d ../src/lib/wasm;
