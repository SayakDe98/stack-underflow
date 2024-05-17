import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to Database.");
  } catch (error) {
    console.log("Failed to connect to database.");
    console.error((error as Error).message);
  }
};
