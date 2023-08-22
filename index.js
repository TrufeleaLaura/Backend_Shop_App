import express from "express";
import connectDB from "./config/DBConnection.js";
import productsRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import userRoutes from "./routes/userRoutes.js";
connectDB();
const app = express(), port = 8080;
app.use(express.json());
app.use("/api/products/", productsRoutes);
app.use("/api/cart/", cartRoutes);
app.use("/api/user/", userRoutes);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
