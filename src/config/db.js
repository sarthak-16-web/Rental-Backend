import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log("Connecting...");

        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log("✅ Connected");
        console.log(conn.connection.host);

    } catch (err) {
        console.log("FULL ERROR:");
        console.dir(err, { depth: null });
    }
};

export default connectDB;