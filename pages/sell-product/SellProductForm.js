import React, { useState } from 'react';
import styles from './SellProduct.module.css';

export default function SellProductForm({ onSubmit }) {
    const initialProductState = {
        title: '',
        category: '',
        price: '',
        description: '',
        rating: { rate: '', count: '' },
        image: ''
    };

    const [newProduct, setNewProduct] = useState(initialProductState);
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
                error = value.trim().length === 0 ? 'Title is required' : '';
                break;
            case 'category':
                error = value.trim().length === 0 ? 'Category is required' : '';
                break;
            case 'price':
                error = isNaN(value) || value.trim().length === 0 ? 'Price must be a number' : '';
                break;
            case 'rate':
                error = isNaN(value) || value.trim().length === 0 ? 'Rate must be a number' : '';
                break;
            case 'count':
                error = isNaN(value) || value.trim().length === 0 ? 'Count must be a number' : '';
                break;
            default:
                break;
        }
        setErrors({ ...errors, [name]: error });
        if (!error || value.trim().length === 0) {
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
    
        const newErrors = {
            title: newProduct.title.trim().length === 0 ? 'Title is required' : '',
            category: newProduct.category.trim().length === 0 ? 'Category is required' : '',
            price: isNaN(newProduct.price) || newProduct.price.trim().length === 0 ? 'Price must be a number' : '',
            description: newProduct.description.trim().length === 0 ? 'Description is required' : '',
            rate: isNaN(newProduct.rating.rate) || newProduct.rating.rate.trim().length === 0 ? 'Rate must be a number' : '',
            count: isNaN(newProduct.rating.count) || newProduct.rating.count.trim().length === 0 ? 'Count must be a number' : '',
            image: newProduct.image.trim().length === 0 ? 'Image is required' : ''
        };
    
        setErrors(newErrors);
    
        // Check if there are any errors
        const hasErrors = Object.values(newErrors).some(error => error !== '');
    
        if (hasErrors) {
            return;
        }
    
        const formData = new FormData();
        formData.append('title', newProduct.title);
        formData.append('category', newProduct.category);
        formData.append('price', newProduct.price);
        formData.append('description', newProduct.description);
        formData.append('rating[rate]', newProduct.rating.rate);
        formData.append('rating[count]', newProduct.rating.count);
        formData.append('image', e.target.image.files[0]);
    
        onSubmit(formData, () => {
            // Clear the form
            setNewProduct(initialProductState);
            setImagePreview('');
            setErrors(initialErrorsState);
        });
    };
    
    return (
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
            
            <div >
            <div className={` ${styles.formImage}`} >
            <div className={styles.imageInput}>
                <label htmlFor="image">Image:</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                />

            </div>
                <div>
                {imagePreview && <img src={imagePreview} alt="Image Preview" className={styles.imagePreview} width={100} />}

                </div>
                {errors.image && <span className={styles.error}>{errors.image}</span>}
            </div>
            <button type="submit" className={styles.submitButton}>Submit</button>
            
            </div>
        </form>
    );
}
