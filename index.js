 const   express     =     require('express');
 const   app         =     express();
 const   amqp        =     require('amqplib/callback_api');  
 const CONN_URL      =     'amqps://mivnghdn:dr1PxdLR0A0gpS2Ii_XmRvFAuDKVgedm@rattlesnake.rmq.cloudamqp.com/mivnghdn';
 let { getDistance } =     require('geolib');
 var    redis        =     require('redis');
 var   redisAuth     =     "uAb9OhR6ngYvLbqVe6IBl0DTuOw1EROL";
 const  stripe       =     require('./stripe');
 let      port       =     process.env.PORT || 3000 ; 
//  var     client      =     redis.createClient({
//     port:13608,
//     host:"redis-13608.c44.us-east-1-2.ec2.cloud.redislabs.com"
//  });
 app.use(experss.json());
 app.use('/', stripe);

//  //  R E D I S   C O N N E C T I O N 
//  client.auth(redisAuth, function(err, response){
//    if(err){
//       console.log(err.message);
//    }
//    console.log("redis connection status   :  "+response);

//   });
 

 // R A B B I T  M Q    C O N N E C T I O N 
 
 let channel = null;
 amqp.connect(CONN_URL, function (err, conn) {
    if(err) console.log(err.message);
    else{
      console.log(" RABBIT MQ connected "); 
      conn.createChannel(function (err, ch) {
      channel = ch ;
     });
    }
 });


 //  P U S H   T O   Q U E U E   F U N C T I O N 
 async function publishToQueue(queueName , data){
   let e = JSON.stringify(data); 
   channel.sendToQueue( queueName , Buffer.from(e) );
 }

 process.on('exit', (code) => {
   channel.close();
   console.log(`Closing rabbitmq channel`);
 });


 // H O M E   R O U T E R
 app.use(express.json()); 
 app.get('/',(req,res)=>{
    res.send("Hello world");
 });


 //  R O U T E R   T O   T E S T   R E D I S
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


 // R O U T E R   T O   T E S T  G E O L I B
 app.post('/location',async (req,res)=>{

    console.log( req.body.firstLocation  ,  req.body.secondLocation );
    let first  = req.body.firstLocation;
    let second = req.body.secondLocation;
    let result = getDistance({latitude: first.lat ,longitude: first.long},{latitude: second.lat ,longitude: second.long} );
    console.log(result);
    return res.send({Distance:result});
    
 });

 // R O U T E R   T O   T E S T   R A B B I T  M Q
 app.post('/msg', async(req , res)=>{

   let { queueName, payload } = req.body;
   let result = await publishToQueue(queueName, payload);
   console.log(result);
   return res.status(200).send({msg_sent:true});

 });

 app.listen(port , ()=>{
    console.log(`listening to port ${port} ... `);      
 });

