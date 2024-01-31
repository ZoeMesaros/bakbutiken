const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const session = require("express-session");
const app = express();
require("dotenv").config({ path: __dirname + "/config.env" });

// Cors settings
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

//Connect to database
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
      // Looking for a matching username in the "admins" collection based on the provided username
      const admin = await db_connect.collection("admins").findOne({ username });

      // If admin not found, return an unauthorized response
      if (!admin) {
        console.log("Admin not found");
        res.status(401).json({ message: "Invalid username or password" });
        return;
      }

      // Comparing the provided password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, admin.password);

      // If password is not valid, return an unauthorized response
      if (!isPasswordValid) {
        console.log("Password mismatch");
        res.status(401).json({ message: "Invalid username or password" });
        return;
      }

      // Creating a session for the authenticated admin user
      req.session.user = { username: admin.username, role: "admin" };

      // Sending a JSON response indicating successful login along with user information
      res.json({ message: "Login successful", user: req.session.user });
    } catch (error) {
      // Handling any errors that occur during the login process
      console.error("Error during admin login:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // Admin logout route
  app.post("/admin/logout", (req, res) => {
    // Destroying the session to log out the user
    req.session.destroy((err) => {
      if (err) {
        // Handling any errors that occur during session destruction
        console.error("Error destroying session:", err);
        res.status(500).send("Internal Server Error");
      } else {
        // Sending a JSON response indicating successful logout
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
      // Requesting "products" collection to find a product with the specified category and slug
      const product = await db_connect
        .collection("products")
        .findOne({ category, slug: productSlug });

      // If no product is found, respond with a 404 status and an error message
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      // If a product is found, respond with the product data in JSON format
      res.json(product);
    } catch (error) {
      // Handling any errors that occur during the product retrieval process
      console.error("Error fetching product:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // Route to get products based on category
  app.get("/api/products/category/:category", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const category = req.params.category;

    try {
      const db_connect = dbo.getDb();
      // Querying "products" for items with the specified category, applying pagination

      const products = await db_connect
        .collection("products")
        .find({ category: category })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray();
      // Sending the array of products as a JSON response
      res.json(products);
    } catch (error) {
      // Handling any errors that occur during the product retrieval process
      console.error("Error fetching products:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // Route to get all products
  app.get("/api/products", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    try {
      const db_connect = dbo.getDb();
      // Use the "products" collection to find all products and implement pagnation
      const products = await db_connect
        .collection("products")
        .find({})
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray();
      // Send the retrieved products as a JSON response
      res.json(products);
    } catch (error) {
      // Handle errors that occur during the all products retrieval process
      console.error("Error fetching products:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // Route to get all orders
  app.get("/api/admin", async (req, res) => {
    try {
      const db_connect = dbo.getDb();
      // Use the "orders" collection to find all orders
      const orders = await db_connect.collection("orders").find({}).toArray();
      // Send the retrieved orders as a JSON response
      res.json(orders);
    } catch (error) {
      // Handle errors that occur during the orders retrieval process
      console.error("Error fetching orders:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // Route to create a new order
  app.post("/api/orders/new", async (req, res) => {
    try {
      // Destructure relevant information from the request body
      const {
        orderNumber,
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

      // Connect to the database and access the "orders" collection
      const db_connect = dbo.getDb();
      const ordersCollection = db_connect.collection("orders");

      // Prepare order data with additional information such as orderDate
      const orderData = {
        orderNumber,
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

      // Insert the new order into the "orders" collection
      const result = await ordersCollection.insertOne(orderData);

      // Send a JSON response indicating successful order creation along with the order ID
      res.json({
        message: "Order created successfully",
        orderId: result.insertedId,
      });
    } catch (error) {
      // Handle any errors that may occur when creating an order
      console.error("Error creating order:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // Route to update stock after an order has been made
  app.put("/api/orders/:orderId/update-stock", async (req, res) => {
    try {
      const orderId = req.params.orderId;

      // Retrieve order details from the database using orderId
      const db_connect = dbo.getDb();
      const ordersCollection = db_connect.collection("orders");

      // Find the order in the "orders" collection based on the provided orderId
      const order = await ordersCollection.findOne({
        _id: new ObjectId(orderId),
      });

      // If the order is not found, return a 404 Not Found response
      if (!order) {
        console.log("Order not found for ID:", orderId);
        res.status(404).json({ error: "Order not found" });
        return;
      }

      // Access the "products" collection to update stock for each item in the order
      const productsCollection = db_connect.collection("products");

      // Prepare update operations for each item in the order
      const updateOperations = order.items.map(({ _id, quantity }) => ({
        updateOne: {
          filter: { _id: new ObjectId(_id) },
          update: {
            $inc: {
              inStock: -quantity, // Decrement stock based on order quantity
              orders: quantity, // Increment the total orders for the product
            },
          },
        },
      }));

      // Execute bulkWrite to update both the inStock and orders documents in the "products" collection
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

      // Log and send a JSON response indicating successful stock and orders update
      console.log("Stock and orders updated successfully");
      res.json({ message: "Stock and orders updated successfully" });
    } catch (error) {
      // Log any errors during the update process
      console.error("Error updating stock and orders:", error);
      res.status(500).send("Internal Server Error");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
