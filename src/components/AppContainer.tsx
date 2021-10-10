import dynamic from "next/dynamic";
import wasm from "wasm-othello/wasm_othello";

export const AppContainer = dynamic({
  loader: async () => {
    await import("../../wasm/pkg/wasm_othello_bg");
    // const test = await import("wasm-othello/wasm_othello_bg.wasm");
    // const wasm = import("wasm-othello/wasm_othello");
    // wasm.then((ws) => console.log(ws));
    // console.log(wasm, wasm.MinMax);
    // console.log(test);
    const { App } = await import("./App");
    return App;
  },
  ssr: false,
});
