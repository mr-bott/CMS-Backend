const express = require("express");
require("dotenv").config();

const { connectDB } = require("./config/db");
const env = require("./config/env");
const globalErrorHandler = require("./middlewares/error.middleware");

const authRoutes = require("./auth/auth.routes");
const categoryRoutes = require("./category/category.routes");
const productRoutes = require("./products/products.routes");
const imageRoutes = require("./products/images/images.routes");
const cartRoutes = require("./cart/cart.routes");

const app = express();

app.use(express.json());

//DB Connection
connectDB();

//AuthRoutes
app.use("/api", authRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/image", imageRoutes);
app.use("/cart", cartRoutes);

//global Eroor Handler
app.use(globalErrorHandler);

const PORT = env.PORT;
app.listen(PORT, () => {
  //port Access
  console.log(`Server running on port ${PORT} `);
});
