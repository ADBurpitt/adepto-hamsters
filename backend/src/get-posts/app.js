// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/'

const AWS = require('aws-sdk')

exports.lambdaHandler = async (event, context) => {
    console.log(event, context);

    try {

      let sub;

      if (event.requestContext.authorizer) {
        sub = event.requestContext.authorizer.claims.sub;
        const params = {
            TableName: process.env.TableName,
            Item: {
                'user_id': sub,
            }
        };

        // Making the call to the dynamo db table with our parameters and asking for a promise back.
        // Since we're using async await, the code wont continue to execute until a result has been received.
        const documentClient = new AWS.DynamoDB.DocumentClient();
        await documentClient.put(params).promise();
    }

        // const ret = await axios(url)
        response = {
            'statusCode': sub ? 200 : 401,
            'headers': {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*"
            },
            'body': JSON.stringify({
                'sub': sub || 'Unauthorized'
            })
        }
    } catch (err) {
        console.log(err)
        return err
    }

    return response
}
