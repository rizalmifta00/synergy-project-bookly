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
      bookId: [{
        type: ObjectId,
        ref: 'book'
      }]
    

  
});

const Category = Mongoose.model('category', Schema);

module.exports = Category