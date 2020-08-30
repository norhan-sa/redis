 const   express     =     require('express');
 const   app         =     express();
 var    redis        =     require('redis');
 let    redisport    =     process.env.PORT || 6379;
 let     port        =     process.env.PORT || 3000 ; 
 var    client       =     redis.createClient({
    port:13608,
    host:"redis-13608.c44.us-east-1-2.ec2.cloud.redislabs.com"
 });
 var   redisAuth     =     "uAb9OhR6ngYvLbqVe6IBl0DTuOw1EROL";

 client.auth(redisAuth, function(err, response){
   if(err){
   console.log(err.message);
   }

   console.log("connected   :  "+response);
  });

 app.get('/',(req,res)=>{
    res.send("Hello world");
 });

 app.listen(port , ()=>{
    console.log(`listening to port ${port} ... `);      
 });

