export default async function fetchProductsFromFakeStoreApi() {
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}


