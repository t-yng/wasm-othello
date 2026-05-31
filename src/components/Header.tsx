import { css } from "../style/styles";
import styled from "@emotion/styled";

const Title = styled.span({
  fontSize: 32,
  fontFamily: "'Russo One', sans-serif",
  fontWeight: 400,
  color: "#E2E8F0",
  flex: 1,
  letterSpacing: "0.05em",
  textShadow: "0 0 20px rgba(124, 58, 237, 0.8), 0 0 40px rgba(124, 58, 237, 0.4)",
  "@media (max-width: 576px)": {
    fontSize: 22,
  },
});

const HeaderInner = styled.div`
  width: 576px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const GitHubLink = styled.a({
  display: "flex",
  alignItems: "center",
  opacity: 0.7,
  transition: "opacity 0.2s ease",
  "&:hover": {
    opacity: 1,
  },
});

const style = css({
  textAlign: "center",
  background: "linear-gradient(135deg, #1E1B4B 0%, #2D1B69 50%, #1E1B4B 100%)",
  borderBottom: "1px solid rgba(124, 58, 237, 0.3)",
  boxShadow: "0 4px 24px rgba(124, 58, 237, 0.2)",
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
        <Title>Wasm Othello</Title>
        <GitHubLink
          href="https://github.com/t-yng/wasm-othello"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="#E2E8F0"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
        </GitHubLink>
      </HeaderInner>
    </header>
  );
};
