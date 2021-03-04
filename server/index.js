const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const passport = require("passport");
const connectDB = require("./config/db");
const cors = require("cors");

require("dotenv").config({
  path: "./config/config.env",
});

const app = express();

connectDB();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(passport.initialize());

const auth = require("./api/auth");
const profile = require("./api/profile");
const photo = require("./api/photo");

require("./strategies/jsonwtStrategy")(passport);

if (process.env.NODE_ENV === "development") {
  app.use(cors());
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("Working");
});
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/upload", photo);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running`));
