const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
var User = mongoose.model('User');

router.get('/', (req, res) => {
<<<<<<< HEAD

    User.find({},{'email' : ''},(err, docs)=>{
        if(!err){
            res.render('sendMail', {
                mailList : docs,
                viewTitle: "Say Hello"
            })
        }
=======
    //mailSender(req,res);
    res.render('sendMail', {
        viewTitle: "Say Hello"
>>>>>>> f5a7a4d63eb8951e0f66f11dfe733ff77f5b15b1
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