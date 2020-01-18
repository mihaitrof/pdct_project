
const passport = require('passport');
// const passportService = require('../services/passport')
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');
const secret = require('./config/secret')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local');


// const requireAuth = passport.authenticate('local', {session:false})

const tokenForUser = (user) => {
    const timestamp = new Date().getTime()
    const userjwt = jwt.encode({ sub: user.id, iat: timestamp }, secret.secret)
    console.log(userjwt)
    return userjwt
}

const signin = (req, res, next) => {
    res.send({
        token: tokenForUser(req.user)
    })
}

const signup = (req, res) => {
    // const signup = (req, res, next) => {

    const { email, password } = req.body
    console.log(req.body);
    const saltRounds = 12

    if (!email || !password) {
        res.status(422).send({ error: 'You must provide an email and a password.' })
    }
    // see if a user with the given email exists.
    bcrypt.hash(password, saltRounds)
        .then((hash) => {

            var q = {
                query: 'mutation {addUser (email:"' + email + 
                    '",password:"' + hash + 
                    '") {id}}'
            };
            console.log(q)

            fetch('graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(q),
            })
                .then(newUser => {
                    res.json({ token: tokenForUser(newUser) })
                })
                .catch((err) => {
                    res.json({ error: 'Error saving user to database.' + err })
                })
        })
        .catch((err) => {
            // return next(err)
        })
}

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: secret.secret
}

const jwtLogin = new JwtStrategy(jwtOptions, (payload,done) => {
    console.log(payload.iat);
    return done(null,true);
})

passport.use("ourloginstrategy",jwtLogin)
passport.use("loginOptions", jwtOptions)

module.exports = { signup, signin, jwtOptions, jwtLogin }