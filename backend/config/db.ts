import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  await mongoose
    .connect(process.env.MONGODB_URL as string, { timeoutMS: 10000 })
    .then(() => console.log("DB connected successfully"))
    .catch((error) => console.log("error on connecting the DB", error));
};
