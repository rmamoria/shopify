import { useEffect, useState } from "react";
import styles from "./Products.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import fetchProductsFromFakeStoreApi from "@/utils/fetchProductsApi";
import Link from "next/link";
import { useStateContext } from "@/contexts/StateContext";
import { Button, Snackbar, Alert } from "@mui/material";

export default function ProductCard() {
  const { cartItems, setCartItems } = useStateContext();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [addedToCart, setAddedToCart] = useState({});
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchProductsFromFakeStoreApi()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    // Initialize addedToCart based on existing cartItems
    const initialAddedToCart = {};
    cartItems.forEach(item => {
      initialAddedToCart[item.product_id] = true;
    });
    setAddedToCart(initialAddedToCart);
  }, [cartItems]);

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    }
    return title;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddToCart = (product) => {
    // Check if product is already in cart
    const alreadyInCart = cartItems.some(item => item.product_id === product.id);

    if (!alreadyInCart) {
      // Add product to cart
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

      // Mark as added to cart for notification purposes
      setAddedToCart((prevState) => ({
        ...prevState,
        [product.id]: true
      }));

      // Add notification to the top of the queue
      setNotifications([
        { id: Date.now(), message: `${product.title} has been added to the cart` },
        ...notifications
      ]);
    } else {
      // Product already in cart, handle accordingly (optional)
      console.log(`${product.title} is already in the cart.`);
    }
  };

  const handleCloseSnackbar = (id) => {
    // Remove notification from the queue
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = products.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(products.length / pageSize);

  return (
    <div>
      <div className={styles.container}>
        {paginatedProducts.map((product) => (
          <div key={product.id} className={styles.productCard}>
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
            <p> Rating: {product.rating.rate}</p>
            <p className={styles.productPrice}>Price: ${product.price}</p>
            <div className={styles.buttons}>
              <Button variant="contained" color="primary">
                <Link href={`/product-details/${product.id}`} className={styles.buttonLink}>
                  See details
                </Link>
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleAddToCart(product)}
                disabled={addedToCart[product.id]}
                className={styles.addToCartButton}
              >
              Add to cart
                {/* {addedToCart[product.id] ? 'Added to Cart' : 'Add to Cart'} */}
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination controls */}
      <div className={styles.pagination}>
        <Button
          onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
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
          onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
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
            style={{marginTop:"50px"}}
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
