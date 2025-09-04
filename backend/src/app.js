require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Routes
const authRoutes = require("./routes/auth.routes");
const universitiesRoutes = require("./routes/universities.routes");
const formationsRoutes = require("./routes/formations.routes");
const enrollmentsRoutes = require("./routes/enrollments.routes");
const chatRoutes = require("./routes/chat.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/universities", universitiesRoutes);
app.use("/api/formations", formationsRoutes);
app.use("/api/enrollments", enrollmentsRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("✅ OrientMada backend is running!");
});

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch(err => console.error("❌ Erreur MongoDB :", err));

module.exports = app;
