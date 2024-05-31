import { useStateContext } from "@/contexts/StateContext";
import Link from "next/link";
import styles from "./CartItems.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';

export default function CartItem() {
  const { cartItems, setCartItems } = useStateContext();

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
  const handleRemoveProduct = (productId) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.product_id !== productId
    );
    setCartItems(updatedCartItems);
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
      newCartItems.splice(index, 1);
    }
    setCartItems(newCartItems);
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
            <button onClick={() => handleRemoveProduct(item.product_id)}>
            <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      ))}
    </div>

    </section>

  );
}
