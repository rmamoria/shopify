import React from 'react';
import styles from "./AboutPage.module.css"

const Section = ({ title, content, cards }) => {
  return (
    <div className={styles.section}>

      <div className={styles.sectionContent}>
        <h2>{title}</h2>
        <p>{content}</p>

        <div className={styles.subSections}>
          {cards.map((card, index) => (
            <div key={index} className={styles.subSection}>
              <div className={styles.subSectionImage}>
                <img src={card.image} alt={card.title} />
              </div>
              <div className={styles.subSectionContent}>
                <h3>{card.title}</h3>
                <p>{card.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section;
