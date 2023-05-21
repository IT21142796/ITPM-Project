const mongoose = require("mongoose");

const myAmbulanceSchema = mongoose.Schema(
  {
    AmbulanceNumber: {
      type: String,
      required: [true, "Please add the Ambulance Number"],
    },
    AmbulanceType: {
      type: String,
      required: [true, "Please add the Ambulance Type"],
    },
    AmbulanceCapacity: {
      type: Number,
      required: [true, "Please add the Ambulance Capacity"],
    },
    ContactNumber: {
      type: Number,
      required: [true, "Please add the Contact Number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MyAmbulance", myAmbulanceSchema);
