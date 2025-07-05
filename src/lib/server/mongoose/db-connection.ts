import mngoose from "mongoose";

const dbConnection = async () => {
  const uri: string =
    process.env.MONGODB_URI || "mongodb://localhost:27017/test";
  try {
    await mngoose.connect(uri);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};

export default dbConnection;
