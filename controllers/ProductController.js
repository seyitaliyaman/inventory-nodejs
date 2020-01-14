const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = mongoose.model('Product');


router.get('/', (req, res) => {
    //addProduct();
    res.render('addProduct');
    /*res.render('addProduct', {
        viewTitle: "Say Hello"
    })**/
});

router.get('/productList',(req,res)=>{
    getProductList(req,res)
    res.render('addProduct',{
        viewTitle : "Product List"
    })
})

router.post('/addProduct', (req,res)=>{
    console.log(req.body);
    var obj = []
    var body = req.body;
    var i = 0;
    var k;
    for(key in body){
      if(key == 'name'){
          obj['name'] = body[key]
      }else if(key == 'quantity'){
          obj['quantity'] = body[key] 
      }else if(i%2==0){
          k=body[key];
          
      }else{
        obj[k] = body[key]
      }
      i++
    }
    console.log(obj)
    addProduct(obj);
    res.redirect('/home');
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

addProduct = (pro) =>{
    var product = new Product(pro);
    product.save((err,docs)=>{
        if(!err){
            console.log(docs)
        }else{
            console.log(err);
        }
    })
}


module.exports = router;