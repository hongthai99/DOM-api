const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

// create schema 
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    name: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    //description: {
    //    type: String,
    //    require:true
    //},
    register_date: {
        type: Date,
        default: Date.now
    }
   
});

module.exports = User = mongoose.model('user', UserSchema);