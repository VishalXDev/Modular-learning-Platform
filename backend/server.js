// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

// Connect to MongoDB
connectDB()
  .then(() => console.log("✅ MongoDB connected! 🚀"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const sectionRoutes = require("./routes/sectionRoutes");
const unitRoutes = require("./routes/unitRoutes");
const chapterRoutes = require("./routes/chapterRoutes");
const questionRoutes = require("./routes/questionRoutes");
const progressRoutes = require('./routes/progressRoutes');
// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/units", unitRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/questions", questionRoutes);
app.use('/api/progress', progressRoutes);
// Root Route
app.get("/", (req, res) => {
  res.send("API running ✅");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
