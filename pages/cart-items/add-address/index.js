import React, { useState } from "react";
import styles from "./AddAddress.module.css";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import { useStateContext } from "@/contexts/StateContext";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddAddress() {
  const { cartItems } = useStateContext();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [open, setOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Handle payment form submission
    setOrderPlaced(true);
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <section className={styles.container}>
      <div className={styles.addressForm}>
        <h1>Choose Your Address</h1>
        <div>
          {addresses.length > 0 && (
            <RadioGroup value={selectedAddress} onChange={handleAddressSelection}>
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
                  <Image src={item.product_img} alt="" width={40} height={40} />
                  <p>{item.product_name}</p>
                </td>
                <td>{item.product_quantity}</td>
                <td>${item.total_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.buttons}>
          <button className={styles.proceedButton} onClick={handleOpen}>
            Proceed to Payment
          </button>
        </div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          {!orderPlaced ? (
            <>
              <h2>Payment Details</h2>
              <form onSubmit={handlePaymentSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="cardNumber"
                  label="Card Number"
                  name="cardNumber"
                  autoComplete="cc-number"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="cardName"
                  label="Name on Card"
                  id="cardName"
                  autoComplete="cc-name"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="expiryDate"
                  label="Expiry Date (MM/YY)"
                  id="expiryDate"
                  autoComplete="cc-exp"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="cvv"
                  label="CVV"
                  id="cvv"
                  autoComplete="cc-csc"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit Payment
                </Button>
              </form>
            </>
          ) : (
            <Box textAlign="center">
              <h2>Your Order Has Been Placed</h2>
              <Button
                onClick={handleGoHome}
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Go to Home
              </Button>
              <p>Keep happily shopping!</p>
            </Box>
          )}
        </Box>
      </Modal>
    </section>
  );
}
