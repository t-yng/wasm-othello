/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { useState, FC } from "react";
import { AI } from "../lib/ai/ai";
import { Player, Stone } from "../lib/othello";
import { MinMax } from "../lib/ai/minmax";
import { WasmMinMax } from "../lib/ai/wasmMinmax";

export interface SidePanelProps {
    onClickStart: (player1: Player|AI, player2: Player|AI) => void;
}

type PlayerType = 'human' | 'minmax' | 'wasm';

const style = css({
    backgroundColor: '#EAE6E5',
    boxSizing: 'border-box',
    padding: 16,
    height: '100%',
    width: '100%',
});

 export const SidePanel: FC<SidePanelProps> = ({onClickStart}) => {

    const [playerType, setPlayerType] = useState<{
        black: PlayerType,
        white: PlayerType,
    }>({
        black: 'human',
        white: 'human',
    });

    const handleSelectChange = (color: 'black'|'white') =>
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setPlayerType({
                ...playerType,
                [color]: e.target.value,
            });
    }

    const getPlayer = (stone: Stone, type: PlayerType) => {
        switch(type) {
            case 'human': return new Player(stone);
            case 'minmax': return new MinMax(stone);
            case 'wasm': return new WasmMinMax(stone);
        }
    }

    const handleClickStart = () => {
        const player1 = getPlayer(Stone.BLACK, playerType.black);
        const player2 = getPlayer(Stone.WHITE, playerType.white);
        onClickStart(player1, player2);
    }

    return (
        <div css={style}>
            <div>
                <div>
                    <span>黒: </span>
                    <select value={playerType.black} onChange={handleSelectChange('black')}>
                        <option value="human">人間</option>
                        <option value="minmax">ミニマックス君</option>
                        <option value="wasm">wasm</option>
                    </select>
                </div>
                <div>
                    <span>白: </span>
                    <select value={playerType.white} onChange={handleSelectChange('white')}>
                        <option value="human">人間</option>
                        <option value="minmax">ミニマックス君</option>
                        <option value="wasm">wasm</option>
                    </select>
                </div>
                <div><button onClick={handleClickStart}>ゲーム開始</button></div>
            </div>
        </div>
    )
}