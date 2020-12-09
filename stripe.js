require('dotenv').config();
 
 
 const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
 const STRIPE_PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY ;
 const  router = require('express').Router();
 const  stripe = require('stripe')(STRIPE_SECRET_KEY);

 console.log(STRIPE_PUBLIC_KEY);

 router.get('/store', (req,res)=>{
   return res.send({publicKey: STRIPE_PUBLIC_KEY, msg:'the key sent successfully', status:200});
 });

 router.post('/purchase',(req,res)=>{
    console.log(req.body);       
    let total = 0 ; 
    let items = req.body.items;
    if(!items && !req.body.stripeTokenID) return res.status(400).send({data: null , status:400});
    
    console.log(req.body);
    items.forEach(element => {
      total += element.price * element.quantity;             
    });

    stripe.customers.create({
          email: 'test@gmail.com',    
          source: req.body.stripeToken      
    }).then(customer =>{
       stripe.charges.create({
          amount: total,
          source: req.body.stripeTokenID,
          currency: 'usd'      
       });
    }).then(()=>{
          console.log('charged successfully');  
          res.send('successfully purchased');
    }).catch(err=>{
          console.error(err);
          res.status(500).send({msg:'err'});
    });

//     stripe.charges.create({
//        amount: total,
//        source: req.body.stripeTokenID,
//        currency: 'usd'      
//     }).then(()=>{
//        console.log('charged successfully');  
//        res.send('successfully purchased');     
//     }).catch((err)=>{
//        console.error(err);
//        res.status(500).end();
//     });
 });


 module.exports = router;