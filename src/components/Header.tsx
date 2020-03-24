/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';

const Title = styled.span`
    font-size: 36px;
    color: white;
    flex: 1;
`;

const HeaderInner = styled.div`
    width: 576px;
    display: flex;
    align-items: baseline;
`;

const style = css({
    width: '100vw',
    textAlign: 'center',
    backgroundColor: '#62AC7E',
    height: 72,
    marginBottom: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const Header = () => {
    return (
        <header css={style}>
            <HeaderInner>
                <Title>wasmオセロ</Title>
                <a href="https://github.com/t-yng/wasm-othello" target="_blank" rel="noopner">
                    <img src="/icons/GitHub.png" width={24} height={24}/>
                </a>
            </HeaderInner>
        </header>
    )
}