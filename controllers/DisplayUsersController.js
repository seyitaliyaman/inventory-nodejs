const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');

var userCont = require('./UserController');


router.get('/', (req, res) => {

    User.find((err, docs) => {
        if (!err) {
            if (req.session.username == null || req.session.username == undefined) {
                res.redirect('/')
            } else {
                console.log(docs)
                res.render("displayUsers", {
                    userList: docs
                })
            }

        }
    })
})



module.exports = router;