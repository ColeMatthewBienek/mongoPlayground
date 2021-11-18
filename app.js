//declare constants
const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");

//const bodyParser = require('body-parser');
//mongoose==>mongodb connection
app.use(express.urlencoded({extended: true}));
app.use(express.json());


mongoose.promise = global.promise;
mongoose.connect("mongodb://localhost:27017/mongoPlayground");

//Mongoose schema
let teamSchema = new mongoose.Schema({
    teamName: String,
    scores: [Number]
})

//mongoose model
let TeamRecord = mongoose.model("TeamRecords", teamSchema);



app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

//post endpoint
app.post("/addteam",(req, res)=>{
    console.log('posting...')
   

    let myData = new TeamRecord(req.body);
    myData.save()
        .then(item => {
            res.status(200).send("Item saved to database.");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        })
})



//endpoint for data from browser



// app.get ('/',(req,res) => { 
//     res.send("Hello World!")
// });

function connectionMessage(errorMsg) {
    let displayMsg = errorMsg ? errorMsg : "Connected to port: " + PORT;
    console.log(displayMsg);
  }

app.listen(PORT, connectionMessage);
