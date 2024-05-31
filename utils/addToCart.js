// addToCart.js

const addToCart = (cartItems, setCartItems, product) => {
    const updatedCartItems = [
      ...cartItems,
      {
        product_id: product.id,
        product_name: product.title,
        product_img: product.image,
        product_quantity: 1,
        product_price: product.price
      }
    ];
    setCartItems(updatedCartItems);
  };
  
  export default addToCart;
  