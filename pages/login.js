'use client'
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useStateContext } from "@/contexts/StateContext";
import Head from "next/head";
import { Button } from "@mui/material";
import styles from "./login.module.css";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const { setLoggedIn } = useStateContext();
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session) {
      setLoggedIn(true);
      router.push("/");
    }
  }, [session, router, setLoggedIn]);

  const handleLogin = () => {
    const validUsername = process.env.NEXT_PUBLIC_USER_NAME;
    const validPassword = process.env.NEXT_PUBLIC_PASSWORD;
    console.log(validUsername,validPassword )

    if (username === validUsername && password === validPassword) {
      router.push("/");
      setLoggedIn(true);
      console.log('inside router.push');
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <>
      <Head>
        <title>Login to continue...</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.notLoggedIn}>
          <h1 className={styles.title}>
            Welcome to <strong>Shopify</strong>
          </h1>
          <p className={styles.description}>
            Unlock a world of personalized experiences and seamless access by
            signing in with your account.
          </p>
          <div className={styles.signInContainer}>
            <div className={styles.inputGroup}>
              <div className={styles.inputContainer}>
                <label htmlFor="">Enter username: </label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.inputField}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="">Enter Password: </label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.inputField}
                />
              </div>
              <div>
                <Button
                  className={styles.providerButtons}
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </div>++
              {error && <p className={styles.errorMsg}>{error}</p>}
            </div>
            <hr className={styles.hr_line} />
            <div className={styles.providerButtons}>
              <button
                onClick={() => signIn("google")}
                className={styles.signInBtn}
              >
                Sign In with Google
              </button>
              <button
                onClick={() => signIn("facebook")}
                className={styles.signInBtn}
              >
                Sign In with Facebook
              </button>
              <button
                onClick={() => signIn("github")}
                className={styles.signInBtn}
              >
                Sign In with GitHub
              </button>
            </div>
            <p className={styles.signInInfo}>
              We respect your privacy. Your information is secure and will not
              be shared with any third parties.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
