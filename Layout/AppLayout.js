import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from './AppLayout.module.css';
import MainHeader from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const AppLayout = ({ children }) => {
  const router = useRouter();

  // Check if the current path is '/signup'
  const isSignupPage = router.pathname === '/signup';

  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      
      {!isSignupPage && <MainHeader />}
      
      <main className={styles.main}>{children}</main>
  
      {!isSignupPage && <Footer />}
    </div>
  );
};

export default AppLayout;
