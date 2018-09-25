let AWS = require('aws-sdk');

exports.handler = function (event, context, callback) {

    console.log(event);
    callback(null, {
        "isBase64Encoded": true,
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*"
        },
        "body": JSON.stringify([]);
    });
}