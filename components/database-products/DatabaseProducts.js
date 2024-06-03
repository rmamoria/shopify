import { useEffect, useState } from 'react';
import ProductCard from '../products/ProductCard';
import { useStateContext } from '@/contexts/StateContext';

const DatabaseProducts = () => {

    const {cartItems, setCartItems}= useStateContext();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
    useEffect(() => {
        fetch('/api/fetchSellProducts')
            .then(response => response.json())
            .then(data => {
                setProducts(data.map((current)=>({...current, id:+current.productId}))); 
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleAddToCart = (product) => {
        // Check if product is already in cart
        const alreadyInCart = cartItems.some((item) => item.id === product.id);
    
        if (!alreadyInCart) {
          // Add product to cart
          const updatedCartItems = [
            ...cartItems,
            {
            id: +product.productId,
              product_name: product.title,
              product_img: product.image,
              product_quantity: 1,
              product_price: product.price,
              total_price: product.price,
            },
          ];
          console.log('cartItems', updatedCartItems);
          setCartItems(updatedCartItems);
        } else {
          // Product already in cart, handle accordingly (optional)
          console.log(`${product.title} is already in the cart.`);
        }
      };
    
      const handlePageChange = (page) => {
        setCurrentPage(page);
      };
      const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = products.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(products.length / pageSize);

    return (
        <section>
          {
            products.length>0 && <>
            <h2 className='heading'>Newly Added Products</h2>
            <ProductCard
                products={paginatedProducts}
                handleAddToCart={handleAddToCart} // Replace with actual addToCart function
                currentPage={currentPage} 
                totalPages={totalPages} 
                handlePageChange={handlePageChange} // Replace with actual page change function
                cartItems={cartItems} 
                setCartItems={setCartItems}
            />
            </>
          }
           
        </section>
    );
};

export default DatabaseProducts;