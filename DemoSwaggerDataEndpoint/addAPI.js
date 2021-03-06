let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
let SwaggerParser = require("swagger-parser");

exports.handler = function (event, context, callback) {

    // console.log(event);

    let swaggerDef = event;
    console.log(swaggerDef);

    SwaggerParser.validate(swaggerDef)
        .then(validatedSpec => {
            console.log("Validated API definition", swaggerDef);

            let apiName = swaggerDef['info']['title'];
            let apiVersion = swaggerDef['info']['version'];
            console.log("API details", apiName, apiVersion);

            ddb.put({
                TableName: 'SwaggerDetails',
                Item: { 'apiName': apiName, 'apiVersion': apiVersion, 'definition': JSON.stringify(swaggerDef) }
            }).promise()
                .then((data) => {
                    console.log("Successfully added API definition to DB", data);
                    callback(null, {
                        "apiName": apiName,
                        "apiVersion": apiVersion
                    });

                }).catch((err) => {
                    console.log("Failed to add API definition to DB", err);
                    callback(err);
                });

        })
        .catch((err) => {
            console.log('Failed to validate API definition', swaggerDef, err);
            callback(err);
        });
}