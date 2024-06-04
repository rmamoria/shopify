import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from './AppLayout.module.css';
import MainHeader from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { useSession } from 'next-auth/react';

const AppLayout = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoginPage = router.pathname === '/login';

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session && !isLoginPage) {
    router.push("/login");
    return null;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      
      {!isLoginPage && <MainHeader />}
      
      <main className={styles.main}>{children}</main>
  
      {!isLoginPage && <Footer />}
    </div>
  );
};

export default AppLayout;
