#!/bin/bash

# rustupが存在しないならインストール (wasm32ターゲット追加のために必要)
if !(type "rustup" > /dev/null 2>&1); then
    echo "⏬ install rustup"
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --no-modify-path
    export PATH="$HOME/.cargo/bin:$PATH"
else
    echo "👍 rustup is already installed"
fi

# wasm32-unknown-unknownターゲットを追加
echo "🎯 add wasm32-unknown-unknown target"
rustup target add wasm32-unknown-unknown

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
