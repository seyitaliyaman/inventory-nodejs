const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');
const Product = mongoose.model('Product');
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
        Product.find((err, prodocs) => {
            //console.log(prodocs)

            res.render("displayUsers", {
                userList: userdocs,
                productList: prodocs
            })
        })
       
    })


})



module.exports = router;