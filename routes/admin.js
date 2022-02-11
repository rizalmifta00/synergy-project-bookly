const express = require('express');
const Routes = express.Router();
const AdminController = require('../controllers/admin/admin')

Routes.get('/dashboard',AdminController.viewDashboard)

// Category

Routes.get('/category',AdminController.viewCategory)
Routes.post('/category',AdminController.addCategory)
Routes.put('/category',AdminController.updateCategory)
Routes.delete('/category/:id',AdminController.deleteCategory)


module.exports = Routes