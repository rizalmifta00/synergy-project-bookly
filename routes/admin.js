const express = require('express');
const Routes = express.Router();
const AdminController = require('../controllers/admin/admin')
const {upload} = require('../middlewares/multer')
const Auth = require('../middlewares/auth')

Routes.use(Auth)
Routes.get('/dashboard',AdminController.viewDashboard)

Routes.get('/user',AdminController.viewUser)
// Category

Routes.get('/category',AdminController.viewCategory)
Routes.post('/category',upload,AdminController.addCategory)
Routes.put('/category',upload,AdminController.updateCategory)
Routes.delete('/category/:id',AdminController.deleteCategory)

Routes.get('/book',AdminController.viewBook)
Routes.post('/book',upload,AdminController.addBook)
Routes.put('/book',upload,AdminController.updateBook)
Routes.delete('/book/:id',AdminController.deleteBook)


module.exports = Routes