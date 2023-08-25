import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#000',
          borderRadius: 6,

          // Alias Token
          colorBgContainer: '#fff',
        },
      }}
    >
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

export default MyApp;
