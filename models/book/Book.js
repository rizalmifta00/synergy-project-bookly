const Mongoose = require('mongoose');
const { ObjectId } = Mongoose.Schema;

var Schema = new Mongoose.Schema({
    name: {
        type: String,
        required : true
    } ,
    imageUrl: {
        type: String,
        required: true
      },
    categoryId:{
        type: ObjectId,
        required: true
    }
    

  
});

const Book = Mongoose.model('book', Schema);

module.exports = Book