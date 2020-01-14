const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = mongoose.model('Product');


router.get('/', (req, res) => {
    getProductList(req,res)
});



router.post('/addProduct', (req,res)=>{
    /*console.log(req.body);
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
    console.log(obj)*/
    addProduct(req,res);
    //res.redirect('/home');
})


getProductList = (req,res)=>{
    Product.find((err,docs)=>{
        if(!err){
            console.log(docs)
            var ans = []
            for(doc in docs){
                var sel = []
                var str = ''
                for(key in doc){
                    if(key == 'name'||key == 'quantity'){
                        sel.push(doc[key])
                    }else if(!(key == '_id' || key == '__v')){
                        str = str+key+": "+doc[key]+"\n";
                    }
                }
                sel.push(str)
                ans.push(sel)
            }
            console.log(ans)
            res.render('addProduct',{
                productList : docs
            })
        }
    });
}

addProduct = (req,res) =>{
    var product = new Product();

    product.name = req.body.name;
    product.quantity = req.body.quantity;

    var obj = []
    var body = req.body;
    var i = 0;
    var k;
    var trial = {}
    
    for(key in body){
      if(key == 'name'){
          obj['name'] = body[key]
      }else if(key == 'quantity'){
          obj['quantity'] = body[key] 
      }else if(i%2==0){
          k=body[key];
      }else{
        trial[k] = body[key]
      }
      i++
    }

    console.log(trial)

    
    product.attributeList = trial;
    

    product.save((err,docs)=>{
        if(!err){
            console.log(docs)
            res.redirect('/home')
        }else{
            console.log(err);
        }
    })
}


module.exports = router;