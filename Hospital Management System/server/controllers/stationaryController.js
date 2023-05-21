const Stationary = require("../models/stationary");

// Get all statements
const getAll = async (req, res, next) => {
  let stationary;
  try {
    stationary = await Stationary.find();
  } catch (err) {
    console.log(err);
  }
  if (!stationary) {
    return res.status(404).json({ message: "Nothing found" });
  }
  return res.status(200).json(stationary);
};

// Get statement by ID
const getByID = async (req, res, next) => {
  const id = req.params.id;
  let stationary;
  try {
    stationary = await Stationary.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!stationary) {
    return res.status(404).json({ message: "No statement found" });
  } else {
    return res.status(200).json({ stationary });
  }
};

// Update statement
const updateStationary = async (req, res, next) => {
  const id = req.params.id;
  const { category, amount, hospital } = req.body;
  let stationary;
  try {
    stationary = await Stationary.findByIdAndUpdate(
      id,
      {
        category,
        amount,
        hospital,
      },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }
  if (!stationary) {
    return res.status(404).json({ message: "Unable to update by ID" });
  }
  return res.status(200).json({ stationary });
};

// Add statement
const addStationary = async (req, res, next) => {
  const { category, amount, hospital } = req.body;
  let stationary;
  try {
    stationary = new Stationary({
      category,
      amount,
      hospital,
    });
    await stationary.save();
  } catch (err) {
    console.log(err);
  }
  if (!stationary) {
    return res.status(500).json({ message: "Unable to add" });
  }
  return res.status(201).json(stationary);
};

// Delete statement
const deleteStationary = async (req, res, next) => {
  const id = req.params.id;
  let stationary;
  try {
    stationary = await Stationary.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!stationary) {
    return res.status(404).json({ message: "Unable to delete by ID" });
  }
  return res.status(200).json({ message: "Statement successfully deleted" });
};

module.exports = {
  getAll,
  getByID,
  updateStationary,
  addStationary,
  deleteStationary,
};