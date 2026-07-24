import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

console.log("URI:", process.env.MONGODB_URI);

connectDB();

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});