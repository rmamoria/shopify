import "@/styles/globals.css";
import AppLayout from "@/Layout/AppLayout";
import { StateProvider } from '@/contexts/StateContext';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StateProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </StateProvider>
    </SessionProvider>
  );
}