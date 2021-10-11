import dynamic from "next/dynamic";

export const AppContainer = dynamic({
  loader: async () => {
    await import("../lib/wasm/wasm_othello_bg");
    const { App } = await import("./App");
    return App;
  },
});
