const Blood = require("../models/blood");


const getAll = async (req, res, next) => {
  let blood;
  try {
    blood = await Blood.find();
  } catch (err) {
    console.log(err);
  }
  if (!blood) {
    return res.status(404).json({ message: "Nothing found" });
  }
  return res.status(200).json(blood);
};

const getByID = async (req, res, next) => {
  const id = req.params.id;
  let blood;
  try {
    blood = await Blood.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!blood) {
    return res.status(404).json({ message: "No statement found" });
  } else {
    return res.status(200).json({ blood });
  }
};


const updateBlood = async (req, res, next) => {
  const id = req.params.id;
  const { category, amount, hospital } = req.body;
  let blood;
  try {
    blood = await Blood.findByIdAndUpdate(
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
  if (!blood) {
    return res.status(404).json({ message: "Unable to update by ID" });
  }
  return res.status(200).json({ blood });
};

// Add statement
const addBlood = async (req, res, next) => {
  const { category, amount, hospital } = req.body;
  let blood;
  try {
    blood = new Blood({
      category,
      amount,
      hospital,
    });
    await blood.save();
  } catch (err) {
    console.log(err);
  }
  if (!blood) {
    return res.status(500).json({ message: "Unable to add" });
  }
  return res.status(201).json(blood);
};

// Delete statement
const deleteBlood = async (req, res, next) => {
  const id = req.params.id;
  let blood;
  try {
    blood = await Blood.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!blood) {
    return res.status(404).json({ message: "Unable to delete by ID" });
  }
  return res.status(200).json({ message: "Statement successfully deleted" });
};

module.exports = {
  getAll,
  getByID,
  updateBlood,
  addBlood,
  deleteBlood,
};


































// const Bloods = require("../models/blood");

// //get all statements
// const getAll =async(req,res,next) =>{
//     let blood;
//     try{
//         blood= await Bloods.find 
//         ();
//     }catch(err){
//         console.log(err);
//     }if (!blood){
//         return res.status(404).json({message:"Nothing found"})
//     }
//     return res.status(200).json(blood);

// };

// //get statement by ID
// const getByID = async(req,res,next)=>{
// const id = req.params.id;
// let blood;
// try{
//     blood = await Bloods.findById(id);
// }catch(err){
//     console.log(err);
// }
// if(!blood){
//     return res.status(404).json({message:"NO statment found"});
// }else{
//     return res.status(200).json({blood});
// }
// }

// //update statment
// const updateBlood = async (req,res,next) => {
//     const id = req.params.id;
//     const{category,amount,hospital}=req.body;
//     let blood;
//     try{
//         blood = await Bloods.findByIdAndUpdate(id,{
//             category,
//             amount,
//             hospital 
//         });
//         blood = await Bloods.save();
//     }catch(err){
//         console.log(err);
//     }
//     if(!blood){
//         return res.status(404).json({message:"unable to update by id"});
//     }
//     return res.status(200).json({blood})
// };

// //add statment
// const addBlood = async(req,res,next) => {
//     const {category,amount,hospital} =req.body;
//     let blood;
//     try{
//         blood =new Bloods({
//             category,
//             amount,
//             hospital 
//         });
//         await blood.save();
//     }catch(err){
//         console.log(err);
//     }
//     if (!blood){
//         return res.status(500).json({message: "unable to add"});
//     }
//     return res.status(201).json(blood);
// };

// //delete statment
// const deleteBlood =async(req,res,next) =>{ 
//     const id=req.params.id;
//     let blood;
//     try{
//         blood = await Bloods.findByIdAndRemove(id);
//     }catch(err) {
//         console.log(err);
//     }
//     if(!blood){
//         return res.status(404).json({message:"Unable to Delete by id"});
//     }
//     return res.status(200).json({message: "statment successfully deleted "});
// };

// exports.getAll =getAll;
// exports.getByID = getByID;
// exports.updateBlood =updateBlood;
// exports.addBlood = addBlood;
// exports.deleteBlood =deleteBlood;

