const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        // trim removes space in string
        trim: true,
        // unique prohibiting same string on this field on full DB
        unique: 1
    },
    password: {
        type: String,
        maxlength: 100
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        // default provides basic information without field data
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

// pre processing (encryption from schema data)
userSchema.pre('save', function (next) {
    // get user parsing schema data
    var user = this;

    if (user.isModified('password')) {
        // encrypt password data
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        // if the process is not password data Next()
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, callback) {
    // plainPassword to encript and compare the stored data in MongoDB

    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return callback(err),
        callback(null, isMatch)
    })
}

userSchema.methods.generateToken = function(callback) {
    // 'var' ES5
    var user = this;

    // create token by jsonwebtoken
    // "_id" is MongoDB ID Hash
    
    // Error: Expected "payload" to be a plain object. (user._id is hash)
    // var token = jwt.sign(user._id, 'secretToken')
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function(err, user) {
        if(err) return callback(err)
        callback(null, user)
    })
}

userSchema.statics.findByToken = function(token, callback) {
    var user = this;

    // user._id + '' = token
    // user._id = token

    // Decoding the token
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // after finding the user from User _id
        // campare the _id token with a token from the cookie of client
        user.findOne({"_id": decoded, "token": token }, function(err, user) {
            if(err) return callback(err);
            callback(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }