
 var amqp = require('amqplib/callback_api');
 const CONN_URL = 'amqps://mivnghdn:dr1PxdLR0A0gpS2Ii_XmRvFAuDKVgedm@rattlesnake.rmq.cloudamqp.com/mivnghdn';


 amqp.connect(CONN_URL, function (err, conn) {

  conn.createChannel(function (err, ch) {

    ch.consume('test', function (msg) {
      console.log('.....');
      console.log("Message:", JSON.parse(msg.content.toString()));
    },{ noAck: true }

    );
  });

 });