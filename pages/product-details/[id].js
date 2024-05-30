// pages/product-details/[id].js

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { Spin } from "antd";
export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((error) =>
          console.error("Error fetching product details:", error)
        );
    }
  }, [id]);

  if (!product) {
    return (
      <div className={styles.loading}>
        <Spin size="large" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <img
        src={product.image}
        alt={product.title}
        className={styles.productImage}
      />
      <div className={styles.productDetails}>
        <h1 className={styles.productTitle}>{product.title}</h1>
        <p className={styles.productCategory}>Category: {product.category}</p>
        <p className={styles.productDescription}>
          Description: {product.description}
        </p>
        <p className={styles.productPrice}>Price: ${product.price}</p>
        <p className={styles.productRating}>
          Rating: {product.rating.rate} ({product.rating.count} reviews)
        </p>
        <div className={styles.buttonContainer}>
          <div className={styles.button_options}>
            <button className={styles.button}>Add to cart</button>
            <button className={styles.button}>Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
}
