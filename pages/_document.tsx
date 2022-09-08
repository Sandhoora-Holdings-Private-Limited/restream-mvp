import { Html, Head, Main, NextScript } from 'next/document'
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossOrigin="anonymous" />
        <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa"
        crossOrigin="anonymous"
      />
      <Script
        src="https://apis.google.com/js/api.js"
        crossOrigin="anonymous"
        strategy="beforeInteractive"
      />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}