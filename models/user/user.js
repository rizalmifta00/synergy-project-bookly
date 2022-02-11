const Mongoose = require('mongoose');

var Schema = new Mongoose.Schema({
    username:{ type: String },
    email : { type: String},
    password:{ type: String},
  
});

const User = Mongoose.model('user', Schema);

module.exports = User