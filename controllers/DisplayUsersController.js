const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');




router.get('/', (req,res)=>{
    User.find((err,docs)=>{
        if(!err){
            console.log(docs)
            res.render("displayUsers",{
                userList : docs
            })
        }
    })
})


module.exports = router;