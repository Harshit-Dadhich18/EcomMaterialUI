const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportlocalmongoose = require('passport-local-mongoose')


const UserSchema = new Schema({
    username:{
        type:String,
        require: true,
        unique: true,
    },
    email:{
        type:String,
        require: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false 
    },
})

UserSchema.plugin(passportlocalmongoose);


module.exports = mongoose.model('EcomUser',UserSchema);