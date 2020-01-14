const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');


router.get('/', (req, res) => {
    //mailSender(req,res);
    res.render('sendMail', {
        viewTitle: "Say Hello"
    })
});




mailSender = (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user : 'seyitaliyaman@gmail.com',
            pass : 'seyitali34.'
        }
    });

    var mailOptions = {
        from : 'seyitaliyaman@gmail.com',
        to : 'seyitaliyaman@gmail.com',
        subject : 'Node js mail',
        text : 'Node js moruq'
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