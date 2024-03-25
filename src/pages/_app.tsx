import useVIP from "@/_v1/hooks/useVIP";
import "@/styles/globals.css";
import { AppLayout } from "@/components";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Inter } from "next/font/google";

import { LoaderMeducate } from "@/components/loader";
import store from "@/store";
import {
  Hydrate,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import "react-loading-skeleton/dist/skeleton.css";
import { Provider } from "react-redux";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 600000,
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
  queryCache: new QueryCache(),
});
const TopProgressBar = dynamic(
  () => {
    return import("@/_v1/common/TopProgressBar");
  },
  { ssr: false }
);
const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
export default function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
  dehydratedState: any;
}>) {
  const { isVIP } = useVIP();

  return (
    <>
      <style jsx global>{`
        html * {
          font-family: ${inter.style.fontFamily} !important;
        }
      `}</style>
      <Head>
        <title>
          Meducate • Bienvenue à l&apos;Académie du Médicament Meducate : Votre
          Source de Connaissances Médicales
        </title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta
          name="description"
          content="Aide pharmacien Étudiant en médecine Étudiant en pharmacie Étudiant Technique
           Infirmières Infirmier(ère) Médecin Parents de patient Patient Pharmacien officine Pharmacien 
           hospitalierProfessionnel de l'Industrie Pharmaceutique Cadre en structure sanitaire Sage femme"
        ></meta>
        <link rel="icon" type="image/png" href="/assets/favicon.png"></link>
      </Head>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps?.dehydratedState}>
            <MantineProvider>
              <Notifications
                position={"top-right"}
                className={isVIP ? "mantine-dark" : ""}
              />
              <SessionProvider session={pageProps.session} refetchInterval={0}>
                <TopProgressBar />
                {process.env.NODE_ENV === "production" && <LoaderMeducate />}
                <AppLayout>
                  <Component {...pageProps} />
                </AppLayout>
              </SessionProvider>
            </MantineProvider>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
        </QueryClientProvider>
      </Provider>
    </>
  );
}
