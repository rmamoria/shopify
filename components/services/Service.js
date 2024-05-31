import React from "react";
import styles from "./Service.module.css"; // Adjust the path as needed

const Service = ({ imgPath, title, description }) => {
  return (
    <div className={styles.service}>
      <img src={imgPath} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Service;
