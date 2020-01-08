const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Users = mongoose.model('User');


router.get('/', (req, res) => {
    res.render('displayUsers', {
        viewTitle: "Say Hello"
    })
});


module.exports = router;