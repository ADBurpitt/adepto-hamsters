// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/'

const AWS = require('aws-sdk')

exports.lambdaHandler = async (event, context) => {
    console.log(event, context);

    try {
      const documentClient = new AWS.DynamoDB.DocumentClient();
      const data = await documentClient.query({
        TableName: process.env.TABLE_NAME,
        IndexName: "uuid",
        Select: "ALL_ATTRIBUTES"
      }).promise();

      response = {
          'statusCode': 200,
          'headers': {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
          },
          'body': JSON.stringify({
              'data': data || []
          })
      }
    } catch (err) {
        console.log(err)
        return err
    }

    return response
}
