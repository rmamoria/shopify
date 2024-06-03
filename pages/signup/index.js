// components/LoginPage.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from "./Login.module.css";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useStateContext } from '@/contexts/StateContext';
const LoginPage = () => {
    const {user, setUser, setLoggedIn} =useStateContext();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = (event) => {
    event.preventDefault();
    // Dummy check for username and password
    if (username === 'rahulmm' && password === '1234') {
       setUser(username)
      setLoggedIn(true);
      router.push('/');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.illustration}>
        <Image
          src="/images/loginpage.png"
          alt="Illustration"
          width={600}
          height={600}
        />
      </div>
      <div className={styles.loginForm}>
        <h2 className={styles.formTitle}>Welcome Back!</h2>
        <p className={styles.formText}>
          Don't have an account yet? <a href="#" className={styles.signupLink}>Sign Up</a>
        </p>
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>Username:</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Enter your username" 
              className={styles.inputField} 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password:</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter your password" 
              className={styles.inputField} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <div className={styles.rememberMe}>
            <div>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe" className={styles.rememberLabel}>Keep me logged in</label>
            </div>
            <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
          </div>
          <button type="submit" className={`${styles.submitButton} ${styles.loginButton}`}>Login</button>
          <div className={styles.socialLogin}>
            <p className={styles.socialText}>Or Sign Up with:</p>
            <div className={styles.socialIcons}>
              <FontAwesomeIcon icon={faGoogle} className={`${styles.socialIcon} ${styles.googleIcon}`} />
              <FontAwesomeIcon icon={faFacebook} className={`${styles.socialIcon} ${styles.facebookIcon}`} />
              <FontAwesomeIcon icon={faGithub} className={`${styles.socialIcon} ${styles.githubIcon}`} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
