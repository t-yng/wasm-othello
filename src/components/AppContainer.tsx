"use client";

import dynamic from "next/dynamic";

export const AppContainer = dynamic(
  async () => {
    const [, { App }] = await Promise.all([
      import("../lib/wasm/wasm_othello"),
      import("./App"),
    ]);
    return App;
  },
  { ssr: false },
);
