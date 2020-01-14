const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = mongoose.model('Product');


router.get('/', (req, res) => {
    getProductList(req,res)
});

router.post('/deleteProduct',(req,res)=>{
    deleteProduct(req,res)
})

router.post('/updateProduct',(req,res)=>{
    updateProduct(req,res)
})



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
            console.log(docs[0])
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


deleteProduct = (req,res)=>{
    Product.findByIdAndRemove(req.body.deletedId, (err,docs)=>{
        if(!err){
            
            res.redirect('/home')
        }else{
            console.log(err)
        }
    })
}

updateProduct = (req,res)=>{
    var obj = []
    var body = req.body;
    var i = 0;
    var k;
    var trial = {}
    console.log("gelen trial")
    console.log(req.body)
    
    for(key in body){
      if(key == 'name'){
          //obj['name'] = body[key]
      }else if(key == 'quantity'){
          //obj['quantity'] = body[key] 
      }else if(key == 'editedId'){

      }else{
        trial[key] = body[key]
      }
      i++
    }

    var updatedProd = {
        name : req.body.name,
        quantity : req.body.quantity,
        attributeList : trial
    }

    console.log("giden obje")
    console.log(trial)

   

    Product.findByIdAndUpdate({_id: req.body.editedId},updatedProd,{new:true},(err,doc)=>{
        if(!err){
           
            res.redirect('/home');
        }else{
            console.log(err);
        }
    })
}

module.exports = router;