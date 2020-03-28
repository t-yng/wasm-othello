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
                {/* Global site tag (gtag.js) - Google Analytics */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-57390966-5"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html:`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());

                            gtag('config', 'UA-57390966-5', {
                                page_path: window.location.pathname,
                            });
                        `
                    }}
                />
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