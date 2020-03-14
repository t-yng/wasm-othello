import dynamic from 'next/dynamic';
import { App } from './App';

export const AppContainer = dynamic({
    loader: async () => {
        await import('wasm-othello');
        return App;
    }
})