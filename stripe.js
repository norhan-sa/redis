require('dotenv').config();
 
 
 const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
 const STRIPE_PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY ;
 const  router = require('express').Router();
 const  stripe = require('stripe')(STRIPE_SECRET_KEY);

 console.log(STRIPE_PUBLIC_KEY);

 router.get('/store', (req,res)=>{
          console.log(STRIPE_PUBLIC_KEY);        
   return res.send({publicKey: STRIPE_PUBLIC_KEY, msg:'the key sent successfully', status:200});
 });

 router.post('/purchase',(req,res)=>{
    let total = 0 ; 
    let items = req.body.items;
    if(!items && !req.body.stripeTokenID) return res.status(400).send({data: null , status:400});
    
    items.forEach(element => {
      total += element.price * element.quantity;             
    });

    stripe.charges.craete({
       amount: total,
       source: req.boby.stripeTokenID,
       currency: 'usd'      
    }).then(()=>{
       console.log('charged successfully');  
       res.send('successfully purchased');     
    }).catch((err)=>{
       console.error(err);
       res.status(500).end();
    });
 });


 module.exports = router;