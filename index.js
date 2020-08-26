 const   express     =     require('express');
 const   app         =     express();
 var    redis        =     require('redis');
 let    redisport    =     process.env.PORT || 6379;
 let     port        =     process.env.PORT || 3000 ; 

 var    client       =     redis.createClient(redisport);

 client.on('connect', function() {
  console.log('connected');
 });

 app.get('/',(req,res)=>{
    res.send("Hello world");
 });

 app.listen(port , ()=>{
    console.log(`listening to port ${port} ... `);      
 });

