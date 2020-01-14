const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = mongoose.model('Product');


router.get('/', (req, res) => {
    res.render('addProduct', {
        viewTitle: "Say Hello"
    })
});

router.get('/productList',(req,res)=>{
    getProductList(req,res)
    res.render('addProduct',{
        viewTitle : "Product List"
    })
})


getProductList = (req,res)=>{


    Product.find((err,docs)=>{
        if(!err){
            console.log(docs)
            res.render('product',{
                productList : docs
            })
        }
    });
}


module.exports = router;