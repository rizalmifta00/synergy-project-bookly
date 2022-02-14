const express = require('express');
const Routes = express.Router();

const Auth = require('../middlewares/auth')
const AuthController = require('../controllers/auth/auth')
const UserController = require('../controllers/user/user')
const LandingPageController = require('../controllers/landingpage/landingpage')



Routes.get('/login',AuthController.viewLogin)

Routes.get('/register',(req,res)=>{
    res.render('auth/register')
})
Routes.post('/api/login',AuthController.login)
Routes.post('/api/register',AuthController.register)
Routes.post('/login-post',UserController.LoginPost)
Routes.post('/api/login',UserController.Login)


Routes.get('/',LandingPageController.ViewLandingPage)

module.exports = Routes