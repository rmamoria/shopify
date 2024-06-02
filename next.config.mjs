// next.config.js

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['fakestoreapi.com'], // Add your image domains here
    },
    api: {
        bodyParser: {
            sizeLimit: '10mb', // Increase limit as needed
        },
    },
};

export default nextConfig;
