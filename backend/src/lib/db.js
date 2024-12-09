import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL);
    console.log("MONGODB CONNECTED✅");
  } catch (error) {
    console.log("ERROR IN CONNECTING MONGODB: ", error.message);
  }
};

export default connectDB;
