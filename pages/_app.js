import "@/styles/globals.css";
import AppLayout from "@/Layout/AppLayout";
export default function App({ Component, pageProps }) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}
