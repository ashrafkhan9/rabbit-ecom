const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const products = require("./data/products");

dotenv.config();

// Connect to mongoDB
mongoose.connect(process.env.MONGO_URI);

// Function to seed data

const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // Create a default admin
    const createUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      admin: "admin",
    });

    // Assign the default user id to each product
    const userID = createUser._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    // Unsert the products into the database
    await Product.insertMany(sampleProducts);
    console.log("Product data seeeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding the data:", error);
    process.exit(1);
  }
};

seedData();
