import mongoose from "mongoose";
import express from "express";
import connectDB from "./config/DBConnection.js";
import productsRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

connectDB()
const app=express(),port=8080;

app.use(express.json());
app.use(cors());
app.use("/api/products/",productsRoutes);
app.use("/api/cart/",cartRoutes);
app.use("/api/user/",userRoutes);
app.use("/api/order/",orderRoutes);
app.use("/api/reviews",reviewRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

