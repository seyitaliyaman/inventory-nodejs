const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model('Product')

var userCount;
var productCount;

router.get('/', (req, res) => {
    if (req.session.username == null || req.session.username == undefined) {
        res.redirect('/')
    }else{User.countDocuments(function(err, c) {
        
        userCount = c;
        console.log(req.session)
        Product.countDocuments(function(err,c){
            productCount = c;
            res.render('home', {
                viewTitle: "Say Hello",
                usrCount : userCount,
                prodCount : productCount,
            })
       })
        
   });}
});



module.exports = router;