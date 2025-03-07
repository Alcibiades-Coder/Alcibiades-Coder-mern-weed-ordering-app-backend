import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";

const allowedOrigins = [
  "https://alcibiades-coder-mern-weed-ordering-app-3idp.onrender.com",
]; // Add your allowed origins here

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to MongoDB"));

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins, // Solo permite solicitudes desde el frontend en Render
    credentials: true,
  })
);

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

app.use("/api/my/user", myUserRoute);

app.listen(7000, () => {
  console.log("Server started on http://localhost:7000");
});
