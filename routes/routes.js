const express = require('express');
const Routes = express.Router();


const UserController = require('../controllers/user/user')
Routes.get('/',(req,res)=>{
    res.render('index')
})
Routes.get('/signin',(req,res)=>{
    res.render('auth/login')
})

Routes.post('/register',UserController.Create)
Routes.post('/login-post',UserController.LoginPost)
Routes.post('/api/login',UserController.Login)


module.exports = Routes