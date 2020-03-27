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
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
});

const SelectWrapper = styled.div({
    marginTop: 10,
});

const StoneComponent = styled.div({
    borderRadius: '50%',
    width: 26,
    height: 26,
});

const BlackStone = styled(StoneComponent)({
    backgroundColor: colors.black1,
});

const WhiteStone = styled(StoneComponent)({
    backgroundColor: colors.white,
})

const ColumnCenterContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const LeftTopContainer = styled(ColumnCenterContainer)({
    paddingRight: 20,
    '@media (max-width: 576px)': {
        paddingRight: 10,
    }
});

const VsText = styled.span({
    position: 'relative',
    top: 39,
    color: colors.black2,
    '@media (max-width: 576px)': {
        fontSize: 14,
        top: 42,
    }
});

const MiddleTopContainer = ColumnCenterContainer;

const RightTopContainer = styled(ColumnCenterContainer)({
    paddingLeft: 20,
    '@media (max-width: 576px)': {
        paddingLeft: 10,
    }
});

const TopContainer = styled.div({
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 10,
    paddingLeft: 60,
    paddingRight: 60,
    '@media (max-width: 576px)': {
        paddingLeft: 10,
        paddingRight: 10,
    }
});

const BottomContainer = styled.div({
    paddingBottom: 10,
});

const Divider = styled.div({
    height: 1,
    width: '100%',
    backgroundColor: colors.black3,
    marginTop: 16,
    marginBottom: 16,
});

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
                            width={115}
                            options={options}
                            selected={playerType.black}
                            onSelect={item => setPlayerType({...playerType, black: item.value as PlayerType})}
                        />
                    </SelectWrapper>

                    {playerType.black !== 'human' && (
                        <SelectWrapper>
                            <Select
                                text="レベルを選択"
                                width={115}
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
                            width={115}
                            options={options}
                            selected={playerType.white}
                            onSelect={item => setPlayerType({...playerType, white: item.value as PlayerType})}
                        />
                    </SelectWrapper>

                    {playerType.white !== 'human' && (
                        <SelectWrapper>
                            <Select
                                text="レベルを選択"
                                width={115}
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