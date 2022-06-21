// Set constants for the application
const app = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const Schema = require('mongoose').Schema;

//to do create the models
user = require('./models/user')
chirp = require('./models/chirp')

const port = process.env.PORT || 3000
const MongoDB_URI = process.env.MONGODB_URI || 'mongodb://localhost/chriper'

// Connecting to the database
mongoose.connect(MongoDB_URI, { 
    useNewUrlParser: true 
},() => {
    console.log('Connected to ChirperDB')
});

// Define cors and body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

//Backend starts here