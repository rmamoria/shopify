import { useEffect, useState } from "react";
import styles from "./Products.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import fetchProductsFromFakeStoreApi from "@/utils/fetchProductsApi";
import Link from "next/link";

export default function ProductCard() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  useEffect(() => {
    fetchProductsFromFakeStoreApi()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    }
    return title;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate paginated products based on currentPage and pageSize
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = products.slice(startIndex, startIndex + pageSize);

  // Calculate total pages
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
            <p className={styles.productPrice}>Price: ${product.price}</p>
            <p className={styles.productRating}>
              Rating: {product.rating.rate} ({product.rating.count} reviews)
            </p>
            <div className={styles.buttons}>
              <button className={styles.button}>
                <Link
                  href={`/product-details/${product.id}`}
                  className={styles.buttonLink}
                >
                  See details
                </Link>
              </button>
              <button className={`${styles.button} ${styles.addToCartButton}`}>
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination controls */}
      <div className={styles.pagination}>
        <button
          onClick={() =>
            handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
          }
          disabled={currentPage === 1}
          className={styles.paginationButton}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            handlePageChange(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          }
          disabled={currentPage === totalPages}
          className={styles.paginationButton}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}
