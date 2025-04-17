import mongoose from "mongoose";

export const DB_CONFIG = async () => {
  try {
    await mongoose.connect(process.env.DB_URI!);
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};
