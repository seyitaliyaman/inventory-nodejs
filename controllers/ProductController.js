const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = mongoose.model('Product');


router.get('/', (req, res) => {
    res.render('addProduct', {
        viewTitle: "Say Hello"
    })
});



module.exports = router;