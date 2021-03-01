const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require("./models/User");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
/*
// Connect to External Server Service
mongoose.connect('mongodb+srv://<User>:<Password>@cluster0.frzcn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true
}).then(() => console.log(`mongoDB Connected...`))
  .catch(err => console.log(err))
*/

// Connect to Local MongoDB Server Service
mongoose.connect(config.mongoDBURI, {
    dbName: 'admin', useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send(`Hello World`)
});

app.get('/api/hello', (req, res) => {
    res.send("index.js에서 /api/hello를 get해서 response를 보냅니다.")
});

app.post('/api/users/register', (req, res) => {
    // Sign-up Information to DB
    /*
    req.body => URL form to JSON type.
    */
    const user = new User(req.body)

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err })

        // print message for json parsing to MongoDB
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/login', (req, res) => {
    // searching requested email information at MongoDB
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "There is no user with your e-mail address."
            })
        }

        // checking the password when the email information exist
        user.comparePassword(req.body.password, (req, isMatch) => {
            if (!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: "Wrong password."
                })
        })

        // make a token when all data is correct
        user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);

            // save the token on Cookie, Local Storage or etc (up to secure)
            // save on Cookie
            res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id })
        })
    })
})

app.listen(port, () => {
    console.log(`example app at http://localhost:${port}`)
})

// Later the folder structure orginization with Router(Express)
// example =>
// ./api/users/login
// ./api/product/create
// ./api/comment

// get request ('push to api', middleware, callback)
app.get('/api/users/auth', auth, (req, res) => {

    // if the process in this line, the auth(middleware) process means success
    // because if there is error auth method call return inside and escape this
    res.status(200).json({
        _id: req.user._id,
        // if role is 0 => normal user, 1 => admin
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.username,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id },
        { token: '' },
        (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        })
})