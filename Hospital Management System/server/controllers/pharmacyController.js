const Pharmacy = require("../models/pharmacy");

// Get all statements
const getAll = async (req, res, next) => {
  let pharmacy;
  try {
    pharmacy = await Pharmacy.find();
  } catch (err) {
    console.log(err);
  }
  if (!pharmacy) {
    return res.status(404).json({ message: "Nothing found" });
  }
  return res.status(200).json(pharmacy);
};

// Get statement by ID
const getByID = async (req, res, next) => {
  const id = req.params.id;
  let pharmacy;
  try {
    pharmacy = await Pharmacy.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!pharmacy) {
    return res.status(404).json({ message: "No statement found" });
  } else {
    return res.status(200).json({ pharmacy });
  }
};

// Update statement
const updatePharmacy = async (req, res, next) => {
  const id = req.params.id;
  const { medicine, amount, hospital } = req.body;
  let pharmacy;
  try {
    pharmacy = await Pharmacy.findByIdAndUpdate(
      id,
      {
        medicine,
        amount,
        hospital,
      },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }
  if (!pharmacy) {
    return res.status(404).json({ message: "Unable to update by ID" });
  }
  return res.status(200).json({ pharmacy });
};

// Add statement
const addPharmacy = async (req, res, next) => {
  const { medicine, amount, hospital } = req.body;
  let pharmacy;
  try {
    pharmacy = new Pharmacy({
      medicine,
      amount,
      hospital,
    });
    await pharmacy.save();
  } catch (err) {
    console.log(err);
  }
  if (!pharmacy) {
    return res.status(500).json({ message: "Unable to add" });
  }
  return res.status(201).json(pharmacy);
};

// Delete statement
const deletePharmacy = async (req, res, next) => {
  const id = req.params.id;
  let pharmacy;
  try {
    pharmacy = await Pharmacy.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!pharmacy) {
    return res.status(404).json({ message: "Unable to delete by ID" });
  }
  return res.status(200).json({ message: "Statement successfully deleted" });
};

module.exports = {
  getAll,
  getByID,
  updatePharmacy,
  addPharmacy,
  deletePharmacy,
};


