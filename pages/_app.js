import "@/styles/globals.css";
import AppLayout from "@/Layout/AppLayout";
import { StateProvider } from '@/contexts/StateContext';
export default function App({ Component, pageProps }) {
  return (
    <StateProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </StateProvider>
  );
}
