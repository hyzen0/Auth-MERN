const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "myPerson",
  },
  birthday: {
    type: Date,
  },
});

module.exports = Profile = mongoose.model("myProfile", ProfileSchema);
