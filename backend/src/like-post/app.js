const AWS = require('aws-sdk')

const updateLikes = (list, val) =>
  list.includes(val)
    ? list.filter(e => e !== val)
    : [ ...list, val ]

const lambdaHandler = async (event, context) => {
  const sub = event.requestContext.authorizer.claims.sub
  const body = JSON.parse(event.body);  
  const docClient = new AWS.DynamoDB.DocumentClient()

  try {

    const { Item } = await docClient.get({
      TableName: process.env.TABLE_NAME,
      Key: { uuid: body.postId }
    }).promise()

    const likes = updateLikes(Item.likes, sub)
    
    Item.likes.includes(sub)
      ? Item.likes.filter(id => id !== sub)
      : [ ...Item.likes, sub ]

    const data = await docClient.update({
      TableName: process.env.TABLE_NAME,
      Key: { uuid: body.postId },
      UpdateExpression: "set likes = :l",
      ExpressionAttributeValues: { ":l": likes },
      ReturnValues: "UPDATED_NEW"
    }).promise()

    return {
      'statusCode': 200,
      'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      'body': JSON.stringify(data)
    }
  } catch (error) {
    console.error(error)
    return {
      'statusCode': 500,
      'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      'body': JSON.stringify(error)
    }
  }
}

module.exports = {
  updateLikes,
  lambdaHandler
}