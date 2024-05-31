// pages/product-details/[id].js

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
// import { Spin } from "antd";
import { CircularProgress, Button } from "@mui/material";
import { useStateContext } from "@/contexts/StateContext";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const { cartItems, setCartItems } = useStateContext();
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setAddedToCart(cartItems.some(item => item.product_id === data.id));
        })
        .catch((error) =>
          console.error("Error fetching product details:", error)
        );
    }
  }, [id, cartItems]);

  const handleAddToCart = () => {
    if (!product) return;
    const updatedCartItems = [
      ...cartItems,
      {
        product_id: product.id,
        product_name: product.title,
        product_img: product.image,
        product_quantity: 1,
        product_price: product.price
      }
    ];
    setCartItems(updatedCartItems);
    setAddedToCart(true);
  };

  if (!product) {
    return (
      <div className={styles.loading}>
   <CircularProgress size={50}/>
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
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddToCart}
              disabled={addedToCart}
            >
              {addedToCart ? "Added to cart" : "Add to cart"}
            </Button>
            <Button
              variant="contained"
              color="primary"
            >
              Buy Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
