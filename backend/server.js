import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.models.js";
import productRoutes from "./routes/product.route.js"
dotenv.config();
const app = express();
const port=process.env.PORT || 5000
app.use(express.json()); // allow us to accept json data in the body
app.use(express.urlencoded({ extended: true }));
// Routes
app.use('/api/products',productRoutes)

// Connect to DB and then start server
app.listen(port, () => {
  connectDB();
  console.log("Server started at http://localhost:/", port);
});
