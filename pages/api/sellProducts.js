import { connectToDatabase } from "@/utils/mongodb";
import multer from 'multer';
import path from 'path';

function generateUniqueId() {
    // Generate a random 6-digit number
    return Math.floor(100000000 + Math.random() * 900000).toString();
}

// Multer configuration
const upload = multer({
    storage: multer.diskStorage({
        destination: path.join(process.cwd(), 'public/images'), // Directory where uploaded files are saved
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed.'));
        }
    }
});

export const config = {
    api: {
        bodyParser: false, // Disable body parsing, since we're using multer
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        upload.single('image')(req, res, async (err) => {
            if (err) {
                console.error('Error uploading file:', err);
                return res.status(500).json({ error: 'Error uploading file' });
            }

            const { db } = await connectToDatabase();
            const collection = db.collection('products');
            
            const data = { ...req.body };
            console.log(data);
            // Add the unique ID to the product data
            const uniqueId = generateUniqueId();
            data.productId = uniqueId;

            // Handle image file
            if (req.file) {
                data.image = `/images/${req.file.filename}`; // Save path to database
            }

            try {
                // Insert product data into MongoDB
                const result = await collection.insertOne(data);
                console.log("Result: ", data);
                res.status(201).json({ message: 'Product added successfully', result });
            } catch (error) {
                console.error('Error inserting product into database:', error.message);
                res.status(500).json({ error: 'Error inserting product into database' });
            }
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
