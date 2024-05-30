// Hero.js

import React, { useState } from "react";
import styles from "./Hero.module.css"; 
import Image from "next/image";

const Hero = () => {
  const images = [
    "/images/iphone-1.jpg",
    "/images/iphone-2.jpg",
    "/images/iphone-3.jpg",
    "/images/iphone-4.jpg",
    "/images/iphone-5.jpg"
  ];

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className={styles.hero}>
       <div className={styles.textContainer}>
                <h1 className={styles.heading}>Purchase your <br /> favourite brand from Shopify</h1>
                <h2 className={styles.subHeading}>Exclusive offers on <br /> iPhone15</h2>
                <p className={styles.description}>Buy iPhone 15 with 15% discount</p>
                <button className={styles.shopNowButton}>Shop Now</button>
            </div>
      <div className={styles.imageContainer}>
        <div className={styles.slider}>
          <div>
            {" "}
            <button className={styles.arrowLeft} onClick={prevImage}>
              &lt;
            </button>
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src={images[currentImage]}
              alt={`iPhone ${currentImage + 1}`}
              width={400}
              height={400}
              objectFit="contain"
              layout="responsive"
              className={styles.item_image}
            />
          </div>
          <div>
            <button className={styles.arrowRight} onClick={nextImage}>
              &gt;
            </button>
          </div>
        </div>
        <button className={styles.shopNowButton}>Shop Now</button>
      </div>
    </section>
  );
};

export default Hero;
