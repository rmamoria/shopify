import ProductCard from "@/components/products/ProductCard";
import { useEffect, useState } from "react";
import fetchProductsFromFakeStoreApi from "@/utils/fetchProductsApi";
import { useStateContext } from "@/contexts/StateContext";

export default function Products() {
  const { cartItems, setCartItems } = useStateContext();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  useEffect(() => {
    fetchProductsFromFakeStoreApi()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
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
          id: product.id,
          product_name: product.title,
          product_img: product.image,
          product_quantity: 1,
          product_price: product.price,
          total_price: product.price,
        },
      ];
      setCartItems(updatedCartItems);
    } else {
      // Product already in cart, handle accordingly (optional)
      console.log(`${product.title} is already in the cart.`);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate paginated products based on currentPage and pageSize
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = products.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(products.length / pageSize);

  return (
    <section>
      <h1 className="heading">Listing Products</h1>
      <ProductCard
        products={paginatedProducts}
        handleAddToCart={handleAddToCart}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </section>
  );
}
