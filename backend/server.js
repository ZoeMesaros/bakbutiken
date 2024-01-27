const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const app = express();
require("dotenv").config({ path: __dirname + "/config.env" });

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
const port = process.env.PORT || 5000;

const dbo = require("./db/conn");

// Connect to MongoDB
dbo.connectToServer((err) => {
  if (err) {
    console.error("Error connecting to MongoDB:", err);
    return;
  }

  // Set up routes after successful connection

  // Get a single product by category and slug
  app.get("/api/products/category/:category/:slug", async (req, res) => {
    const category = req.params.category;
    const productSlug = req.params.slug;

    try {
      const db_connect = dbo.getDb();
      const product = await db_connect
        .collection("products")
        .findOne({ category, slug: productSlug });

      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  //Get products based on category
  app.get("/api/products/category/:category", async (req, res) => {
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

  // Update stock and orders endpoint when making a successful purchase
  app.put(
    "/api/products/:slugOrBatch/update-stock-orders",
    async (req, res) => {
      console.log(
        "Received a PUT request to /api/products/:slugOrBatch/update-stock-orders"
      );

      const identifier = req.params.slugOrBatch;
      const cartItems = req.body;
      console.log("Received cart items:", cartItems);

      let result;

      try {
        const db_connect = dbo.getDb();

        if (ObjectId.isValid(identifier)) {
          result = await db_connect.collection("products").updateOne(
            { _id: new ObjectId(identifier) },
            {
              $inc: {
                inStock: -cartItems[0].quantity,
                orders: cartItems[0].quantity,
              },
            }
          );

          if (result.matchedCount === 0) {
            console.log("Product not found for ID:", identifier);
            res.status(404).json({ error: "Product not found" });
            return;
          }
        } else {
          for (const cartItem of cartItems) {
            result = await db_connect.collection("products").updateOne(
              { _id: new ObjectId(cartItem._id) },
              {
                $inc: {
                  inStock: -cartItem.quantity,
                  orders: cartItem.quantity,
                },
              }
            );

            if (result.matchedCount === 0) {
              console.log("Product not found for ID:", cartItem._id);
              res.status(404).json({ error: "Product not found" });
              return;
            }
          }
        }

        console.log("Update result:", result);
        console.log("Stock and orders updated successfully");
        res.json({ message: "Stock and orders updated successfully" });
      } catch (error) {
        console.error("Error updating stock and orders:", error);
        res.status(500).send("Internal Server Error");
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
