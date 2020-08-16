 const fs = require('fs');
 const config = {
    'publicKeyId': 'AKIAIQBQRP2O7WGWQOTA',               
    'privateKey': fs.readFileSync('../private.pem'),
    'region': 'us',                                   
    'sandbox': true                                   
 };

 module.exports = config;