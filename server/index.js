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

// Create and validate session store
const store = MongoStore.create({
    mongoUrl: process.env.MONGODB,
    collectionName: 'EcomSessions',
    touchAfter: 24 * 60 * 60, // optional: reduce write frequency
});

console.log("✅ MongoStore (session) connected");

const sessionConfig = {
    secret: 'thisshouldbebettersecret',
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
        httpOnly: true,
        secure: true, // must be true for HTTPS on Render
        sameSite: 'None',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
};

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
