const mongoose = require('mongoose');
Schema=mongoose.Schema;

var productSchema = new Schema({product: Schema.Types.Mixed},{strict: false});



mongoose.model('Product',productSchema);