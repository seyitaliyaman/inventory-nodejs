const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model('Product')
var Daily = mongoose.model('Daily')

var userCount;
var productCount;
var visit;

router.get('/logout',(req,res)=>{
    req.session.username = null;
    console.log("gelen req test")
    res.redirect('/')
})

router.get('/', (req, res) => {
    if (req.session.username==null || req.session.username == undefined) {
        res.redirect('/')
    }else{User.countDocuments(function(err, c) {
        
        userCount = c;
        console.log(req.session)
        Product.countDocuments(function(err,c){
            productCount = c;
            var date = new Date()
            var dt = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()

            Daily.findOne({date:dt},function(err,obj){

                if(obj == null){
                    let daily = new Daily();
                    daily.date = dt;
                    daily.count = 1;
                    visit = 1;
                    daily.save((err,docs)=>{
                        if(!err){
                            console.log(docs)
                        }else{
                            console.log(err);
                        }
                    })
                }else{
                    obj.count = obj.count+1;
                    visit = obj.count;
                    Daily.findByIdAndUpdate({date:dt},obj,{new: true},(err,doc)=>{
                        if(!err){
                            console.log(doc);
                        }else{
                            console.log(err);
                        }
                    })
                }
                console.log("gelen count verileri")
                console.log(userCount)
                console.log(productCount)
                console.log(visit)
                res.render('home', {
                    viewTitle: "Say Hello",
                    usrCount : userCount,
                    prodCount : productCount,
                    dailyVisit : visit
                })

            })
            
       })
        
   });}
});



module.exports = router;