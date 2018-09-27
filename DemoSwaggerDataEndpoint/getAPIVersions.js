let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {

    let apiName = event['queryStringParameters']['apiName'];
    console.log("apiName", apiName);

    ddb.query({
        TableName: 'SwaggerDetails',
        ExpressionAttributeValues: { ':apiName': apiName },
        KeyConditionExpression: 'apiName = :apiName'
    }).promise()
        .then((data) => {
            let items = data.Items;
            console.log("Retrieved items", items);

            let apiVersions = items.map(item => {
                return { "apiVersion": item['apiVersion'], "definition": JSON.parse(item['definition']) };
            });

            callback(null, {
                "isBase64Encoded": true,
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*"
                },
                "body": JSON.stringify(apiVersions)
            });

        }).catch((err) => {
            console.log("Error occurred while retriving data", err);
            callback(err);
        });
}