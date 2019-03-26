const AWS = require('aws-sdk')

exports.lambdaHandler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient()

    try {
      const data = await documentClient.scan(
        { TableName: process.env.TABLE_NAME }
      ).promise()

      return {
        'statusCode': 200,
        'headers': {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        },
        'body': JSON.stringify(data)
      }
    } catch (error) {
      console.error(error)
      return {
        'statusCode': 500,
        'headers': {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        },
        'body': JSON.stringify(error)
      }      
    }
}
