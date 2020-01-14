const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

var User = mongoose.model('User');
var Product = mongoose.model('Product')

router.post('/addUser', (req,res)=>{
    console.log("userc add user kısmına girdi");
    console.log(req.body.firstName);
    addUser(req,res);
});

router.post('/updateUser', (req,res)=>{
    updateUser(req,res);
    res.render('home',{

    });
});

router.post('/deleteUser', (req,res)=>{
    deleteUser(req,res);
    res.render('home',{

    });
});




addUser = (req, res) => {
    let user = new User();
    user.name = req.body.firstName;
    user.surname = req.body.lastName;
    user.username = req.body.username;
    user.phone = req.body.phone;
    user.email = req.body.email;
    user.password = req.body.password;
    user.isAdmin = req.body.item;
    //user.productList = req.body.productList;

    user.save((err , doc) =>{
        if(!err){
            console.log(doc);
        }else{
            console.log(err)
        }
    });
    res.redirect('/home');
};

updateUser = (req, res) => {
    User.findOneAndUpdate({_id: req.body._id},req.body,{new: true},(err,doc)=>{
        if(!err){
            console.log(doc);
        }else{
            console.log(err);
        }
    })
}

deleteUser = (req, res) =>{
    User.findByIdAndRemove(req.body._id,(err,doc)=>{
        if(!err){
            console.log(doc)
        }else{
            console.log(err)
        }
    })
}


module.exports = router;