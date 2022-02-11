const Mongoose = require('mongoose');
const { ObjectId } = Mongoose.Schema;

var Schema = new Mongoose.Schema({
    name: {
        type: String,
        required : true
    } ,
    imageId: [{
        type: ObjectId,
        ref: 'Image'
      }],
    

  
});

const Category = Mongoose.model('category', Schema);

module.exports = Category