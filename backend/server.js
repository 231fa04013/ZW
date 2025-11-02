const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// ✅ Serve frontend in production
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "/frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname1, "frontend", "build", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
