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

//Backend function start here

//login function
app.post('/api/login', (req, res) => {
    console.log('login request')
    console.log(req.body)
    user.findOne({ 
        $and: [
            {$or: [
                {mail:req.body.usernameOrEmail}, {username:req.body.usernameOrEmail}
            ]},
            {password:req.body.password}
        ]
    }, (err, user) => {
        if (err) {
            console.log(err)
            res.status(500).send(err)
        } else {
            if (user) {
                console.log(user)
                res.status(200).send(user)
            } else {
                res.status(404).send('User not found')
            }
        }
    })
})


//register function


//get users

//new tweet

