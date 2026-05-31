import { Global } from "@emotion/react";
import { Main } from "./Main";
import { Header } from "./Header";

const globalStyles = {
  "*, *::before, *::after": {
    boxSizing: "border-box" as const,
  },
  body: {
    margin: 0,
    background: "linear-gradient(160deg, #1A1040 0%, #0D0B1E 50%, #0F1428 100%)",
    backgroundAttachment: "fixed",
    fontFamily: "'Chakra Petch', sans-serif",
    color: "#E2E8F0",
    minHeight: "100vh",
  },
  h2: {
    fontFamily: "'Russo One', sans-serif",
    "@media (max-width: 576px)": {
      fontSize: "1.25rem",
    },
  },
};

export const App = () => {
  return (
    <>
      <Global styles={globalStyles} />
      <div>
        <Header />
        <Main />
      </div>
    </>
  );
};
