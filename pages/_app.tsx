import 'antd/dist/antd.css';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import { initJobs } from '../config/reducer/jobsSlice';
import { store, wrapper } from '../config/store';
import Layout from '../layout/Layout';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: any) {
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

MyApp.getInitialProps = wrapper.getInitialPageProps(({ dispatch }) => async () => {
  const res = await fetch(`http://localhost:3000/api/jobs`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();
  dispatch(initJobs(data));
});

export default wrapper.withRedux(MyApp);