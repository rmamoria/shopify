import React from 'react';
import Section from './Section';
import styles from './AboutPage.module.css';
import sections from './about-data';

const AboutPage = () => {
  return (
    <section className={styles.aboutPage}>
      <div className={styles.sections}>
        {sections.map((section, index) => (
          <Section key={index} {...section} />
        ))}
      </div>
    </section>
  );
};

export default AboutPage;
