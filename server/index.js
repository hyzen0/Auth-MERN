const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");

const auth = require("./api/auth");
const profile = require("./api/profile");
const photo = require("./api/photo");

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const db = require("./setup/myurl").mongoURL;

mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => console.log(err));

app.use(passport.initialize());

require("./strategies/jsonwtStrategy")(passport);

app.get("/", (req, res) => {
  res.send("Working");
});

app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/upload", photo);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running`));
