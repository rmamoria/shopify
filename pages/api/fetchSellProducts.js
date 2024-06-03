// fetchSellProducts.js

import { connectToDatabase } from "@/utils/mongodb"; // Adjust path as per your project structure

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { db } = await connectToDatabase();
            const collection = db.collection('products');

            // Fetch all products from MongoDB
            const dbProducts = await collection.find({}).toArray();
             console.log("DB Products, ", dbProducts)
            res.status(200).json(dbProducts);
        } catch (error) {
            console.error('Error fetching products from database:', error.message);
            res.status(500).json({ error: 'Error fetching products from database' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
