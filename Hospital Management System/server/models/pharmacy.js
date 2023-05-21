const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pharmacySchema = new Schema({
  medicine: {
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

const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);
module.exports = Pharmacy;

