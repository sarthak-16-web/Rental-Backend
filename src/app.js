import express from "express";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";

import adminRoutes from "./routes/adminRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import testimonialRoutes from "./routes/testinomalRoute.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET ,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 5, // 5 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  })
);

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
