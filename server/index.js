const express = require("express");
const routesHandler = require("./routers/posts");
require("dotenv/config");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const cors = require("cors");

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT"],
};

const app = express();
app.use(express.urlencoded({ limit: "25mb" }));
app.use(express.json({ limit: "25mb" }));
app.use(bodyParser.json());
app.use("/", routesHandler);
app.use(cors(corsOptions));
app.use(methodOverride("_method"));
const connectDB = async () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
