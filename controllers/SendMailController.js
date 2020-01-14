const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
var User = mongoose.model('User');

router.get('/', (req, res) => {
    User.find({},{'email' : ''},(err, docs)=>{
        if(!err){
            res.render('sendMail', {
                mailList : docs,
                viewTitle: "Say Hello"
            })
        }
    })
    
});

router.post('/',(req,res)=>{
    mailSender(req,res);
    res.redirect('/home');
})



mailSender = (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user : req.body.userMail,
            pass : req.body.mailPassword
        }
    });

    var mailOptions = {
        from : 'seyitaliyaman@gmail.com',
        to : req.body.adminMail,
        subject : req.body.mailSubject,
        text : req.body.mail
    }

    transporter.sendMail(mailOptions,function(err,inf){
        if(err){
            console.log(err)
        }else{
            console.log(inf)
        }
    })
}

module.exports = router;