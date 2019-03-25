const AWS = require('aws-sdk')
const nanoid = require('nanoid')

exports.lambdaHandler = async (event, context) => {
  const body = JSON.parse(event.body);  
  const documentClient = new AWS.DynamoDB.DocumentClient()
  const uuid = nanoid()

  try {
    await documentClient.put({
      TableName: process.env.TABLE_NAME,
      Item: {
        uuid,
        user_id: event.requestContext.authorizer.claims.sub,
        email: event.requestContext.authorizer.claims.email,
        title: body.title,
        text: body.text,
        likes: [],
        timestamp: Date.now()
      }
    }).promise()

  return {
      'statusCode': 200,
      'headers': {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
      'body': JSON.stringify({ 'uuid': uuid })
    }
  } catch (error) {
    console.error(error)
    return {
      'statusCode': 502,
      'headers': {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
      'body': JSON.stringify({ 'message': error })
    }
  }
}
