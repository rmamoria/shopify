import React, { useState } from "react";
import styles from "./AddAddress.module.css";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import { useStateContext } from "@/contexts/StateContext";
import Image from "next/image";
export default function AddAddress() {
  const { cartItems } = useStateContext();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: ""
  });

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddresses([...addresses, formData]);
    setFormData({ name: "", phone: "", address: "", pincode: "" });
  };

  const handleAddressSelection = (event) => {
    setSelectedAddress(event.target.value);
  };

  return (
    <section className={styles.container}>
      <div className={styles.addressForm}>
        <h1>Choose Your Address</h1>
        <div>
          {addresses.length > 0 && (
            <RadioGroup
              value={selectedAddress}
              onChange={handleAddressSelection}
            >
              {addresses.map((addr, index) => (
                <div key={index} className={styles.addressItem}>
                  <FormControlLabel
                    value={index.toString()}
                    control={<Radio />}
                    label={`${addr.name}, ${addr.phone}, ${addr.address}, ${addr.pincode}`}
                  />
                </div>
              ))}
            </RadioGroup>
          )}
        </div>
        <h2>Address Form</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="pincode">Pincode:</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>

      <div className={styles.selectedItems}>
        <h2>Selected Items</h2>
        <table className={styles.itemsTable}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td className={styles.product_name}>
                  {" "}
                  <Image src={item.product_img} alt="" width={40} height={40} />
                  <p>  {item.product_name}</p>
                
                </td>
                <td>{item.product_quantity}</td>
                <td>${item.total_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.buttons}>
          <button className={styles.proceedButton}>Proceed to Payment</button>
        </div>
      </div>
    </section>
  );
}
