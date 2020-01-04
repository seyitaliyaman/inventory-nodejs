const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: 'This field is required.'
    },

    quantity: {
        type: String,
        required: 'This field is required.'
    }
})

mongoose.model('Product',productSchema);