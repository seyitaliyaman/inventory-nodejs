const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({

    name:{
        type: String,
    },
    surname:{
        type: String,
    },
    username:{
        type: String,
    },
    phone:{
        type: String,
    },
    email:{
        type: String,
    },
    password:{
        type: String,
    },
    isAdmin:{
        type: Boolean,
    },
    productList:{
        type: Object,
    }
})


mongoose.model('User',userSchema)