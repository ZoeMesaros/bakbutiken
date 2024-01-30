const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const session = require("express-session");
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
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: false,
  })
);

const port = process.env.PORT || 5000;

const dbo = require("./db/conn");

// Connect to MongoDB
dbo.connectToServer((err) => {
  if (err) {
    console.error("Error connecting to MongoDB:", err);
    return;
  }

  // Set up routes after successful connection
  // Admin login route
  app.post("/admin/login", async (req, res) => {
    const { username, password } = req.body;

    try {
      const db_connect = dbo.getDb();
      const admin = await db_connect.collection("admins").findOne({ username });

      if (!admin) {
        console.log("Admin not found");
        res.status(401).json({ message: "Invalid username or password" });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, admin.password);

      if (!isPasswordValid) {
        console.log("Password mismatch");
        res.status(401).json({ message: "Invalid username or password" });
        return;
      }

      req.session.user = { username: admin.username, role: "admin" };

      res.json({ message: "Login successful", user: req.session.user });
    } catch (error) {
      console.error("Error during admin login:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // Admin logout route
  app.post("/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        res.status(500).send("Internal Server Error");
      } else {
        res.json({ message: "Logout successful" });
      }
    });
  });

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

  // Create a new order
  app.post("/api/orders/new", async (req, res) => {
    try {
      const {
        first_name,
        last_name,
        items,
        shipping_method,
        payment_method,
        address,
        area,
        postal,
        email,
        mobile,
        phone,
        totalAmount,
      } = req.body;

      const db_connect = dbo.getDb();
      const ordersCollection = db_connect.collection("orders");

      // Prepare order data
      const orderData = {
        first_name,
        last_name,
        items,
        shipping_method,
        payment_method,
        address,
        area,
        postal,
        email,
        mobile,
        phone,
        totalAmount,
        orderDate: new Date(),
      };

      // Create a new order entry
      const result = await ordersCollection.insertOne(orderData);

      console.log(`Order inserted with _id: ${result.insertedId}`);

      // Send response
      res.json({
        message: "Order created successfully",
        orderId: result.insertedId,
      });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  //Update stock
  app.put("/api/orders/:orderId/update-stock", async (req, res) => {
    try {
      const orderId = req.params.orderId;

      // Retrieve order details from the database using orderId
      const db_connect = dbo.getDb();
      const ordersCollection = db_connect.collection("orders");

      const order = await ordersCollection.findOne({
        _id: new ObjectId(orderId),
      });

      if (!order) {
        console.log("Order not found for ID:", orderId);
        res.status(404).json({ error: "Order not found" });
        return;
      }

      // Update stock for each item in the order
      const productsCollection = db_connect.collection("products");

      const updateOperations = order.items.map(({ _id, quantity }) => ({
        updateOne: {
          filter: { _id: new ObjectId(_id) },
          update: {
            $inc: {
              inStock: -quantity,
              orders: quantity,
            },
          },
        },
      }));

      const updateResults = await productsCollection.bulkWrite(
        updateOperations
      );

      // Check if any update operation failed
      if (updateResults.hasWriteErrors()) {
        const error = updateResults.getWriteError();
        console.error("Error updating stock and orders:", error);
        res.status(500).send("Internal Server Error");
        return;
      }

      console.log("Stock and orders updated successfully");
      res.json({ message: "Stock and orders updated successfully" });
    } catch (error) {
      console.error("Error updating stock and orders:", error);
      res.status(500).send("Internal Server Error");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
