export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb', // Adjust size limit as needed
        },
    },
  };
  
  import { connectToDatabase } from "@/utils/mongodb";
  
  function generateUniqueId() {
    // Generate a random 6-digit number
    return Math.floor(100000000 + Math.random() * 900000).toString();
  }
  
  export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
  
        try {
            console.log('Received product data:', data); 
  
            const { db } = await connectToDatabase();
            const collection = db.collection('products');
  
            // Generate a unique 6-digit ID
            const uniqueId = generateUniqueId();
  
            // Add the unique ID to the product data
            data.productId = uniqueId;
            
            // Insert product data into MongoDB
            const result = await collection.insertOne(data);
            console.log("Result: ", data);
            res.status(201).json({ message: 'Product added successfully', result });
        } catch (error) {
            console.error('Error inserting product into database:', error.message);
            res.status(500).json({ error: 'Error inserting product into database' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
  }
  