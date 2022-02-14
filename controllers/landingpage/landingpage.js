const Category = require('../../models/category/category');
const Book = require('../../models/book/Book');

module.exports = {
    ViewLandingPage : async (req,res)=>{
        const category = await Category.find()
        const book = await Book.find({x:-1}).limit(5);
        res.render ('index',{category,book})
    }
}