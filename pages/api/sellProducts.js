export const config = {
  api: {
      bodyParser: {
          sizeLimit: '10mb', // Adjust size limit as needed
      },
  },
};

import { connectToDatabase } from "@/utils/mongodb";

export default async function handler(req, res) {
  if (req.method === 'POST') {
      const data = req.body;

      try {
          console.log('Received product data:', data); 

          const { db } = await connectToDatabase();
          const collection = db.collection('products');
          
          // Insert product data into MongoDB
          const result = await collection.insertOne(data);
          console.log("Result: ", result)
          res.status(201).json({ message: 'Product added successfully', result });
      } catch (error) {
          console.error('Error inserting product into database:', error.message);
          res.status(500).json({ error: 'Error inserting product into database' });
      }
  } else {
      res.status(405).json({ error: 'Method not allowed' });
  }
}
