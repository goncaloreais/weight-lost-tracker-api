// importing dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// creating the schema
const LoginSchema = mongoose.Schema({
    sessionToken: String,
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
    
});

// creating the model
const Login = mongoose.model('login', LoginSchema);

// exporting
module.exports = Login;