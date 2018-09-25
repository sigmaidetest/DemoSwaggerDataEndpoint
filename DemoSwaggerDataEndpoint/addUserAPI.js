let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {

    let username = event.username;
    let apiName = event.apiName;

    console.log("Subscribing user for API", username, apiName);

    ddb.put({
        TableName: 'UserSwaggerSubscriptions',
        Item: { 'username': username, 'apiName': apiName }
    }).promise()
        .then((data) => {
            console.log("Successfully added entry", data);
            callback(null, {
                username: username,
                apiName: apiName
            });

        }).catch((err) => {
            console.log("Failed to add entry", err);
            callback(err);
        });
}