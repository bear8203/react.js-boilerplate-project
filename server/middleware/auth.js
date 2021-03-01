const { User } = require('../models/User');

let auth = (req, res, next) => {
    // Authorization Process

    // Get token from cookie from client (saved at x_auth address in cookie)
    let token = req.cookies.x_auth;

    // Decoding the token & search at DB
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true })

        req.token = token;
        req.user = user;

        // proceeding the original method, preventing stop after proceed the middleware
        next();
    })
    // When matching the data is passing the Authorization

    // When mis-matching the data is not passing the Authorization
    
}

module.exports = { auth };