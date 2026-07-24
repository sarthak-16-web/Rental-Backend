import express from "express";
import cors from "cors";
import morgan from "morgan";
import adminRoutes from "./routes/adminRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import testimonialRoutes from "./routes/testinomalRoute.js";

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // your frontend's URL (adjust port if different)
  credentials: true // only needed if you're sending cookies/auth headers
}));     
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/admin", adminRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/project", projectRoutes);

app.use("/api/testimonial", testimonialRoutes);
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "RentalKing Backend Running 🚀",
    });
});

export default app;