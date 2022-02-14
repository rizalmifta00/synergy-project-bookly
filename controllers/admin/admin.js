const Category = require('../../models/category/category');
const Book = require('../../models/book/Book');
const User = require('../../models/user/user');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
    viewDashboard : (req,res) => {
        res.render('admin/dashboard/index')
    },

    viewCategory : async(req,res) => {
        
        const category = await Category.find();
        res.render('admin/category/index',{category})
    },
    addCategory : async(req,res) => {
        try{
            const {name} = req.body;
           
            await Category.create({
                name,
                imageUrl : `images/${req.file.filename}`
            });
            res.redirect('/admin/category')
        }catch(error){
            res.redirect('/admin/category')
        }
        
    },
    updateCategory : async(req,res) => {
        try{
            const { id, name } = req.body;
            const category = await Category.findOne({ _id: id });
            if (req.file == undefined) {
                category.name = name;

                await category.save();
                res.redirect('/admin/category');
              } else {
                await fs.unlink(path.join(`public/${category.imageUrl}`));
                category.name = name;
                category.imageUrl = `images/${req.file.filename}`
                await category.save();
               
                res.redirect('/admin/category');
              }
            
        }catch(error){
            res.redirect('/admin/category')
        }
    
    },
    deleteCategory : async(req,res)=>{
      const { id } = req.params;
      const category = await Category.findOne({ _id: id });
      await fs.unlink(path.join(`public/${category.imageUrl}`));
      await category.remove();
      res.redirect('/admin/category')
    },
    
    viewBook : async (req,res) => {
        const book = await Book.find();
        const category = await Category.find();
        res.render('admin/book/index',{book,category})
    },

    addBook : async (req,res) =>{
        try{
            const {categoryId, name,} = req.body
            const category = await Category.findOne({_id:categoryId})
            const newBook = {
                categoryId : category._id,
                name,
                imageUrl : `images/${req.file.filename}`
            }
            
               const book = await Book.create(newBook)
               category.bookId.push({_id:book._id})
               await category.save()
           
                res.redirect('/admin/book')
        }catch{
            res.redirect('/admin/book')
        }
       
    },

    updateBook :  async (req,res) => {
        try{
            const { id, name,categoryId } = req.body;
            const book = await Book.findOne({ _id:categoryId} );
            const category = await Category.findOne({_id:categoryId})
            if (req.file == undefined) {
                const newBook = {
                    categoryId : category._id,
                    name,
                   
                }
                
                   const Book = await book.updateOne(newBook)
               
                    res.redirect('/admin/book')
              } else {
                await fs.unlink(path.join(`public/${book.imageUrl}`));
                const newBook = {
                    categoryId : category._id,
                    name,
                    imageUrl : `images/${req.file.filename}`
                }
                
                   const Book = await book.save(newBook)
               
                    res.redirect('/admin/book')
               
               
              }
            
        }catch(error){
            res.redirect('/admin/book')
        }
    
    },
    deleteBook : async(req,res)=>{
        const { id } = req.params;
        const book = await Book.findOne({ _id: id });
        await fs.unlink(path.join(`public/${book.imageUrl}`));
        await book.remove();
        res.redirect('/admin/book')
      },
    

      viewUser : async(req,res) => {
        const user = await User.find();
        res.render('admin/user/index',{user})
    },
    
   
}