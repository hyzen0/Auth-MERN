const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Person = require("../../models/Person");

const Profile = require("../../models/Profile");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(Profile => {
        if (!Profile) {
          return res.status(404).json({ Error: "No profile found" });
        }
        res.json(Profile);
      })
      .catch(err => console.log("Got some error in profile" + err));
  }
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileValues = {};
    profileValues.user = req.user.id;
    if (req.body.email) profileValues.email = req.body.email;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileValues },
            { new: true }
          )
            .then(profile => res.json(profile))
            .catch(err => console.log("Problem in Update" + err));
        } else {
          Profile.findOne({ email: profileValues.email })
            .then(profile => {
              if (profile) {
                res.status(400).json({ email: "email already exists" });
              }
              new Profile(profileValues)
                .save()
                .then(profile => res.json(profile))
                .catch(err => console.log(err));
            })
            .catch(err => console.log("email not found" + err));
        }
      })
      .catch(err => console.log("Problem in fetching profile " + err));
  }
);

module.exports = routers;
