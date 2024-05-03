/* eslint-disable import/no-extraneous-dependencies */
// import EventListeners from "@/components/EventListener/EventListener";
import EventListeners from "@/components/EventListener/EventListener";
import { checkWindow } from "@/lib/functions/_helpers.lib";
import { store } from "@/reduxtoolkit/store/store";
import "@/styles/global.scss";
import MuiThemeProvider from "@/themes/MuiThemeProvider";
import createEmotionCache from "@/themes/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

/**
 * It suppresses the useLayoutEffect warning when running in SSR mode
 */
function fixSSRLayout() {
  // suppress useLayoutEffect (and its warnings) when not running in a browser
  // hence when running in SSR mode
  if (!checkWindow()) {
    React.useLayoutEffect = () => {
      // console.log("layout effect")
    };
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // refetchOnMount: false,
      retry: 0
    }
  }
});

export interface CustomAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();
export default function CustomApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache
}: CustomAppProps) {
  fixSSRLayout();

  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={queryClient}>
          <CacheProvider value={emotionCache}>
            <MuiThemeProvider>
              <title>Sensible Health</title>
              <CssBaseline />
              <EventListeners />
              <Toaster richColors position="bottom-left" />
              <Component {...pageProps} />
            </MuiThemeProvider>
          </CacheProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </Provider>
  );
}

/* Getting the current user from the server and passing it to the client. */
CustomApp.getInitialProps = async (context: AppContext) => {
  // // const client = initializeApollo({ headers: context.ctx.req?.headers });

  // // resetServerContext();
  const appProps = await App.getInitialProps(context);
  // return { user: data?.authenticatedItem, ...appProps };

  return { ...appProps };
};
