const mongoose = require('mongoose');


var productSchema = new mongoose.Schema({

    name: {
        type: String,
    },
    quantity:{
        type: String,
    },
    attributeList:{
        type:Object,
    }
});



mongoose.model('Product',productSchema);