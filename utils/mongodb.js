import { MongoClient } from 'mongodb';

// const uri = "mongodb+srv://rahul903:A54KhWEDYn3MMr82@cluster0.htw6gd9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedClient = null;

export async function connectToDatabase() {
    if (cachedClient) {
        return { client: cachedClient, db: cachedClient.db() };
    }

    const client = new MongoClient(uri);

    try {
        await client.connect();
        cachedClient = client;
        console.log("Connected to MongoDB");
        return { client, db: client.db() };
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        throw new Error('Could not connect to MongoDB');
    }
}
