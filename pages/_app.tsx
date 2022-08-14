import { useState } from "react";
import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ThemeProvider, DefaultTheme } from "styled-components";

import GlobalStyle from "../components/globalstyles";

const theme: DefaultTheme = {
  colors: {
    primary: "#111",
    secondary: "#0070f3",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Hydrate state={pageProps.dehydratedState}>
            <GlobalStyle />
            <Component {...pageProps} />
          </Hydrate>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
