/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { useState, FC } from "react";
import { AI } from "../lib/ai/ai";
import { Player, Stone } from "../lib/othello";
import { MinMax } from "../lib/ai/minmax";

export interface SidePanelProps {
    onClickStart: (player1: Player|AI, player2: Player|AI) => void;
}

const style = css({
    backgroundColor: '#EAE6E5',
    boxSizing: 'border-box',
    padding: 16,
    height: '100%',
    width: '100%',
});

 export const SidePanel: FC<SidePanelProps> = ({onClickStart}) => {

    const [playerType, setPlayerType] = useState({
        black: "human",
        white: "human",
    });

    const handleSelectChange = (color: 'black'|'white') =>
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setPlayerType({
                ...playerType,
                [color]: e.target.value,
            });
    }

    const handleClickStart = () => {
        const player1 = playerType.black === 'human' ? new Player(Stone.BLACK) : new MinMax(Stone.BLACK);
        const player2 = playerType.white === 'human' ? new Player(Stone.WHITE) : new MinMax(Stone.WHITE);
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
                    </select>
                </div>
                <div>
                    <span>白: </span>
                    <select value={playerType.white} onChange={handleSelectChange('white')}>
                        <option value="human">人間</option>
                        <option value="minmax">ミニマックス君</option>
                    </select>
                </div>
                <div><button onClick={handleClickStart}>ゲーム開始</button></div>
            </div>
        </div>
    )
}