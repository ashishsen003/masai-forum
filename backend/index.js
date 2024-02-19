const express = require("express")
const { connection } = require("./db")
const cors = require('cors')
const { userRouter } = require("./routes/user.route");
const { postsRouter } = require("./routes/post.route");
const session = require('express-session')
const passport = require('passport')
const OAuth2Strategy = require('passport-google-oauth2').Strategy
const { userModel } = require('./models/user.model')

const app = express()
app.use(cors({
    origin: 'http://localhost:8000/',
    methods: 'GET, POST, PUT, DELETE, POST',
    credentials: true
    
}))
app.use(express.json())
app.use("/", userRouter);
app.use("/posts", postsRouter);
app.use(session({
    secret: 'googlesecretkey',
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(
    new OAuth2Strategy({
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: '/auth/google/callback',
        scope: ['profile', 'email']
    },
    async(accessToken, refreshToken, profile, done)=>{
        console.log('profile:', profile);
        try {
            let user = await userModel.findOne({googleId: profile.id})
            if(!user){
                user = new userModel({
                    email: profile.emails[0].value,
                    avatar: profile.photoss[0].value,
                    username: profile.displayName
                })
                await user.save()
            }
            return done(null, user)
        } catch (error) {
            return done(error, null)
        }
    }
    )
)

passport.serializeUser((user, done)=>{
    done(null, user)
})

passport.deserializeUser((user, done)=>{
    done(null, user)
})

app.get('/auth/google', passport.authenticate('google', {scope:['profile', 'email']}))
app.get('/auth/google/callback', passport.authenticate('google',{
    successRedirect: 'http://localhost:8000/posts',
    failureRedirect: 'http://localhost:8000/login'
}))

app.listen(8000, async()=>{
    try {
        await connection
        console.log('server is running at 8000');
    } catch (error) {
        console.log({"error": error});
    }
})

