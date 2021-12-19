
// Setup empty JS object to act as endpoint for all routes
const projectData = {};
// Express to run server and routes
const express = require('express');
const 
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
// Spin up the server
app.listen(3001,onServerStarted);
// Callback to debug
function onServerStarted(){
    console.log(`server started  on port ${3001}`);
}
// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get('/all',async (req,res)=>{
    return res.json({});
});
// Post Route

