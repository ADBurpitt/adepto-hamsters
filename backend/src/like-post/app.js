const AWS = require('aws-sdk')
const nanoid = require('nanoid')

exports.lambdaHandler = async (event, context) => {
  const sub = event.requestContext.authorizer.claims.sub
  const body = JSON.parse(event.body);  
  const docClient = new AWS.DynamoDB.DocumentClient()

  try {

    const { Item } = await docClient.get({
      TableName: process.env.TABLE_NAME,
      Key: { uuid: body.postId }
    }).promise()

    console.log(Item)

    const likes = Item.likes.includes(sub)
      ? Item.likes.filter(id => id !== sub)
      : [ ...Item.likes, sub ]

    console.log(likes)

    const data = await docClient.update({
      TableName: process.env.TABLE_NAME,
      Key: { uuid: body.postId },
      UpdateExpression: "set likes = :l",
      ExpressionAttributeValues: { ":l": likes },
      ReturnValues: "UPDATED_NEW"
    }).promise()

    console.log(data)

    return {
      'statusCode': 200,
      'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      'body': JSON.stringify({ data })
    }
  } catch (error) {
    console.log(error)
    return {
      'statusCode': 502,
      'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      'body': JSON.stringify({ 'message': error })
    }
  }
}
