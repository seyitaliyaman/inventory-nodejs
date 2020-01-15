const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
var User = mongoose.model('User');

router.get('/', (req, res) => {
    if (req.session.username == null || req.session.username == undefined) {
        res.redirect('/')
    }else{

        if(req.session.admin){
            User.find({'email': {$ne : req.session.email}},{'email' : 1, '_id': 0},(err, docs)=>{
                if(!err){
                    console.log("gelen mail adresleri adminee")
                    console.log(docs)
                    res.render('sendMail', {
                        mailList : docs,
                        userMail : req.session.email,
                        viewTitle: "Say Hello"
                    })
                }
            })
        }else{
            User.find({'isAdmin': true},{'email' : 1, '_id': 0},(err, docs)=>{
                if(!err){
                    console.log("gelen mail adresleri")
                    console.log(docs)
                    res.render('sendMail', {
                        mailList : docs,
                        userMail : req.session.email,
                        viewTitle: "Say Hello"
                    })
                }
            })
        }

        
    }
    
    
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