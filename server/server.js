const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Routes
const memberRoutes = require("./routes/memberRoutes");
const attendanceRoutes = require("./routes/attendanceroutes");

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================
app.use(cors());

app.use(express.json());

// ==========================================
// MONGODB CONNECTION
// ==========================================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((error) => {
    console.log("❌ Database Connection Error");
    console.log(error.message);
  });

// ==========================================
// MEMBER ROUTES
// ==========================================
app.use(
  "/api/members",
  memberRoutes
);

// ==========================================
// ATTENDANCE ROUTES
// ==========================================
app.use(
  "/api/attendance",
  attendanceRoutes
);

// ==========================================
// HOME ROUTE
// ==========================================
app.get("/", (req, res) => {
  res.send(
    "SCOAN Youth & Usher Backend Running..."
  );
});

// ==========================================
// SERVER
// ==========================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});