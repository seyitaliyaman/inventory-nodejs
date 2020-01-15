require('./models/MongoDB');

var express = require('express');
var path = require('path');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
const session = require("express-session");

var userController = require('./controllers/UserController');
var displayUsersController = require('./controllers/DisplayUsersController');
var homeController = require('./controllers/HomeController');
var loginController = require('./controllers/LoginController');
var productController = require('./controllers/ProductController');
var sendMailController = require('./controllers/SendMailController')


var app = express();

app.use(session({
    secret:'gizli',
    resave:false,
    saveUninitialized:true
}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/user',userController,function(req,res){
    if(req.session.username == null || req.session.username == undefined)
    {
        res.redirect('/')
    }
});
app.use('/displayUsers',displayUsersController,function(req,res){
    if(req.session.username == null || req.session.username == undefined)
    {
        res.redirect('/')
    }
});
app.use('/home',homeController,function(req,res){
    console.log("DDD "+req.session.username)
    if(req.session.username == null || req.session.username == undefined)
    {
        res.render('/')
    }
});
app.use('/',loginController);
app.use('/product',productController,function(req,res){
    if(req.session.username == null || req.session.username == undefined)
    {
        res.render('/')
    }
});
app.use('/sendMail',sendMailController),function(req,res){
    if(req.session.username == null || req.session.username == undefined)
    {
        res.render('/')
    }
};


expressHandlebars.partialsDir = __dirname+'/views/partials/';

app.use(express.static(__dirname + '/public/'));




//View Engine Setup
app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',expressHandlebars({ extname: '.hbs' }));
app.set('view engine','hbs');

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is starting on port ${PORT}`));