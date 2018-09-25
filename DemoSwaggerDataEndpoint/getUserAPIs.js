let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {

    let username = event['queryStringParameters']['username'];
    console.log("Username", username);

    ddb.query({
        TableName: 'UserSwaggerSubscriptions',
        ExpressionAttributeValues: {
            ':username': username
        },
        KeyConditionExpression: ' S :'
    }).promise()
        .then((data) => {
            console.log("Retrived data", data);
            callback(null, {
                "isBase64Encoded": true,
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*"
                },
                "body": JSON.stringify([])
            });

        }).catch((err) => {
            console.log("Error occurred while retrived data", err);
            callback(err);
        });



}