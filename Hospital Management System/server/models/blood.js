const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bloodSchema = new Schema({
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

const Blood = mongoose.model("Blood", bloodSchema);
module.exports = Blood;






















// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const bloodSchema = new Schema({

//     category : {
//         type :String,
//         required: true
//     },

//     amount: {
//         type:String,
//         required: true
//     } ,
//     hospital : {
//         type:String,
//         required: true
//     } 

// })

// const bloods =mongoose.model("blood" ,bloodSchema);
// module.exports = bloods;