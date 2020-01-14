require('./models/MongoDB');

var express = require('express');
var path = require('path');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');


var userController = require('./controllers/UserController');
var displayUsersController = require('./controllers/DisplayUsersController');
var homeController = require('./controllers/HomeController');
var loginController = require('./controllers/LoginController');
var productController = require('./controllers/ProductController');
var sendMailController = require('./controllers/SendMailController')


var app = express();



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/user',userController);
app.use('/displayUsers',displayUsersController);
app.use('/home',homeController);
app.use('/',loginController);
app.use('/product',productController);
app.use('/sendMail',sendMailController);


expressHandlebars.partialsDir = __dirname+'/views/partials/';

//View Engine Setup
app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',expressHandlebars({ extname: '.hbs' }));
app.set('view engine','hbs');

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is starting on port ${PORT}`));