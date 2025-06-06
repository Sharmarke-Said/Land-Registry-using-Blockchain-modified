// app.js (or server.js)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Regular middleware
app.use(express.json());
app.use(cors());

// Routers
const landDetailsRouter = require("./routes/landDetails");
app.use("/landDetails", landDetailsRouter);

const SellingLandRouter = require("./routes/SellingLand");
app.use("/SellingLand", SellingLandRouter);

const userDetailsRouter = require("./routes/userDetails");
app.use("/userDetails", userDetailsRouter);

const verifyOtpRouter = require("./routes/verifyOtp");
app.use("/otp", verifyOtpRouter);

// Import the UserDetails model
const UserDetails = require("./models/userDetails");
const {
  createDummyUser,
  createDummyLandDetails,
  createDummyUsers,
} = require("./utils/data");

// PORT
const port = process.env.PORT || 8000;

// MONGODB Connect
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true, // Deprecated in newer versions
  })
  .then(async () => {
    console.log("DB connected successfully");
    // Create the dummy user
    await createDummyUsers();
    await createDummyLandDetails();
    // Start the server after successful DB connection
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log("DB connection failed");
    console.log(error);
    process.exit(1);
  });
