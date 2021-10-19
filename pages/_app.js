import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import Head from 'next/head';
import { GlobalContextProvider } from '../context/context';

function MyApp({ Component, pageProps }) {
  return(
      <GlobalContextProvider>
        <Head>
            <title>tabtracker</title>
            <meta property="viewport" content="width=device-width, initial-scale=1" />
            <meta property="og:url" content="www.tabtracker.com" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="tabtracker" />
            <meta property="name" content="tabtracker" />
            <meta property="description" content="Crazy about guitar ? Track guitar tab of your most favourite songs" />
            <meta property="og:image" content={"/images/guitar.jpg"}  />
            <meta property="author" content="Ayubur Rahaman" />
        </Head>
        <Component {...pageProps} />
      </GlobalContextProvider>
  )
}

export default MyApp
