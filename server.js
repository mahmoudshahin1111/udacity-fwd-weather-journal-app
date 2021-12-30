
// Setup empty JS object to act as endpoint for all routes
let  projectData = {};
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app  = express();
/* Dependencies */
const cors = require('cors');
const bodyParser = require('body-parser');
/* Middleware*/






//Here we are configuring express to use body-parser as middle-ware.
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('public'));
//
app.get('/',async(req,res)=>{
    return res.sendFile('./public/index.html');
})
// Callback to debug
function onServerStarted(){
    console.log(`server started  on port ${3001}`);
}
// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get('/all',async (req,res)=>{
    return res.json(projectData);
});
// Post Route
app.post('/save',async (req,res)=>{
    if(!req.body) return res.status(403).json({});
    projectData = {
        date:new Date(),
        feel:req.body.feelings,
        temp:parseInt(req.body.main.temp,10),
        zip:req.body.zip,
    };
    return res.status(200).json(projectData);
})
// Spin up the server
app.listen(3001,onServerStarted);