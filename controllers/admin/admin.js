const Category = require('../../models/category/category');

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
            await Category.create({name});
            res.redirect('/admin/category')
        }catch(error){
            res.redirect('/admin/category')
        }
        
    },
    updateCategory : async(req,res) => {
        try{
            const { id, name } = req.body;
            const category = await Category.findOne({ _id: id });
            category.name = name;
            await category.save();
            res.redirect('/admin/category')
        }catch(error){
            res.redirect('/admin/category')
        }
    
    },
    deleteCategory : async(req,res)=>{
      const { id } = req.params;
      const category = await Category.findOne({ _id: id });
      await category.remove();
      res.redirect('/admin/category')
    }
    
    

}