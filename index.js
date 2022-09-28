// Import Express
let express = require('express');
// Import Body Parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');

// Initialize the app
let app = express();

//Import API Routes
let apiRoutes = require("./routes/api");

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to mongoose and set connection variable
mongoose.connect('mongodb://localhost/bank_acc_db', {
    useNewUrlParser: true
});
var db = mongoose.connection;

// Check Connection to DB
if (!db)
    console.log("Error connecting to db");
else
    console.log("DB connected successfully");

// Setup Server Port
var port = process.env.port || 8080;

// Default server page message
app.get('/', (req, res) => res.send('Welcome !!!'));

//Use API Routes in the App
app.use('/api', apiRoutes);

//Launch app to listen to a specified port
app.listen(port, function () {
    console.log("Running Restfull API on port " + port);
})
