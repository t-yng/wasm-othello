import React from 'react';
import Document, { Head, Main, NextScript, DocumentContext } from 'next/document';
import { extractStyles } from 'evergreen-ui';

type DocumentProps = {
    css: string;
    hydrationScript: JSX.Element;
}

export default class MyDocument extends Document<DocumentProps> {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        const { css, hydrationScript } = extractStyles();

        return {
            ...initialProps,
              css,
              hydrationScript,
        };
    }

    render() {
        const { css, hydrationScript } = this.props;

        return (
          <html>
            <Head>
              <style dangerouslySetInnerHTML={{ __html: css }} />
            </Head>

            <body>
              <Main />
              {hydrationScript}
              <NextScript />
            </body>
          </html>
        );
    }

}