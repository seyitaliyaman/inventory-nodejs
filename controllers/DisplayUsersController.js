const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');
const Product = mongoose.model('Product');
var userCont = require('./UserController');



router.get('/', (req, res) => {

    User.find((err, userdocs) => {
        if (!err) {
            console.log(userdocs);
        }
        Product.find((err, prodocs) => {
            console.log(prodocs)

            res.render("displayUsers", {
                userList: userdocs,
                productList: prodocs
            })
        })
       
    })


})



module.exports = router;