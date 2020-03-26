/** @jsx jsx */
import { jsx, Global } from "@emotion/core";
import { Main } from './Main';
import { Header } from "./Header";

export const App =　() => {
    return(
        <>
            <Global styles={{'body': { margin: 0}}} />
            <div>
                <Header/>
                <Main />
            </div>
        </>
    );
}