const express = require("express");
const productRoutes = express.Router();
const dbo = require("../db/conn");

productRoutes.route("/api/products").get(async (req, res) => {
  try {
    const db_connect = dbo.getDb("products");
    const products = await db_connect.collection("products").find({}).toArray();
    res.json(products);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = productRoutes;
