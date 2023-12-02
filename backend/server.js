const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config({ path: __dirname + "/config.env" });

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
  app.get("/api/products", async (req, res) => {
    try {
      const db_connect = dbo.getDb();
      const products = await db_connect
        .collection("products")
        .find({})
        .toArray();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});
