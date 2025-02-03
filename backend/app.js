const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const session = require("express-session");

const userRoutes = require("./routes/userRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const blogRoutes = require("./routes/blogRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");
const contactRoutes = require("./routes/contactRoutes");
const queryRoutes = require("./routes/queryRoutes");
const footerRoutes = require("./routes/footerRoutes");
const enquiryFormRoutes = require("./routes/enquiryFormRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const heroSectionRoutes = require("./routes/heroSectionRoutes");
const homeRoutes = require("./routes/homeRoutes");

const app = express();

// Environment Variables
require("dotenv").config();

// Connect to MongoDB
connectDB();

// Middleware
const corsOptions = {
  origin: "http://127.0.0.1:5500", // Frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());



// API Routes
app.use("/api/users", userRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api", bookingRoutes);
app.use("/api", reviewRoutes);
app.use("/api", subscriberRoutes);
app.use("/api", contactRoutes);
app.use("/api", queryRoutes);
app.use("/api/footer", footerRoutes);
app.use('/api/enquiry', enquiryFormRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/herosection", heroSectionRoutes);
app.use("/api/home", homeRoutes);


// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
