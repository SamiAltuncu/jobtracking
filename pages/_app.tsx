import 'antd/dist/antd.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from '../config/store';
import Layout from '../layout/Layout';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <title>Kişisel İş Takip Uygulaması</title>
      </Head>
      <Layout>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Layout>
      <Toaster />
    </>
  )
}

export default MyApp;