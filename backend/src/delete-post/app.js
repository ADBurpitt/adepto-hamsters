const AWS = require('aws-sdk')
const nanoid = require('nanoid')

exports.lambdaHandler = async (event, context) => {
  console.log(event.queryStringParameters)

  const sub = event.requestContext.authorizer.claims.sub
  const body = JSON.parse(event.body)

  console.log(body)

  const documentClient = new AWS.DynamoDB.DocumentClient()

  try {
    const data = await documentClient.delete({
      TableName: process.env.TABLE_NAME,
      Key: { Key: { uuid: body.postId } },
      ConditionExpression: "user_id == :sub",
      ExpressionAttributeValues: { ":sub": sub },
      ReturnValues: "ALL_OLD"
    }).promise()

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
      'statusCode': 502,
      'headers': {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
      'body': JSON.stringify({ 'message': error })
    }
  }
}
