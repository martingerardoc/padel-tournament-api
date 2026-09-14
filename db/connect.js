import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

let database;

export const initDb = async () => {
  try {
    await client.connect();

    database = client.db(process.env.DB_NAME);

    console.log("MongoDB connected successfully");

    return database;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export const getDb = () => {
  if (!database) {
    throw new Error("Database is not initialized.");
  }

  return database;
};