const Express = require('express')
const App = Express()
const PORT = 8888
const Morgan = require('morgan')
const Dotenv = require('dotenv')
const Cors = require('cors')
const Path = require('path');
const methodOverride = require('method-override')
const Session = require('express-session')
const Flash = require('connect-flash');

App.set('view engine', 'ejs')
App.use(Express.static('public'))
App.use('/sb-admin-2', Express.static(Path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')));
App.use(Morgan('tiny'))
App.use(Express.urlencoded({ extended: true })) // Type Data Form
App.use(Express.json()) // Type Data JSON
Dotenv.config({ path: './config/Config.env' })
App.use(methodOverride('_method'))

App.use(Session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }));

App.use(Flash());


const ConnectMongoDB = require('./models/connection')
ConnectMongoDB()

App.listen(PORT, function() {
    console.log(`Server is running in port : ` + PORT)
})

// Routing
const adminRouter = require('./routes/admin')
App.use('/admin',adminRouter)
const Routing = require('./routes/routes')
App.use(Routing)