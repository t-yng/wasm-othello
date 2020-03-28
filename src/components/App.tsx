/** @jsx jsx */
import { jsx, Global } from "@emotion/core";
import { Main } from './Main';
import { Header } from "./Header";

const globalStyles = {
    'body': {
        margin: 0
    },
    'h2': {
        '@media (max-width: 576px)': {
            fontSize: '1.25rem',
        }
    }
}

export const App =　() => {
    return(
        <>
            <Global styles={globalStyles} />
            <div>
                <Header/>
                <Main />
            </div>
        </>
    );
}