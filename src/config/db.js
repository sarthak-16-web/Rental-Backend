import mongoose from "mongoose";

const connectDB = async () => {
    console.log("Connecting...");

    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ Connected");
    console.log(conn.connection.host);
};

export default connectDB;