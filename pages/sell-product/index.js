import React, { useState } from 'react';
import styles from './SellProduct.module.css';

export default function SellProduct() {
    const [newProduct, setNewProduct] = useState({
        title: '',
        category: '',
        price: '',
        description: '',
        rating: { rate: '', count: '' },
        image: '',
        imageData: ''
 
    });

    const [imagePreview, setImagePreview] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'rate' || name === 'count') {
            setNewProduct({
                ...newProduct,
                rating: {
                    ...newProduct.rating,
                    [name]: value
                }
            });
        } else {
            setNewProduct({
                ...newProduct,
                [name]: value
            });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProduct({ 
                    ...newProduct, 
                    image: file.name,
                    imageData: reader.result 
                });
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setNewProduct({ ...newProduct, image: '', imageData: '' });
            setImagePreview('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Product submitted:', newProduct);
    };

    return (
        <section className={styles.sellProductSection}>
            <h2>Sell Your Product</h2>
            <form onSubmit={handleSubmit} className={styles.productForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Title:</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        value={newProduct.title} 
                        onChange={handleChange} 
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="category">Category:</label>
                    <input 
                        type="text" 
                        id="category" 
                        name="category" 
                        value={newProduct.category} 
                        onChange={handleChange} 
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="price">Price:</label>
                    <input 
                        type="text" 
                        id="price" 
                        name="price" 
                        value={newProduct.price} 
                        onChange={handleChange} 
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">Description:</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        value={newProduct.description} 
                        onChange={handleChange} 
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="rate">Rating (Rate):</label>
                    <input 
                        type="text" 
                        id="rate" 
                        name="rate" 
                        value={newProduct.rating.rate} 
                        onChange={handleChange} 
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="count">Rating (Count):</label>
                    <input 
                        type="text" 
                        id="count" 
                        name="count" 
                        value={newProduct.rating.count} 
                        onChange={handleChange} 
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="image">Image:</label>
                    <input 
                        type="file" 
                        id="image" 
                        name="image" 
                        accept="image/*"
                        onChange={handleImageChange} 
                    />
                    {imagePreview && <img src={imagePreview} alt="Image Preview" className={styles.imagePreview} />}
                </div>
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
        </section>
    );
}
