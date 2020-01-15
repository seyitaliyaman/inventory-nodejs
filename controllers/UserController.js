const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

var User = mongoose.model('User');
var Product = mongoose.model('Product')

router.post('/addUser', (req,res)=>{
    console.log("userc add user kısmına girdi");
    console.log(req.body.firstName);
    if(req.session.isAdmin){
        addUser(req,res);
    }
    
});

router.post('/updateUser', (req,res)=>{
    if(req.session.isAdmin){
        updateUser(req,res);
    }
    res.render('home',{
        text:'If you are not admin you cannot change'
    });
});

router.post('/deleteUser', (req,res)=>{
    if(req.session.isAdmin){
        deleteUser(req,res);
    }
    
    res.render('home',{
        text:'If you are not admin you cannot change'
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


    var body = req.body;
    var arr ={}
    var products = {}
    for(p in body){
        if(p != 'firstName' && p != 'lastName' &&  p != 'username' && p != 'phone' && p !='email' && p!='password' && p!= 'item' && body[p] != '0'){
            arr[p] = body[p];
        }else if(body[p] != '0'){
            products[p] = body[p]
        }
        
    }
    console.log(arr);

    user.productList = arr;

    //products['productList'] = arr

    //console.log(products);



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

    var body = req.body;
    var trial = {}
    var i = 0;
    for(key in body){
        if(key == 'name'){
            //obj['name'] = body[key]
        }else if(key == 'lastname'){
            //obj['quantity'] = body[key] 
        }else if(key == 'phone'){
  
        }else if(key =='email'){

        }else if(key == '_id'){
            
        }
        else{
          trial[key] = body[key]
        }
        i++
    }

    var updated = {
        name : req.body.name,
        surname : req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        productList : trial
    }

    User.findOneAndUpdate({_id: req.body._id},updated,{new: true},(err,doc)=>{
        if(!err){
            console.log(doc);
        }else{
            console.log(err);
        }
    })
}

deleteUser = (req, res) =>{
    User.findByIdAndRemove(req.body.deletedId,(err,doc)=>{
        if(!err){
           
        }else{
            console.log(err)
        }
    })
}


module.exports = router;