const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const user = require('./Routes/user')
const session = require('express-session');
const MongoStore = require('connect-mongo'); 
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const User = require('./models/user')
const dotenv = require('dotenv');
const ProductController = require('./controllers/ProductController');
const OrderController = require('./controllers/OrderController');

dotenv.config();

const app = express();
// 'mongodb://localhost:27017/Ecom'
mongoose.connect(process.env.MONGODB, {
    useNEWUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB successfull connected")
}).catch((e) => {
    console.log(e.message);
})



app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({
        origin: "https://mybags.onrender.com",
        credentials: true,
}));

const sessionConfig = {
    secret: 'thishouldbeabettersecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB, // Use the same MongoDB URI
        collectionName: 'sessions',
    }),
    cookie: { // the Date.now() always given in the miliseconds
        httpOnly: true,
        secure: false,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1000{miliseconds}*60{seconds}*60{minutes}*24{hours}*7{days}
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use('/api/auth',user);
app.use('/api',ProductController);
app.use('/api/order',OrderController);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT);
})
