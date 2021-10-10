import dynamic from "next/dynamic";

export const AppContainer = dynamic({
  loader: async () => {
    await import("../../wasm/pkg/wasm_othello_bg");
    const { App } = await import("./App");
    return App;
  },
});
