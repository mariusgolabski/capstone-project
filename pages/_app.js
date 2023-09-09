import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/layout";
import GlobalStyle from "../styles";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ session, Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <SWRConfig value={{ fetcher }}>
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </SWRConfig>
      </Layout>
    </>
  );
}
