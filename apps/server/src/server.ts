import express, { Express } from "express";
import { authRouter } from "./auth-service/routes/routes";
import { apiRouter } from "./api-service/routes/routes";
import { usageRouter } from "./usage-service/routes/routes";
import { billRouter } from "./billing-service/routes/route";
import cors from "cors";

export const app: Express = express();

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000'], // Fixed typo: 'locahost' -> 'localhost'
  credentials: true, // Allow cookies and credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
}));

app.use("/api/v1", authRouter);
app.use("/api/v1", apiRouter);
app.use("/api/v1", usageRouter);
app.use("/api/v1", billRouter);