import { Button, Snackbar, Alert } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import styles from "./Products.module.css";
import { useState } from "react";
import Image from "next/image";
// import lipstick from '../../public/images/lipstick.jpeg';

export default function ProductCard({
  products,
  handleAddToCart,
  currentPage,
  totalPages,
  handlePageChange,
  cartItems,
  // setCartItems,
}) {
  const [notifications, setNotifications] = useState([]);
  const truncateTitle = (title, maxLength) => {
    if (typeof title !== 'string') {
      return ''; // or any default value you prefer
    }
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    }
    return title;
  };

  const handleCloseSnackbar = (id) => {
    // Remove notification from the queue
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  // console.log('checking for ', cartItems.some((item) => item.id === products.id));

  return (
    <div>
      <div className={styles.container} >
        {products.map((product) => {
          {/* console.log('inside the map',product.src); */}
          return (<div key={product.id} className={styles.productCard}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.productImage}
              height={150}
              width={150}
            />
            <h2 className={styles.productTitle}>
              {truncateTitle(product.title, 45)}
            </h2>
            <p>Rating: {product.rating.rate}</p>
            <p className={styles.productPrice}>Price: ${product.price}</p>
            <div className={styles.buttons}>
              <Button variant="contained" color="primary">
                <Link
                  href={`/product-details/${product.id}`}
                  className={styles.buttonLink}
                >
                  See details
                </Link>
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  handleAddToCart(product);
                  // Display notification
                  setNotifications([
                    { id: Date.now(), message: `${product.title} has been added to the cart` },
                    ...notifications
                  ]);
                }}
                disabled={cartItems.some((item) => item.id === product.id)}
                className={styles.addToCartButton}
              >
                {cartItems.some((item) => item.id === product.id)
                  ? "Into Cart"
                  : "Add to Cart"}
              </Button>
            </div>
          </div>
        )})}
      </div>
      {/* Pagination controls */}
      <div className={styles.pagination}>
        <Button
          onClick={() =>
            handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
          }
          disabled={currentPage === 1}
          className={styles.paginationButton}
          startIcon={<FontAwesomeIcon icon={faChevronLeft} />}
        >
          Previous
        </Button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            handlePageChange(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          }
          disabled={currentPage === totalPages}
          className={styles.paginationButton}
          endIcon={<FontAwesomeIcon icon={faChevronRight} />}
        >
          Next
        </Button>
      </div>
      {/* Snackbar for notifications */}
      <div className={styles.notificationContainer}>
        {notifications.map((notification) => (
          <Snackbar
            key={notification.id}
            open={true}
            autoHideDuration={3000}
            onClose={() => handleCloseSnackbar(notification.id)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            style={{ marginTop: "50px" }}
          >
            <Alert onClose={() => handleCloseSnackbar(notification.id)} severity="success" sx={{ width: '100%' }}>
              {notification.message}
            </Alert>
          </Snackbar>
        ))}
      </div>
    </div>
  );
}
