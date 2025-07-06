const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/db");

//configuartions
dotenv.config();

//mongoose configuration?
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//routers
//1st test route
app.use("/api/v1/test", require("./routes/testRoute"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoute"));

//port
const PORT = process.env.PORT || 8080;
const mode = process.env.DEV_MODE;

//listen
app.listen(PORT, () => {
  console.log(`Node Server Running in ${mode} mode on port ${PORT}`.bgBlue.white);
});
