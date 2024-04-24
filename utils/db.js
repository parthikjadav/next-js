import mongoose from "mongoose";

let isConnected = false;

export const connect = async () => {
    mongoose.set("strictQuery", true);

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName:"next-js",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;
    } catch (error) {
        console.log(error);
    }
}