let mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String,
    age: String,
    gender : String,
    city : String,
    avatar : String,
    picture : String,
    token : String,
    inscriptionDate : Date,
    music: Array,
    interest: Array,
})

let userModel = mongoose.model('users', userSchema);

module.exports = userModel;