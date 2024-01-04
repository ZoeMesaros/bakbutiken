const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const app = express();
require("dotenv").config({ path: __dirname + "/config.env" });

app.use(cors());
const port = process.env.PORT || 5000;

// Import and initialize dbo before using it in routes
const dbo = require("./db/conn");

// Connect to MongoDB
dbo.connectToServer((err) => {
  if (err) {
    console.error("Error connecting to MongoDB:", err);
    return;
  }

  // Set up routes after successful connection

  //Get all products
  app.get("/api/products", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    try {
      const db_connect = dbo.getDb();
      const products = await db_connect
        .collection("products")
        .find({})
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  //Get products based on category
  app.get("/api/products/:category", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const category = req.params.category;

    try {
      const db_connect = dbo.getDb();
      const products = await db_connect
        .collection("products")
        .find({ category: category })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  //Get a single product by ID
  /*   app.get("/api/products/:id", async (req, res) => {
    const productId = req.params.id;

    if (!ObjectId.isValid(productId)) {
      res.status(400).json({ error: "Invalid product ID format" });
      return;
    }

    try {
      console.log("Requested Product ID:", productId);
      const db_connect = dbo.getDb();
      const product = await db_connect
        .collection("products")
        .findOne({ _id: new ObjectId(productId) });

      if (!product) {
        console.log("Product not found for ID:", productId);
        res.status(404).json({ error: "Product not found" });
        return;
      }

      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).send("Internal Server Error");
    }
  }); */

  //Get a single product by slug name
  app.get("/api/products/:slug", async (req, res) => {
    const productSlug = req.params.slug;

    try {
      console.log("Requested Product Slug", productSlug);
      const db_connect = dbo.getDb();
      const product = await db_connect
        .collection("products")
        .findOne({ slug: productSlug });

      if (!product) {
        console.log("Product not found for slug:", productSlug);
        res.status(404).json({ error: "Product not found" });
        return;
      }

      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).send("Internal Server Error");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
