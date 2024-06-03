import Image from "next/image";
import styles from './SellProduct.module.css';
export default function ImageContainer() {
  return (
    <div className={styles.image_container}>
      <h2>Sell More, Earn More</h2>
      <Image src="/images/sell-online.png" height={500} width={500} />
    </div>
  );
}

