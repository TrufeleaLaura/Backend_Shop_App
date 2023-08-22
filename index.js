import express from "express";
import connectDB from "./config/DBConnection.js";
import productsRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
connectDB();
const app = express(), port = 8080;
app.use(express.json());
app.use(cors());
app.use("/api/products/", productsRoutes);
app.use("/api/cart/", cartRoutes);
app.use("/api/user/", userRoutes);
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
};
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
