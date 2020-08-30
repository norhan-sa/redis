 const   express     =     require('express');
 const   app         =     express();
 const  { getDistance }     =     require('geolib');
 var    redis        =     require('redis');
 var   redisAuth     =     "uAb9OhR6ngYvLbqVe6IBl0DTuOw1EROL";
 let      port       =     process.env.PORT || 3000 ; 
 var     client      =     redis.createClient({

    port:13608,
    host:"redis-13608.c44.us-east-1-2.ec2.cloud.redislabs.com"

 });
 

 client.auth(redisAuth, function(err, response){
   if(err){
   console.log(err.message);
   }
   console.log("redis connection status   :  "+response);
  });

 app.use(express.json()); 
 app.get('/',(req,res)=>{
    res.send("Hello world");
 });

 app.post('/addInfo',(req,res)=>{

   client.hgetall(req.body.email, function(err, object) {
      if(err) console.log(err.message);
      console.log(typeof object);
      console.log(object);
   });
    
   client.hmset(req.body.email, { name: req.body.name , age: req.body.age , phone: req.body.phone });
   
   client.hgetall(req.body.email, function(err, object) {
      if(err) console.log(err.message);
      console.log(typeof object);
      console.log(object);
   });

   res.send("done");

 });

 app.post('/location',async (req,res)=>{

    console.log( req.body.firstLocation  ,  req.body.secondLocation );
    let first  = req.body.firstLocation;
    let second = req.body.secondLocation;
    let result = getDistance({latitude: first.lat ,longitude: first.long},{latitude: second.lat ,longitude: second.long} );
    console.log(result);
    return res.send({Distance:result});

 });

 app.listen(port , ()=>{
    console.log(`listening to port ${port} ... `);      
 });

