
export default function fetchProductsFromFakeStoreApi() {
    return fetch('https://fakestoreapi.com/products')
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            throw error;
        });
}
