const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const zapupiRoutes = require("./routes/zapupiRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/zapupi", zapupiRoutes);

// Root route for health check or welcome message
app.get("/", (req, res) => {
  res.json({ status: "Payment server is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
