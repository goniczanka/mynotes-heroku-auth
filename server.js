const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

const routes = require("./routes");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HTTP request logger
app.use(morgan("tiny"));
app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
