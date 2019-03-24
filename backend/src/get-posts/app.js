// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/'

const AWS = require('aws-sdk')

exports.lambdaHandler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient()

    let error;
    let scanData;

    await documentClient.scan(
      { TableName: process.env.TABLE_NAME },
      (err, { data }) => {
        if (err) error = data;
        else scanData = data;
      }
    ).promise()

    if (error) {
      return {
        'statusCode': 502,
        'headers': {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        },
        'body': JSON.stringify({ 'message': err })
      }
    } else {
      return {
        'statusCode': 200,
        'headers': {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        },
        'body': JSON.stringify({
            'data': scanData || []
        })
      }
    }
}
