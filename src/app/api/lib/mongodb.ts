import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI || "");

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    console.log("Connecting to MongoDB in development mode...");
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  console.log("Connecting to MongoDB in production mode...");
  clientPromise = client.connect();
}

clientPromise
  .then(() => console.log("MongoDB connected successfully."))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

export default clientPromise;
