import dynamic from 'next/dynamic';

export const AppContainer = dynamic({
    loader: async () => {
        await import('wasm-othello');
        const { App } = await import('./App');
        return App;
    }
})