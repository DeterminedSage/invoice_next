import mongoose from "mongoose";

const dbConnection = async () => {
  const uri: string =
    process.env.MONGO_URI || "mongodb://localhost:27017/test";
  try {
    await mongoose.connect(uri);
    console.log(uri);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};

export default dbConnection;
