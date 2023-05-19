//dependencies calling
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config()

//port declair
const PORT = process.env.PORT || 8080;

app.use(cors())
app.use(bodyParser.json());

const bloodrouter = require("./routes/bloodRouter");
app.use("/blood", bloodrouter);

const stationaryrouter = require("./routes/stationaryRouter");
app.use("/stationary", stationaryrouter);

const pharmacyrouter = require("./routes/pharmacyRouter");
app.use("/pharmacy", pharmacyrouter);

//connect mongoose
mongoose.connect(process.env.link , {
    useNewUrlParser: true,
    useUnifiedTopology: true
 });

 const connection = mongoose.connection;
 connection.once("open", () => {
     console.log("MongoDB Connection Success!");
 });


 app.listen(PORT, ()=>{
    console.log(`The server is running on PORT ${PORT}`)
})
