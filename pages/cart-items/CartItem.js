import { useStateContext } from "@/contexts/StateContext";
import Link from "next/link";
import styles from "./CartItems.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import { Snackbar, Alert } from "@mui/material";
import { useState } from "react";

export default function CartItem() {
  const { cartItems, setCartItems } = useStateContext();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessages, setSnackbarMessages] = useState([]);

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <p>You have not added anything to your cart.</p>
        <Link href="/" className={styles.homeButton}>
          Go back to home
        </Link>
      </div>
    );
  }

  const handleRemoveProduct = (productId, productName) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.product_id !== productId
    );
    setCartItems(updatedCartItems);
    const message = `${productName} has been removed from the cart`;
    setSnackbarMessages([...snackbarMessages, { message }]);
    setSnackbarOpen(true);
  };

  const handleIncreaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].product_quantity++;
    setCartItems(newCartItems);
  };

  const handleDecreaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].product_quantity > 1) {
      newCartItems[index].product_quantity--;
    } else {
      handleRemoveProduct(newCartItems[index].product_id, newCartItems[index].product_name);
      return;
    }
    setCartItems(newCartItems);
  };

  const handleCloseSnackbar = (index) => {
    setSnackbarOpen(false);
    // Optionally, remove the message from the snackbarMessages state after it's closed.
    // This depends on whether you want to keep the messages after they are shown.
    // setSnackbarMessages(snackbarMessages.filter((_, i) => i !== index));
  };

  return (
    <section>
      <div className={styles.cartContainer}>
        {cartItems.map((item, index) => (
          <div key={index} className={styles.cartItem}>
            <div className={styles.detailItem}>
              <div className={styles.product_name}>
                <Image
                  src={item.product_img}
                  alt={item.product_name}
                  className={styles.imageContainer}
                  width={100}
                  height={100}
                />
                <p>{item.product_name}</p>
              </div>
            </div>

            <div className={styles.detailItem}>
              <p>Quantity : </p>
              <button
                className={styles.quantityButton}
                onClick={() => handleDecreaseQuantity(index)}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <strong>{item.product_quantity}</strong>
              <button
                className={styles.quantityButton}
                onClick={() => handleIncreaseQuantity(index)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            <div className={styles.detailItem}>
              <p>Price :</p>
              <strong>
                ${(item.product_price * item.product_quantity).toFixed(2)}
              </strong>
            </div>

            <div className={styles.deleteItem}>
              <button onClick={() => handleRemoveProduct(item.product_id, item.product_name)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {snackbarMessages.map((message, index) => (
        <Snackbar
          key={index}
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => handleCloseSnackbar(index)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={() => handleCloseSnackbar(index)} severity="info" sx={{ width: '100%' }}>
            {message.message}
          </Alert>
        </Snackbar>
      ))}
    </section>
  );
}
