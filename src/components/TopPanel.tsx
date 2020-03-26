/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { useState, FC } from "react";
import { AI } from "../lib/ai/ai";
import { Player, Stone } from "../lib/othello";
import { MinMax } from "../lib/ai/minmax";
import { WasmMinMax } from "../lib/ai/wasmMinmax";
import { Button, SelectMenuItem } from 'evergreen-ui';
import { Select } from "./Common/Select";
import styled from "@emotion/styled";
import { colors } from '../style/colors';

export interface SidePanelProps {
    onClickStart: (player1: Player|AI, player2: Player|AI) => void;
}

type PlayerType = 'human' | 'js' | 'wasm';

const style = css({
    backgroundColor: colors.blue,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
});

const SelectWrapper = styled.div`
    margin-top: 10px;
`;

const StoneComponent = styled.div`
    border-radius: 50%;
    width: 26px;
    height: 26px;
`;

const BlackStone = styled(StoneComponent)`
    background-color: ${colors.black1};
`;

const WhiteStone = styled(StoneComponent)`
    background-color: ${colors.white};
`

const ColumnCenterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LeftTopContainer = styled(ColumnCenterContainer)`
    padding-right: 20px;
`

const VsText = styled.span`
    position: relative;
    top: 39px;
    color: ${colors.black2};
`;

const MiddleTopContainer = ColumnCenterContainer;

const RightTopContainer = styled(ColumnCenterContainer)`
    padding-left: 20px;
`

const TopContainer = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 10px;
    padding-left: 60px;
    padding-right: 60px;
`;

const BottomContainer = styled.div`
    padding-bottom: 10px;
`;

const Divider = styled.div`
    height: 1px;
    width: 100%;
    background-color: ${colors.black3};
    margin-top: 16px;
    margin-bottom: 16px;
`;

export const TopPanel: FC<SidePanelProps> = ({onClickStart}) => {
    const options: SelectMenuItem[] = [
        {
            label: '人間',
            value: 'human',
        },
        {
            label: 'CPU: wasm',
            value: 'wasm',
        },
        {
            label: 'CPU: js',
            value: 'js',
        },
    ]

    const levelOptions: SelectMenuItem[] = [...Array(6)].map((_, i) => ({
        label: `Level: ${i+1}`,
        value: (i+1).toString()
    }));

    const [playerType, setPlayerType] = useState<{
        black: PlayerType,
        white: PlayerType,
    }>({
        black: 'human',
        white: 'wasm',
    });

    const [level, setLevel] = useState<{
        black: number;
        white: number;
    }>({
        black: 3,
        white: 3,
    })

    const getPlayer = (stone: Stone, type: PlayerType, level: number) => {
        switch(type) {
            case 'human': return new Player(stone);
            case 'js': return new MinMax(stone, level);
            case 'wasm': return new WasmMinMax(stone, level);
        }
    }

    const handleClickStart = () => {
        const player1 = getPlayer(Stone.BLACK, playerType.black, level.black);
        const player2 = getPlayer(Stone.WHITE, playerType.white, level.white);
        onClickStart(player1, player2);
    }

    return (
        <div css={style}>
            <TopContainer>
                <LeftTopContainer>
                    <BlackStone />
                    <SelectWrapper>
                        <Select
                            height={100}
                            width={125}
                            options={options}
                            selected={playerType.black}
                            onSelect={item => setPlayerType({...playerType, black: item.value as PlayerType})}
                        />
                    </SelectWrapper>

                    {playerType.black !== 'human' && (
                        <SelectWrapper>
                            <Select
                                text="レベルを選択"
                                width={125}
                                height={198}
                                options={levelOptions}
                                selected={level.black.toString()}
                                onSelect={item => setLevel({...level, black: Number(item.value)})}
                            />
                        </SelectWrapper>
                    )}
                </LeftTopContainer>
                <MiddleTopContainer>
                    <VsText>VS</VsText>
                </MiddleTopContainer>
                <RightTopContainer>
                    <WhiteStone/>
                    <SelectWrapper>
                        <Select
                            height={100}
                            width={125}
                            options={options}
                            selected={playerType.white}
                            onSelect={item => setPlayerType({...playerType, white: item.value as PlayerType})}
                        />
                    </SelectWrapper>

                    {playerType.white !== 'human' && (
                        <SelectWrapper>
                            <Select
                                text="レベルを選択"
                                width={125}
                                height={198}
                                options={levelOptions}
                                selected={level.white.toString()}
                                onSelect={item => setLevel({...level, white: Number(item.value)})}
                            />
                        </SelectWrapper>
                    )}
                </RightTopContainer>
            </TopContainer>
            <Divider />
            <BottomContainer>
                <Button appearance="primary" onClick={handleClickStart}>ゲーム開始</Button>
            </BottomContainer>
        </div>
    )
}