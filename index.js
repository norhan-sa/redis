 const   express     =     require('express');
 const   app         =     express();
 var    redis        =     require('redis');
 var    client       =     redis.createClient();
 let     port        =     process.env.PORT || 3000 ; 

 client.on('connect', function() {
  console.log('connected');
 });

 app.get('/',(req,res)=>{
    res.send("Hello world");
 })

 app.listen(port , ()=>{
    console.log(`listening to port ${port} ... `);      
 });

