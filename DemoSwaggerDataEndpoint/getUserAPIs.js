let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {

    let username = event['queryStringParameters']['username'];
    console.log("Username", username);

    ddb.query({
        TableName: 'UserSwaggerSubscriptions',
        ExpressionAttributeValues: {
            ':userName': username
        },
        KeyConditionExpression: 'username = :userName'
    }).promise()
        .then((data) => {
            let items = data.Items;
            console.log("Retrieved items", items);

            let userAPIs = items.map(item => item['apiName']);
            callback(null, {
                "isBase64Encoded": true,
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*"
                },
                "body": JSON.stringify(userAPIs)
            });

        }).catch((err) => {
            console.log("Error occurred while retriving data", err);
            callback(null, {
                "isBase64Encoded": true,
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*"
                },
                "body": JSON.stringify([])
            });
        });



}