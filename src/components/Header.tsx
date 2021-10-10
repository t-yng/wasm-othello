/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { colors } from "../style/colors";

const Title = styled.span({
  fontSize: 36,
  color: colors.white,
  flex: 1,
  "@media (max-width: 576px)": {
    fontSize: 24,
  },
});

const HeaderInner = styled.div`
  width: 576px;
  display: flex;
  align-items: baseline;
`;

const style = css({
  width: "100vw",
  textAlign: "center",
  backgroundColor: colors.green,
  height: 72,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: "calc((100vw - (100vw * 0.11 * 8)) / 2)",
  paddingRight: "calc((100vw - (100vw * 0.11 * 8)) / 2)",
  boxSizing: "border-box",
});

export const Header = () => {
  return (
    <header css={style}>
      <HeaderInner>
        <Title>wasmオセロ</Title>
        <a
          href="https://github.com/t-yng/wasm-othello"
          target="_blank"
          rel="noopner"
        >
          <img src="/icons/GitHub.png" width={24} height={24} />
        </a>
      </HeaderInner>
    </header>
  );
};
