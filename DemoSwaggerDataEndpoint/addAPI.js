let AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {
    
    console.log(event);

    let swaggerDef = event.body;
    console.log(swaggerDef);
    callback(null,'Successfully executed');
}