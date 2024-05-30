
import Head from "next/head";
import styles from "./AppLayout.module.css";
import MainHeader from "@/components/Header/Header";
const AppLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MainHeader />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default AppLayout;
