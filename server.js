// const express = require("express");
// const dotenv = require("dotenv");
// const morgan = require("morgan");
// const cors = require("cors");
// const colors = require("colors");
// const connectDB = require("./config/db");

// //configuartions
// dotenv.config();

// //mongoose configuration?
// connectDB();

// //rest object
// const app = express();

// //middlewares
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(cors());

// //routers
// //1st test route
// app.use("/api/v1/test", require("./routes/testRoute"));
// app.use("/api/v1/auth", require("./routes/authRoutes"));
// app.use("/api/v1/inventory", require("./routes/inventoryRoute"));

// //port
// const PORT = process.env.PORT || 8080;
// const mode = process.env.DEV_MODE;

// //listen
// app.listen(PORT, () => {
//   console.log(`Node Server Running in ${mode} mode on port ${PORT}`.bgBlue.white);
// });

const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
//dot config
dotenv.config();

// mongoose.set("bufferCommands", false);
//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
// 1 test route
app.use("/api/v1/test", require("./routes/testRoute"));
app.use("/api/v1/auth", require("./routes/authRoutes"));

app.use("/api/v1/inventory", require("./routes/inventoryRoute"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoute"));

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`Node Server Running In ${process.env.DEV_MODE} ModeOn Port ${process.env.PORT}`.bgBlue.white);
});
