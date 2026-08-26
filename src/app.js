import "./env.js";

import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";       
import adminRoutes from "./routes/adminRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import testimonialRoutes from "./routes/testinomalRoute.js";
import contactRoutes from "./routes/contactRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import directorMessageRoutes from "./routes/directorMessageRoutes.js";
import partnerRoutes from "./routes/partnerRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());                         


app.use("/api/admin", adminRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/testimonial", testimonialRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/director-message", directorMessageRoutes);
app.use("/api/partner", partnerRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "RentalKing Backend Running 🚀" });
});

export default app;
