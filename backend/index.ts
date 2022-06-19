// Set constants for the application
const app = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

//to do create the models
const user = require('./models/user')
const chrip = require('./models/chirp')

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