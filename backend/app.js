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

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Serve admin panel at /admin
app.use("/admin", express.static(path.join(__dirname, "public")));


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


// --------------------------------------------------------------------
// --------------------------------------------------------------------
// ------------------ VPS servers app.js ----------------------------
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const path = require("path");
// const session = require("express-session");

// const userRoutes = require("./routes/userRoutes");
// const destinationRoutes = require("./routes/destinationRoutes");
// const blogRoutes = require("./routes/blogRoutes");
// const bookingRoutes = require("./routes/bookingRoutes");
// const reviewRoutes = require("./routes/reviewRoutes");
// const subscriberRoutes = require("./routes/subscriberRoutes");
// const contactRoutes = require("./routes/contactRoutes");
// const queryRoutes = require("./routes/queryRoutes");
// const footerRoutes = require("./routes/footerRoutes");
// const enquiryFormRoutes = require("./routes/enquiryFormRoutes");
// const aboutRoutes = require("./routes/aboutRoutes");
// const heroSectionRoutes = require("./routes/heroSectionRoutes");
// const homeRoutes = require("./routes/homeRoutes");

// const app = express();

// // Environment Variables
// require("dotenv").config();

// // Connect to MongoDB
// connectDB();

// // Middleware
// //const corsOptions = {
// //  origin: "http://www.tripinventor.in", // Frontend origin
// //  methods: ["GET", "POST", "PUT", "DELETE"],
// //  credentials: true,
// //};
// const corsOptions = {
//   origin: function (origin, callback) {
//     const allowedOrigins = [
//       "http://www.tripinventor.in",
//       "https://www.tripinventor.in",
//       "http://tripinventor.in",
//       "https://tripinventor.in"
//     ];

//     if (allowedOrigins.includes(origin) || !origin) {
//       // Allow requests with no origin (e.g., mobile apps, Postman)
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// };

// // Serve static files
// app.use(express.static(path.join(__dirname, "public")));

// // Serve admin panel at /admin
// app.use("/admin", express.static(path.join(__dirname, "public/admin")));


// app.use(cors(corsOptions));
// app.use(bodyParser.json());
// app.use(express.json());



// // API Routes
// app.use("/api/users", userRoutes);
// app.use("/api/destinations", destinationRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api", bookingRoutes);
// app.use("/api", reviewRoutes);
// app.use("/api", subscriberRoutes);
// app.use("/api", contactRoutes);
// app.use("/api", queryRoutes);
// app.use("/api/footer", footerRoutes);
// app.use('/api/enquiry', enquiryFormRoutes);
// app.use("/api/about", aboutRoutes);
// app.use("/api/herosection", heroSectionRoutes);
// app.use("/api/home", homeRoutes);


// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, '127.0.0.1' , () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
