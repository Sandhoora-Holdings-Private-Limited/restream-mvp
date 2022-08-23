import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import Script from "next/script";
import Layout from '../libs/components/layout';

// Use the <SessionProvider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa"
        crossOrigin="anonymous"
      />


    <SessionProvider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      session={pageProps.session}
    >
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </SessionProvider>
  </>
  )
}


export default MyApp
