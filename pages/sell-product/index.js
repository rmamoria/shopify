import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  CircularProgress
} from "@mui/material";
import styles from "./SellProduct.module.css";
import SellProductForm from "./SellProductForm";
import ImageContainer from "./ImageContainer";
import Link from "next/link";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4
};

export default function SellProduct() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (formData, clearForm) => {
    setSubmitting(true);
    setOpen(true);

    try {
      const response = await fetch("/api/sellProducts", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Error submitting product");
      }

      const data = await response.json();
      console.log("Product submitted:", data);

      clearForm(); // Clear the form fields

      setSubmitting(false);
    } catch (error) {
      console.error("Error:", error.message);
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.sellProductSection}>
      <h2 className="heading">Sell Your Product</h2>
      <div className={styles.sellSection}>
        <ImageContainer />
        <SellProductForm onSubmit={handleSubmit} />
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            {submitting ? "Submitting..." : "Your product has been added!"}
          </Typography>
          {!submitting && (
            <>
              <Typography sx={{ mt: 2 }}>
                Go to home, newly added section.
              </Typography>
              <Button component={Link} href="/" sx={{ mt: 2, mr: 2 }}>
                Go Home
              </Button>
              <Button onClick={() => setOpen(false)} sx={{ mt: 2 }}>
                Close
              </Button>
            </>
          )}
          {submitting && <CircularProgress />}
        </Box>
      </Modal>
    </section>
  );
}
