require('./models/MongoDB');

const express = require('express');
const path = require('path');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');


const userController = require('./controllers/UserController');


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/user',userController);


//View Engine Setup
app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',expressHandlebars());
app.set('view engine','hbs');

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is starting on port ${PORT}`));