import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import * as React from 'react';


interface IMyDocumentProps {

}

const MyDocument: React.FunctionComponent<IMyDocumentProps> = (props) => {
    return (
        <Html>
            <Head />
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous'/>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    />

                    <body>
                        <Main />
                        <NextScript />
                    </body>
                </Html>
                );
};

                export default MyDocument;