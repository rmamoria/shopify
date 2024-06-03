// pages/contact.js
import styles from './ContactPage.module.css';
import ContactForm from "./ContactForm"

const ContactPage = () => {
  return (
    <div className={styles.contactContainer}>
      <div className={styles.leftContent}>
        <h2 className={styles.title}>Contact Us</h2>
        <p className={styles.description}>
         <strong>Feel free</strong>  to reach out to us with any questions or concerns. We're here to help you!
        </p>
        <p className={styles.contactInfo}><strong>Email:</strong> support@example.com</p>
        <p className={styles.contactInfo}><strong>Phone:</strong> +1 (234) 567-8901</p>
        <p className={styles.contactInfo}><strong>Address:</strong> 123 Shopping St, Shop City, SH 45678</p>
      </div>
      <div className={styles.rightContent}>
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactPage;
