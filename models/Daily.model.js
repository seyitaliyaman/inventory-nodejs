const mongoose = require('mongoose')

var dailySchema = new mongoose.Schema({

    count:{
        type: Number,
    },
    date: {
        type: String,
    }

})

mongoose.model('Daily',dailySchema);