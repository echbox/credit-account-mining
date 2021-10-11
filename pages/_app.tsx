import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { wrapper } from 'redux/store';
import theme from 'styles/theme';
import 'components/TerminalLib/styles.scss';

const GearboxTerminal: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
);

export default wrapper.withRedux(GearboxTerminal);
