const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stationarySchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  hospital: {
    type: String,
    required: true,
  },
});

const Stationary = mongoose.model("Stationary", stationarySchema);
module.exports = Stationary;