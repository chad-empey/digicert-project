import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { GlobalState } from "../components/useGlobalState";
import theme from "../styles/theme";
import "../styles/globals.css";

const SideBar = dynamic(import("../components/SideBar"));

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <GlobalState>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>Digicert Project - Chad Empey</title>
      </Head>
      <ThemeProvider theme={theme}>
        <SideBar>
          <CssBaseline />
          <Component {...pageProps} />
        </SideBar>
      </ThemeProvider>
    </GlobalState>
  );
}

export default MyApp;
