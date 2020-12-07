import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import React from 'react';
import { createClient, Provider } from 'urql';
import { SERVER_URL } from '../secret';
import theme from '../theme';
import '../css/main.css'

const client = createClient({
  url: SERVER_URL,
  fetchOptions: { credentials: 'include' },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
