const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var User = mongoose.model('User');


router.get('/', (req, res) => {
    
    res.render('index', {
        session: req.session,
        viewTitle: "Say Hello"
    })
});

router.post('/handle_login',(req,res)=>{
    
    var usern = req.body.username
    var password = req.body.password
    if(usern==null || password == null){
        res.render('index',{statu:false})
    }else{
        User.findOne({username:usern},function(err,obj){
            if(obj == null){
                res.render('index',{statu:false})
            }
            else if(obj.password === password){
                req.session.admin=obj.isAdmin
                req.session.username = obj.username
                req.session.email = obj.email
                res.render('home');
            }else{
                res.render('index',{statu:false})
            }
            
        })
    }
    
})

function login(usern,password){
    var pos;
    if(usern==null || password == null){
        pos = false;
    }
    User.findOne({username:usern},function(obj){
        if(obj == null){
            pos = false;
        }
        if(obj.password === password){
            pos = true
        }
    })
    return pos;
}


module.exports = router;