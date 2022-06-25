// Set constants for the application
const app = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const Schema = require('mongoose').Schema;

//to do create the models
const user = require('./models/user')
const chirp = require('./models/chirp')

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
app.post('api/register', (req, res) => {
    console.log('register request')
    console.log(req.body)
    user.countDocuments({username:req.body.username}, (err, count) => {
        if (err) 
            console.log(err)

            if(count === 0){
                user.create({
                    name: req.body.name,
                    username: req.body.username,
                    password: req.body.password,
                }).then(newUser => {
                    console.log(`newUser created: ${newUser}`)
                    res.send(newUser)
                })
                .catch(err => {throw err})
            } else {
                res.send(false)
        }
    })
})


//get users
app.post('/api/users', (req, res) => {
    console.log('get users request')
    console.log(req.body)
    user.findOne({username:req.body.username}, (err, user) => {
        if (err) {
            console.log(err)
            res.status(500).send(err)
        }
        res.send(user)
    })
})

//new chirp
app.post('/api/newchirp', async (req,res) => {
    await chirp
        .create(req.body.cirpContent)
        .then(async (newChirp) => {
            await user
            .findOne({username:req.body.username}, async (err, currentUser) => {
                if (err) {console.log(err)}
                await currentUser.chrips.push(newChirp._id)
                await currentUser.save()
                await chirp
                    .findOne({_id:newChirp._id})
                    .populate('author')
                    .exec(async (err, result) => {
                        if (err) throw err
                        await console.log(result)
                        await res.send(result)
                    })
               })
        })
        .catch(err => {throw err})
})

