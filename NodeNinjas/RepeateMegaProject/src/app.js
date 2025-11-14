import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes import
import helthCheckRoutes from "./routes/helthcheck.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/error.middlewares.js";

app.use("/api/v1/helthcheck", helthCheckRoutes);
app.use("/api/v1/auth", authRoutes);

app.use(errorHandler);

export default app;
