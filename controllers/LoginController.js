const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var User = mongoose.model('User');


router.get('/', (req, res) => {
    res.render('index', {
        viewTitle: "Say Hello"
    })
});

router.post('/handle_login',(req,res)=>{
    
    var username = req.body.username
    var password = req.body.password
    if(login(username,password)){
        res.redirect('home')
    }
    else{
        res.render('index',{statu:false})
    }
    
})

function login(usern,password){
    if(usern==null || password == null){
        return false;
    }
    User.findOne({username:usern},function(obj){
        if(obj == null){
            return false;
        }
        if(obj.password === password){
            return true
        }
    })
    return false;
}


module.exports = router;