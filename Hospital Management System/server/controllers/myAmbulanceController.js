const asyncHandler = require("express-async-handler");

const MyAmbulance = require("../models/myAmbulanceModel");

//@desc   Get myAmbulances
//@route  GET /api/myAmbulances
//@access Private
const getMyAmbulances = asyncHandler(async (req, res) => {
  const myAmbulances = await MyAmbulance.find();

  res.status(200).json(myAmbulances);
});

//@desc   Set myAmbulances
//@route  POST /api/myAmbulances
//@access Private
const setMyAmbulance = asyncHandler(async (req, res) => {
  if (!req.body.AmbulanceNumber) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const myAmbulance = await MyAmbulance.create({
    AmbulanceNumber: req.body.AmbulanceNumber,
    AmbulanceType: req.body.AmbulanceType,
    AmbulanceCapacity: req.body.AmbulanceCapacity,
    ContactNumber: req.body.ContactNumber,
  });

  res.status(200).json(myAmbulance);
});

//@desc   Update myAmbulances
//@route  PUT /api/myAmbulances/:id
//@access Private
const updateMyAmbulance = asyncHandler(async (req, res) => {
  const myAmbulance = await MyAmbulance.findById(req.params.id);

  if (!myAmbulance) {
    res.status(400);
    throw new Error("My Ambulance not Found");
  }

  const updatedMyAmbulance = await MyAmbulance.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedMyAmbulance);
});

//@desc   Delete myAmbulances
//@route  DELETE /api/myAmbulances
//@access Private
const deleteMyAmbulance = asyncHandler(async (req, res) => {
  const myAmbulance = await MyAmbulance.findByIdAndDelete(req.params.id);

  if (!myAmbulance) {
    res.status(400);
    throw new Error("My Ambulance not Found");
  }

  res.status(200).json({ message: "success" });
});

module.exports = {
  getMyAmbulances,
  setMyAmbulance,
  updateMyAmbulance,
  deleteMyAmbulance,
};
