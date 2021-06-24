import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script data-webpack="app1" src="http://localhost:3000/_next/static/chunks/remoteEntry.js" />
          <script data-webpack="appvue" src="http://localhost:8080/remoteEntry.js" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
