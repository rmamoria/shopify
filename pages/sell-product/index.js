import React, { useState } from 'react';
import styles from './SellProduct.module.css';

export default function SellProduct() {
    const [newProduct, setNewProduct] = useState({
        title: '',
        category: '',
        price: '',
        description: '',
        rating: { rate: '', count: '' },
        image: ''
    });

    const [imagePreview, setImagePreview] = useState('');
    const [errors, setErrors] = useState({
        title: '',
        category: '',
        price: '',
        description: '',
        rate: '',
        count: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let error = '';
        switch (name) {
            case 'title':
                error = value.length < 1 ? 'Title is required' : '';
                break;
            case 'category':
                error = value.length < 1 ? 'Category is required' : '';
                break;
            case 'price':
                error = isNaN(value) ? 'Price must be a number' : '';
                break;
            case 'rate':
                error = isNaN(value) ? 'Rate must be a number' : '';
                break;
            case 'count':
                error = isNaN(value) ? 'Count must be a number' : '';
                break;
            default:
                break;
        }
        setErrors({ ...errors, [name]: error });
        if (!error) {
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
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProduct({
                    ...newProduct,
                    image: file.name
                });
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setNewProduct({ ...newProduct, image: '' });
            setImagePreview('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formValid = true;
        const newErrors = { ...errors };

        Object.keys(newProduct).forEach((key) => {
            if (key !== 'rating' && newProduct[key] === '') {
                newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
                formValid = false;
            }
        });

        if (newProduct.rating.rate === '' || newProduct.rating.count === '') {
            newErrors.rate = 'Rate is required';
            newErrors.count = 'Count is required';
            formValid = false;
        }

        if (newProduct.image === '') {
            newErrors.image = 'Image is required';
            formValid = false;
        }

        setErrors(newErrors);

        if (formValid) {
            try {
                const response = await fetch('/api/sellProducts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newProduct),
                });

                if (!response.ok) {
                    throw new Error('Error submitting product');
                }

                const data = await response.json();
                console.log('Product submitted:', data);

            } catch (error) {
                console.error('Error:', error.message);
            }
        }
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
                    {errors.title && <span className={styles.error}>{errors.title}</span>}
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
                    {errors.category && <span className={styles.error}>{errors.category}</span>}
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
                    {errors.price && <span className={styles.error}>{errors.price}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={newProduct.description}
                        onChange={handleChange}
                    />
                    {errors.description && <span className={styles.error}>{errors.description}</span>}
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
                    {errors.rate && <span className={styles.error}>{errors.rate}</span>}
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
                    {errors.count && <span className={styles.error}>{errors.count}</span>}
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
                    {errors.image && <span className={styles.error}>{errors.image}</span>}
                    {imagePreview && <img src={imagePreview} alt="Image Preview" className={styles.imagePreview} />}
                </div>
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
        </section>
    );
}
