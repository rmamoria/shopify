// Footer.js
import React from 'react';
import styles from './Footer.module.css';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faLinkedin,
  faFacebook,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.exclusive}>
          <h3 className={styles.heading}>Exclusive</h3>
          <p className={styles.subscribeText}>Subscribe</p>
          <p className={styles.offerText}>Get 10% off your first order</p>
          <div className={styles.subscribe}>
            <input className={styles.emailInput} type="email" placeholder="Enter your email" />
            <button className={styles.subscribeButton}>
              <span>&#10140;</span>
            </button>
          </div>
        </div>
        <div className={styles.support}>
          <h3 className={styles.heading}>Support</h3>
          <address className={styles.address}>
            111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
            <br />
            exclusive@gmail.com
            <br />
            +88015-88888-9999
          </address>
        </div>
        <div className={styles.account}>
          <h3 className={styles.heading}>Account</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>My Account</li>
            <li className={styles.listItem}>Login / Register</li>
            <li className={styles.listItem}>Cart</li>
            <li className={styles.listItem}>Wishlist</li>
            <li className={styles.listItem}>Shop</li>
          </ul>
        </div>
        <div className={styles.quickLink}>
          <h3 className={styles.heading}>Quick Link</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>Privacy Policy</li>
            <li className={styles.listItem}>Terms Of Use</li>
            <li className={styles.listItem}>FAQ</li>
            <li className={styles.listItem}>Contact</li>
          </ul>
        </div>
        <div className={styles.downloadApp}>
          <h3 className={styles.heading}>Download App</h3>
          <p className={styles.offerText}>Save $3 with App New User Only</p>
          <div className={styles.appLinks}>
            <Image src="/images/Qrcode-1.svg" alt="QR Code" width={100} height={100} />
            <div className={styles.storeLinks}>
              <Image src="/images/AppStore.svg" alt="App Store" width={150} height={50} />
              <Image src="/images/GooglePlay.svg" alt="Google Play" width={150} height={50} />
            </div>
          </div>
          <div className={styles.socialLinks}>
            <FontAwesomeIcon icon={faFacebook} className={styles.socialIcon} />
            <FontAwesomeIcon icon={faTwitter} className={styles.socialIcon} />
            <FontAwesomeIcon icon={faInstagram} className={styles.socialIcon} />
            <FontAwesomeIcon icon={faLinkedin} className={styles.socialIcon} />
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        &copy; Copyright Rimel 2024. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
