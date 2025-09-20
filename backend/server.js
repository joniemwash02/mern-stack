import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.models.js"
dotenv.config();
const app = express();
app.use(express.json()) // allow us to accept json data in the body

// Routes
app.post("/api/products", async (req, res) => {
  const product = req.body; // user will send data
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }
  const newProduct= new Product(product)
  try {
    await newProduct.save();
    res.status(201).json({success: true, data: newProduct})
    
  } catch (error) {
    console.error('error in creating product', error.message)
    res.status(500).json({success: false, message: "server error"})
  }

});

app.delete("/api/products/:id", async(req, res)=>{
    const {id}=req.params
    console.log(id)
})

// Connect to DB and then start server
app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000/");
});
