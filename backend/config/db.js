

import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose
        .connect(process.env.MONGODB_URL, {
            timeoutMS: 10000,
        })
        .then((resolve) => console.log("DB connected successifuly"))
        .catch((error) => console.log("error on connecting the DB", error));
};